package com.bmstefanski.hytalejs;

import com.hypixel.hytale.server.core.plugin.JavaPlugin;
import com.hypixel.hytale.server.core.plugin.JavaPluginInit;
import com.caoccao.javet.interop.V8Runtime;
import com.caoccao.javet.interop.loader.JavetLibLoader;

import com.hypixel.hytale.server.core.universe.world.storage.EntityStore;
import com.hypixel.hytale.server.core.event.events.player.AddPlayerToWorldEvent;

import javax.annotation.Nonnull;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.logging.Level;
import java.util.stream.Stream;

public class HytaleJS extends JavaPlugin {
  private ScriptEventLoop eventLoop;
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
    eventRegistry.registerEcsSystems();
    configurePlayerMessages();
    commandRegistry = new ScriptCommandRegistry(this);
    scheduler = new ScriptScheduler();

    eventLoop = createEventLoop(config);

    eventRegistry.setEventLoop(eventLoop);
    commandRegistry.setEventLoop(eventLoop);
    scheduler.setEventLoop(eventLoop);

    getCommandRegistry().registerCommand(new HytaleJSCommand(this));

    loadScripts();
  }

  private ScriptEventLoop createEventLoop(HytaleJSConfig config) {
    JavetNativeLibraryManager.prepare(config, getDataDirectory(), getLogger());
    return new ScriptEventLoop(this::setupBindings);
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
  }

  @SuppressWarnings("unchecked")
  private void configurePlayerMessages() {
    if (config.isDisableJoinMessage()) {
      getEventRegistry().registerGlobal(AddPlayerToWorldEvent.class, event -> {
        event.setBroadcastJoinMessage(false);
      });
    }

    if (config.isDisableLeaveMessage()) {
      try {
        Class<?> originalSystemClass = Class.forName(
          "com.hypixel.hytale.server.core.modules.entity.player.PlayerSystems$PlayerRemovedSystem"
        );
        EntityStore.REGISTRY.unregisterSystem((Class) originalSystemClass);
        EntityStore.REGISTRY.registerSystem(new CustomPlayerRemovedSystem());
        CustomPlayerRemovedSystem.setBroadcastLeaveMessage(false);
      } catch (Exception ignored) {
      }
    }
  }

  private void loadScripts() {
    try (Stream<Path> paths = Files.walk(scriptsDir)) {
      List<Path> scriptPaths = paths.filter(Files::isRegularFile)
        .filter(p -> p.toString().endsWith(".js"))
        .toList();

      for (Path scriptPath : scriptPaths) {
        loadScriptIntoRuntime(scriptPath);
      }
    } catch (IOException e) {
      getLogger().at(Level.SEVERE).withCause(e).log("Failed to load scripts");
    }
  }

  private boolean loadScriptIntoRuntime(Path scriptPath) {
    try {
      String scriptContent = Files.readString(scriptPath);
      
      for (ScriptRuntime runtime : eventLoop.getAllRuntimes()) {
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

      return true;
    } catch (Exception e) {
      getLogger().at(Level.SEVERE).withCause(e).log("Failed to load script: %s", scriptPath.getFileName());
      return false;
    }
  }

  @Override
  protected void start() {
    super.start();
  }

  public RuntimeDebugInfo getRuntimeDebugInfo() {
    String runtimeName = "Javet (V8)";

    HytaleJSConfig.JavetConfig javetConfig = config == null ? null : config.getJavet();
    boolean javetDownloadEnabled = javetConfig == null || javetConfig.isDownloadEnabled();
    String javetBaseUrl = javetConfig == null ? "https://repo1.maven.org/maven2" : javetConfig.getDownloadBaseUrl();

    return new RuntimeDebugInfo(
      runtimeName,
      scriptsDir,
      javetDownloadEnabled,
      javetBaseUrl,
      JavetLibLoader.LIB_VERSION
    );
  }

  @Override
  protected void shutdown() {
    super.shutdown();
    if (eventLoop != null) {
      eventLoop.close();
    }
  }

  public ReloadResult reloadScripts() {
    scheduler.cancelAllTasks();
    eventRegistry.resetHandlerCount();

    if (eventLoop != null) {
      eventLoop.close();
    }
    eventLoop = createEventLoop(config);

    eventRegistry.setEventLoop(eventLoop);
    commandRegistry.setEventLoop(eventLoop);
    scheduler.setEventLoop(eventLoop);

    int loaded = 0;
    int failed = 0;

    try (Stream<Path> paths = Files.walk(scriptsDir)) {
      List<Path> scriptPaths = paths.filter(Files::isRegularFile)
        .filter(p -> p.toString().endsWith(".js"))
        .toList();

      for (Path scriptPath : scriptPaths) {
        if (loadScriptIntoRuntime(scriptPath)) {
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
    private final Path scriptsDir;
    private final boolean javetDownloadEnabled;
    private final String javetBaseUrl;
    private final String javetLibVersion;

    public RuntimeDebugInfo(
      String runtimeName,
      Path scriptsDir,
      boolean javetDownloadEnabled,
      String javetBaseUrl,
      String javetLibVersion
    ) {
      this.runtimeName = runtimeName;
      this.scriptsDir = scriptsDir;
      this.javetDownloadEnabled = javetDownloadEnabled;
      this.javetBaseUrl = javetBaseUrl;
      this.javetLibVersion = javetLibVersion;
    }

    public String getRuntimeName() {
      return runtimeName;
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
