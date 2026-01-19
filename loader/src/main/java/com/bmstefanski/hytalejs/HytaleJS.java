package com.bmstefanski.hytalejs;

import com.hypixel.hytale.server.core.plugin.JavaPlugin;
import com.hypixel.hytale.server.core.plugin.JavaPluginInit;
import com.caoccao.javet.exceptions.JavetException;
import com.caoccao.javet.interception.jvm.JavetJVMInterceptor;
import com.caoccao.javet.interop.V8Runtime;
import com.caoccao.javet.interop.loader.JavetLibLoader;
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
    String runtime = config.getRuntime() == null ? "graal" : config.getRuntime().toLowerCase();
    int poolSize = config.getRuntimePoolSize();
    if (!config.isRuntimeMultithreaded()) {
      getLogger().at(Level.INFO).log("Runtime multithreading disabled; forcing pool size to 1");
    }
    if (runtime.equals("javet")) {
      JavetNativeLibraryManager.prepare(config, getDataDirectory(), getLogger());
      getLogger().at(Level.INFO).log("Initializing Javet runtime pool (V8)");
      return new JavetRuntimePool(poolSize, this::setupBindings);
    }

    if (!runtime.equals("graal")) {
      getLogger().at(Level.WARNING).log("Unknown runtime '%s', defaulting to GraalJS", runtime);
    }

    getLogger().at(Level.INFO).log("Initializing GraalJS runtime pool");
    return new GraalRuntimePool(poolSize, this::setupBindings);
  }

  private void setupBindings(ScriptRuntime runtime) {
    if (runtime instanceof JavetScriptRuntime javetRuntime) {
      setupJavetInterop(javetRuntime);
    }

    ScriptBindings.applyCoreBindings(runtime, this, commandRegistry, eventRegistry, scheduler);
  }

  private void setupJavetInterop(JavetScriptRuntime javetRuntime) {
    V8Runtime runtime = javetRuntime.getRuntime();
    runtime.setConverter(new JavetFunctionConverter());

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

  private boolean loadScriptIntoAllContexts(Path scriptPath) {
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

  public RuntimeDebugInfo getRuntimeDebugInfo() {
    String configuredRuntime = config == null ? "graal" : config.getRuntime();
    String runtimeName = "Unknown";
    if (runtimePool instanceof JavetRuntimePool) {
      runtimeName = "Javet (V8)";
    } else if (runtimePool instanceof GraalRuntimePool) {
      runtimeName = "GraalJS";
    }

    int total = runtimePool == null ? 0 : runtimePool.getTotalSize();
    int available = runtimePool == null ? 0 : runtimePool.getAvailableCount();
    int busy = runtimePool == null ? 0 : runtimePool.getBusyCount();
    int queued = runtimePool == null ? 0 : runtimePool.getQueuedOperations().size();

    HytaleJSConfig.JavetConfig javetConfig = config == null ? null : config.getJavet();
    boolean javetDownloadEnabled = javetConfig == null || javetConfig.isDownloadEnabled();
    String javetBaseUrl = javetConfig == null ? "https://repo1.maven.org/maven2" : javetConfig.getDownloadBaseUrl();

    int configuredPoolSize = config == null ? 0 : config.getRuntimePoolSize();
    boolean multithreaded = config == null || config.isRuntimeMultithreaded();

    return new RuntimeDebugInfo(
      runtimeName,
      configuredRuntime,
      configuredPoolSize,
      multithreaded,
      total,
      available,
      busy,
      queued,
      scriptsDir,
      javetDownloadEnabled,
      javetBaseUrl,
      JavetLibLoader.LIB_VERSION
    );
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

    if (runtimePool != null) {
      runtimePool.close();
    }
    runtimePool = createRuntimePool(config);

    eventRegistry.setRuntimePool(runtimePool);
    commandRegistry.setRuntimePool(runtimePool);
    scheduler.setRuntimePool(runtimePool);

    int loaded = 0;
    int failed = 0;

    try (Stream<Path> paths = Files.walk(scriptsDir)) {
      List<Path> scriptPaths = paths.filter(Files::isRegularFile)
        .filter(p -> p.toString().endsWith(".js"))
        .toList();

      for (Path scriptPath : scriptPaths) {
        if (loadScriptIntoAllContexts(scriptPath)) {
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

  public static class RuntimeDebugInfo {
    private final String runtimeName;
    private final String configuredRuntime;
    private final int configuredPoolSize;
    private final boolean multithreaded;
    private final int total;
    private final int available;
    private final int busy;
    private final int queued;
    private final Path scriptsDir;
    private final boolean javetDownloadEnabled;
    private final String javetBaseUrl;
    private final String javetLibVersion;

    public RuntimeDebugInfo(
      String runtimeName,
      String configuredRuntime,
      int configuredPoolSize,
      boolean multithreaded,
      int total,
      int available,
      int busy,
      int queued,
      Path scriptsDir,
      boolean javetDownloadEnabled,
      String javetBaseUrl,
      String javetLibVersion
    ) {
      this.runtimeName = runtimeName;
      this.configuredRuntime = configuredRuntime;
      this.configuredPoolSize = configuredPoolSize;
      this.multithreaded = multithreaded;
      this.total = total;
      this.available = available;
      this.busy = busy;
      this.queued = queued;
      this.scriptsDir = scriptsDir;
      this.javetDownloadEnabled = javetDownloadEnabled;
      this.javetBaseUrl = javetBaseUrl;
      this.javetLibVersion = javetLibVersion;
    }

    public String getRuntimeName() {
      return runtimeName;
    }

    public String getConfiguredRuntime() {
      return configuredRuntime;
    }

    public int getConfiguredPoolSize() {
      return configuredPoolSize;
    }

    public boolean isMultithreaded() {
      return multithreaded;
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

    public int getQueued() {
      return queued;
    }

    public Path getScriptsDir() {
      return scriptsDir;
    }

    public boolean isJavetDownloadEnabled() {
      return javetDownloadEnabled;
    }

    public String getJavetBaseUrl() {
      return javetBaseUrl;
    }

    public String getJavetLibVersion() {
      return javetLibVersion;
    }
  }
}
