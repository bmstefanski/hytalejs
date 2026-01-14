package com.hytale.typescript;

import com.hypixel.hytale.server.core.plugin.JavaPlugin;
import com.hypixel.hytale.server.core.plugin.JavaPluginInit;
import com.hypixel.hytale.server.core.event.events.player.PlayerConnectEvent;
import org.graalvm.polyglot.Context;
import org.graalvm.polyglot.HostAccess;
import org.graalvm.polyglot.Value;

import javax.annotation.Nonnull;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.stream.Stream;

public class HytaleScriptLoader extends JavaPlugin {
    private Context jsContext;
    private final List<ScriptEventHandler> eventHandlers = new ArrayList<>();
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

        jsContext.getBindings("js").putMember("plugin", this);
        jsContext.getBindings("js").putMember("logger", new ScriptLogger(getLogger()));

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
            if (handlersValue != null && handlersValue.hasArrayElements()) {
                long length = handlersValue.getArraySize();
                for (int i = 0; i < length; i++) {
                    Value handler = handlersValue.getArrayElement(i);
                    if (handler.hasMember("eventType") && handler.hasMember("callback")) {
                        String eventType = handler.getMember("eventType").asString();
                        Value callback = handler.getMember("callback");

                        if (callback.canExecute()) {
                            eventHandlers.add(new ScriptEventHandler(eventType, callback));
                            getLogger().at(Level.INFO).log("Registered handler for event: %s", eventType);
                        }
                    }
                }
            }

            getLogger().at(Level.INFO).log("Successfully loaded script: %s", scriptPath.getFileName());
        } catch (Exception e) {
            getLogger().at(Level.SEVERE).withCause(e).log("Failed to load script: %s", scriptPath.getFileName());
        }
    }

    @Override
    protected void start() {
        super.start();

        getEventRegistry().register(PlayerConnectEvent.class, this::onPlayerConnect);

        getLogger().at(Level.INFO).log("TypeScript Loader started with %d event handlers", eventHandlers.size());
    }

    private void onPlayerConnect(PlayerConnectEvent event) {
        for (ScriptEventHandler handler : eventHandlers) {
            if ("PlayerConnectEvent".equals(handler.eventType())) {
                try {
                    ScriptPlayerConnectEvent scriptEvent = new ScriptPlayerConnectEvent(event);
                    handler.callback().execute(scriptEvent);
                } catch (Exception e) {
                    getLogger().at(Level.SEVERE).withCause(e).log("Error executing event handler");
                }
            }
        }
    }

    @Override
    protected void shutdown() {
        super.shutdown();
        eventHandlers.clear();
        if (jsContext != null) {
            jsContext.close();
        }
        getLogger().at(Level.INFO).log("TypeScript Loader shutdown");
    }

    private record ScriptEventHandler(String eventType, Value callback) {}
}
