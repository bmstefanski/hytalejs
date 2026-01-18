package com.bmstefanski.hytalejs;

import com.hypixel.hytale.server.core.plugin.JavaPlugin;
import com.hypixel.hytale.server.core.plugin.JavaPluginInit;
import com.caoccao.javet.exceptions.JavetException;
import com.caoccao.javet.interception.jvm.JavetJVMInterceptor;
import com.caoccao.javet.interop.V8Runtime;
import com.caoccao.javet.interop.converters.JavetProxyConverter;
import com.caoccao.javet.values.reference.V8ValueGlobalObject;

import javax.annotation.Nonnull;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.logging.Level;
import java.util.stream.Stream;

public class HytaleJS extends JavaPlugin {
  private ScriptRuntimePool runtimePool;
  private ScriptEventRegistry eventRegistry;
  private ScriptCommandRegistry commandRegistry;
  private ScriptScheduler scheduler;
  private Path scriptsDir;
  private HytaleJSConfig config;

  public HytaleJS(@Nonnull JavaPluginInit init) {
    super(init);
  }

  @Override
  protected void setup() {
    super.setup();

    Path configPath = getDataDirectory().resolve("config.json");
    config = HytaleJSConfig.load(configPath);

    scriptsDir = getDataDirectory().resolve("scripts");
    try {
      Files.createDirectories(scriptsDir);
    } catch (IOException e) {
      getLogger().at(Level.SEVERE).withCause(e).log("Failed to create scripts directory");
      return;
    }

    eventRegistry = new ScriptEventRegistry(this);
    commandRegistry = new ScriptCommandRegistry(this);
    scheduler = new ScriptScheduler();

    runtimePool = createRuntimePool(config);

    eventRegistry.setRuntimePool(runtimePool);
    commandRegistry.setRuntimePool(runtimePool);
    scheduler.setRuntimePool(runtimePool);

    getCommandRegistry().registerCommand(new HytaleJSCommand(this));

    loadScripts();
  }

  private ScriptRuntimePool createRuntimePool(HytaleJSConfig config) {
    String engine = config.getEngine() == null ? "graal" : config.getEngine().toLowerCase();
    if (engine.equals("javet")) {
      JavetRuntimePool.RuntimeType runtimeType = parseJavetRuntimeType(config);
      getLogger().at(Level.INFO).log("Initializing Javet runtime pool (%s)", runtimeType.name());
      return new JavetRuntimePool(config.getPoolSize(), runtimeType, this::setupBindings);
    }

    if (!engine.equals("graal")) {
      getLogger().at(Level.WARNING).log("Unknown engine '%s', defaulting to GraalJS", engine);
    }

    getLogger().at(Level.INFO).log("Initializing GraalJS runtime pool");
    return new GraalRuntimePool(config.getPoolSize(), this::setupBindings);
  }

  private JavetRuntimePool.RuntimeType parseJavetRuntimeType(HytaleJSConfig config) {
    String runtime = config.getJavet() != null && config.getJavet().getRuntime() != null
      ? config.getJavet().getRuntime().toLowerCase()
      : "v8";
    if (runtime.equals("node")) {
      getLogger().at(Level.WARNING).log("Javet Node runtime is not bundled; defaulting to V8");
      return JavetRuntimePool.RuntimeType.V8;
    }
    if (!runtime.equals("v8")) {
      getLogger().at(Level.WARNING).log("Unknown Javet runtime '%s', defaulting to V8", runtime);
    }
    return JavetRuntimePool.RuntimeType.V8;
  }

  private void setupBindings(ScriptRuntime runtime) {
    if (runtime instanceof JavetScriptRuntime javetRuntime) {
      setupJavetInterop(javetRuntime);
    }

    ScriptBindings.applyCoreBindings(runtime, this, commandRegistry, eventRegistry, scheduler);
  }

  private void setupJavetInterop(JavetScriptRuntime javetRuntime) {
    V8Runtime runtime = javetRuntime.getRuntime();
    runtime.setConverter(new JavetProxyConverter());

    try {
      try (V8ValueGlobalObject global = runtime.getGlobalObject()) {
        new JavetJVMInterceptor(runtime).register(global);
      }

      runtime.getExecutor(
        "globalThis.Java = {" +
          "type: (className) => {" +
            "let current = javet.package;" +
            "for (const part of className.split('.')) {" +
              "current = current[part];" +
            "}" +
            "return current;" +
          "}" +
        "};"
      ).executeVoid();
    } catch (JavetException e) {
      throw new RuntimeException("Failed to initialize Javet interop", e);
    }
  }

