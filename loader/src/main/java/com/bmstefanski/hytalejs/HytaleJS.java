package com.bmstefanski.hytalejs;

import com.hypixel.hytale.server.core.plugin.JavaPlugin;
import com.hypixel.hytale.server.core.plugin.JavaPluginInit;
import org.graalvm.polyglot.Context;
import org.graalvm.polyglot.HostAccess;
import org.graalvm.polyglot.Value;

import javax.annotation.Nonnull;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.logging.Level;
import java.util.stream.Stream;

public class HytaleJS extends JavaPlugin {
  private Context jsContext;
  private ScriptEventRegistry eventRegistry;
  private Path scriptsDir;

  public HytaleJS(@Nonnull JavaPluginInit init) {
    super(init);
  }

  @Override
  protected void setup() {
    super.setup();

    scriptsDir = getDataDirectory().resolve("scripts");
    try {
      Files.createDirectories(scriptsDir);
    } catch (IOException e) {
      getLogger().at(Level.SEVERE).withCause(e).log("Failed to create scripts directory");
      return;
    }

    jsContext = Context.newBuilder("js")
      .allowHostAccess(HostAccess.ALL)
      .allowHostClassLookup(className -> true)
      .option("engine.WarnInterpreterOnly", "false")
      .build();

    eventRegistry = new ScriptEventRegistry(this);

    jsContext.getBindings("js").putMember("plugin", this);
    jsContext.getBindings("js").putMember("logger", new ScriptLogger(getLogger()));
    jsContext.getBindings("js").putMember("commands", new ScriptCommandRegistry(this));
    jsContext.getBindings("js").putMember("scheduler", new ScriptScheduler());
    jsContext.getBindings("js").putMember("Universe", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.universe.Universe')"));
    jsContext.getBindings("js").putMember("HytaleServer", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.HytaleServer')"));
    jsContext.getBindings("js").putMember("Message", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.Message')"));
    jsContext.getBindings("js").putMember("ItemStack", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.inventory.ItemStack')"));
    jsContext.getBindings("js").putMember("Item", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.asset.type.item.config.Item')"));

    jsContext.getBindings("js").putMember("Vector3i", jsContext.eval("js", "Java.type('com.hypixel.hytale.math.vector.Vector3i')"));
    jsContext.getBindings("js").putMember("Vector3f", jsContext.eval("js", "Java.type('com.hypixel.hytale.math.vector.Vector3f')"));
    jsContext.getBindings("js").putMember("Vector3d", jsContext.eval("js", "Java.type('com.hypixel.hytale.math.vector.Vector3d')"));
    jsContext.getBindings("js").putMember("Transform", jsContext.eval("js", "Java.type('com.hypixel.hytale.math.vector.Transform')"));
    jsContext.getBindings("js").putMember("Color", jsContext.eval("js", "Java.type('com.hypixel.hytale.protocol.Color')"));
    jsContext.getBindings("js").putMember("ColorLight", jsContext.eval("js", "Java.type('com.hypixel.hytale.protocol.ColorLight')"));

    jsContext.getBindings("js").putMember("Vector2i", jsContext.eval("js", "Java.type('com.hypixel.hytale.math.vector.Vector2i')"));
    jsContext.getBindings("js").putMember("Vector2d", jsContext.eval("js", "Java.type('com.hypixel.hytale.math.vector.Vector2d')"));
    jsContext.getBindings("js").putMember("Vector2f", jsContext.eval("js", "Java.type('com.hypixel.hytale.protocol.Vector2f')"));
    jsContext.getBindings("js").putMember("Box", jsContext.eval("js", "Java.type('com.hypixel.hytale.math.shape.Box')"));
    jsContext.getBindings("js").putMember("Cylinder", jsContext.eval("js", "Java.type('com.hypixel.hytale.math.shape.Cylinder')"));

    jsContext.getBindings("js").putMember("SoundEvent", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.asset.type.soundevent.config.SoundEvent')"));
    jsContext.getBindings("js").putMember("SoundCategory", jsContext.eval("js", "Java.type('com.hypixel.hytale.protocol.SoundCategory')"));
    jsContext.getBindings("js").putMember("PlaySoundEvent2D", jsContext.eval("js", "Java.type('com.hypixel.hytale.protocol.packets.world.PlaySoundEvent2D')"));

    jsContext.getBindings("js").putMember("DynamicLight", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.DynamicLight')"));
    jsContext.getBindings("js").putMember("PersistentDynamicLight", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.PersistentDynamicLight')"));

    jsContext.getBindings("js").putMember("Position", jsContext.eval("js", "Java.type('com.hypixel.hytale.protocol.Position')"));
    jsContext.getBindings("js").putMember("Direction", jsContext.eval("js", "Java.type('com.hypixel.hytale.protocol.Direction')"));
    jsContext.getBindings("js").putMember("PlaySoundEvent3D", jsContext.eval("js", "Java.type('com.hypixel.hytale.protocol.packets.world.PlaySoundEvent3D')"));
    jsContext.getBindings("js").putMember("PlaySoundEventEntity", jsContext.eval("js", "Java.type('com.hypixel.hytale.protocol.packets.world.PlaySoundEventEntity')"));
    jsContext.getBindings("js").putMember("SpawnParticleSystem", jsContext.eval("js", "Java.type('com.hypixel.hytale.protocol.packets.world.SpawnParticleSystem')"));
    jsContext.getBindings("js").putMember("ParticleSystem", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.asset.type.particle.config.ParticleSystem')"));

    jsContext.getBindings("js").putMember("AudioComponent", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.AudioComponent')"));
    jsContext.getBindings("js").putMember("DisplayNameComponent", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.DisplayNameComponent')"));
    jsContext.getBindings("js").putMember("TransformComponent", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.TransformComponent')"));

    loadScripts();
  }

  private void loadScripts() {
    try (Stream<Path> paths = Files.walk(scriptsDir)) {
      paths.filter(Files::isRegularFile)
        .filter(p -> p.toString().endsWith(".js"))
        .forEach(this::loadScript);
    } catch (IOException e) {
      getLogger().at(Level.SEVERE).withCause(e).log("Failed to load scripts");
    }
  }

  private void loadScript(Path scriptPath) {
    try {
      String scriptContent = Files.readString(scriptPath);
      getLogger().at(Level.INFO).log("Loading script: %s", scriptPath.getFileName());

      jsContext.eval("js", scriptContent);

      Value handlersValue = jsContext.getBindings("js").getMember("handlers");
      eventRegistry.registerFromHandlersArray(handlersValue);

      getLogger().at(Level.INFO).log("Successfully loaded script: %s", scriptPath.getFileName());
    } catch (Exception e) {
      getLogger().at(Level.SEVERE).withCause(e).log("Failed to load script: %s", scriptPath.getFileName());
    }
  }

  @Override
  protected void start() {
    super.start();
    getLogger().at(Level.INFO).log("HytaleJS started with %d event handlers", eventRegistry.getHandlerCount());
  }

  @Override
  protected void shutdown() {
    super.shutdown();
    if (jsContext != null) {
      jsContext.close();
    }
    getLogger().at(Level.INFO).log("HytaleJS shutdown");
  }
}
