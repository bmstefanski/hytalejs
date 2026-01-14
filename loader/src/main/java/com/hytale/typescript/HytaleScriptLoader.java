package com.hytale.typescript;

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

public class HytaleScriptLoader extends JavaPlugin {
    private Context jsContext;
    private ScriptEventRegistry eventRegistry;
    private Path scriptsDir;

    public HytaleScriptLoader(@Nonnull JavaPluginInit init) {
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
        jsContext.getBindings("js").putMember("server", new ScriptServer());
        jsContext.getBindings("js").putMember("Message", new ScriptMessage());

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
        getLogger().at(Level.INFO).log("TypeScript Loader started with %d event handlers", eventRegistry.getHandlerCount());
    }

    @Override
    protected void shutdown() {
        super.shutdown();
        if (jsContext != null) {
            jsContext.close();
        }
        getLogger().at(Level.INFO).log("TypeScript Loader shutdown");
    }
}