  private void loadScripts() {
    try (Stream<Path> paths = Files.walk(scriptsDir)) {
      List<Path> scriptPaths = paths.filter(Files::isRegularFile)
        .filter(p -> p.toString().endsWith(".js"))
        .toList();

      for (Path scriptPath : scriptPaths) {
        loadScriptIntoAllContexts(scriptPath);
      }
    } catch (IOException e) {
      getLogger().at(Level.SEVERE).withCause(e).log("Failed to load scripts");
    }
  }

  private void loadScriptIntoAllContexts(Path scriptPath) {
    try {
      String scriptContent = Files.readString(scriptPath);
      getLogger().at(Level.INFO).log("Loading script: %s", scriptPath.getFileName());

      for (ScriptRuntime runtime : runtimePool.getAllRuntimes()) {
        runtime.enter();
        try {
          runtime.eval(scriptContent);
          try (ScriptValue handlersValue = runtime.getGlobal("handlers")) {
            eventRegistry.registerFromHandlersArray(handlersValue);
          }
        } finally {
          runtime.leave();
        }
      }

      getLogger().at(Level.INFO).log("Successfully loaded script: %s", scriptPath.getFileName());
    } catch (Exception e) {
      getLogger().at(Level.SEVERE).withCause(e).log("Failed to load script: %s", scriptPath.getFileName());
    }
  }

  private boolean loadScriptIntoAllContextsSafe(Path scriptPath) {
    try {
      String scriptContent = Files.readString(scriptPath);
      getLogger().at(Level.INFO).log("Loading script: %s", scriptPath.getFileName());

      for (Context ctx : contextPool.getAllContexts()) {
        ctx.enter();
        try {
          ctx.eval("js", scriptContent);
          Value handlersValue = ctx.getBindings("js").getMember("handlers");
          eventRegistry.registerFromHandlersArray(handlersValue);
        } finally {
          ctx.leave();
        }
      }

      getLogger().at(Level.INFO).log("Successfully loaded script: %s", scriptPath.getFileName());
      return true;
    } catch (Exception e) {
      getLogger().at(Level.SEVERE).withCause(e).log("Failed to load script: %s", scriptPath.getFileName());
      return false;
    }
  }

  @Override
  protected void start() {
    super.start();
    getLogger().at(Level.INFO).log("HytaleJS started with %d event handlers", eventRegistry.getHandlerCount());
  }

  public ContextPoolStats getContextPoolStats() {
    if (runtimePool == null) {
      return new ContextPoolStats(0, 0, 0);
    }
    return new ContextPoolStats(
      runtimePool.getTotalSize(),
      runtimePool.getAvailableCount(),
      runtimePool.getBusyCount()
    );
  }

  public List<ScriptRuntimePool.QueuedOperation> getQueuedOperations() {
    if (runtimePool == null) {
      return List.of();
    }
    return runtimePool.getQueuedOperations();
  }

  @Override
  protected void shutdown() {
    super.shutdown();
    if (runtimePool != null) {
      runtimePool.close();
    }
    getLogger().at(Level.INFO).log("HytaleJS shutdown");
  }

  public ReloadResult reloadScripts() {
    scheduler.cancelAllTasks();

    eventRegistry.resetHandlerCount();

    contextPool = new ContextPool(config.getPoolSize(), this::setupBindings);

    eventRegistry.setContextPool(contextPool);
    commandRegistry.setContextPool(contextPool);
    scheduler.setContextPool(contextPool);

    int loaded = 0;
    int failed = 0;

    try (Stream<Path> paths = Files.walk(scriptsDir)) {
      List<Path> scriptPaths = paths.filter(Files::isRegularFile)
        .filter(p -> p.toString().endsWith(".js"))
        .toList();

      for (Path scriptPath : scriptPaths) {
        if (loadScriptIntoAllContextsSafe(scriptPath)) {
          loaded++;
        } else {
          failed++;
        }
      }
    } catch (IOException e) {
      getLogger().at(Level.SEVERE).withCause(e).log("Failed to reload scripts");
    }

    return new ReloadResult(loaded, failed);
  }

  public static class ContextPoolStats {
    private final int total;
    private final int available;
    private final int busy;

    public ContextPoolStats(int total, int available, int busy) {
      this.total = total;
      this.available = available;
      this.busy = busy;
    }

    public int getTotal() {
      return total;
    }

    public int getAvailable() {
      return available;
    }

    public int getBusy() {
      return busy;
    }
  }

  public static class ReloadResult {
    private final int loaded;
    private final int failed;

    public ReloadResult(int loaded, int failed) {
      this.loaded = loaded;
      this.failed = failed;
    }

    public int getLoaded() {
      return loaded;
    }

    public int getFailed() {
      return failed;
    }
  }
}
