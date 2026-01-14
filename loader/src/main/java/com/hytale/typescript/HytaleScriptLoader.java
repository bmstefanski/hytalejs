package com.hytale.typescript;

import com.hypixel.hytale.server.core.plugin.JavaPlugin;
import com.hypixel.hytale.server.core.plugin.JavaPluginInit;
import com.hypixel.hytale.server.core.event.events.player.PlayerConnectEvent;
import org.mozilla.javascript.*;

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
    private Scriptable jsScope;
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

        jsContext = Context.enter();
        try {
            jsContext.setOptimizationLevel(-1);
            jsScope = jsContext.initStandardObjects();

            ScriptableObject.putProperty(jsScope, "plugin", Context.javaToJS(this, jsScope));
            ScriptableObject.putProperty(jsScope, "logger", Context.javaToJS(new ScriptLogger(getLogger()), jsScope));

            loadScripts();
        } finally {
            Context.exit();
        }
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
        Context cx = Context.enter();
        try {
            String scriptContent = Files.readString(scriptPath);
            getLogger().at(Level.INFO).log("Loading script: %s", scriptPath.getFileName());

            Object result = cx.evaluateString(jsScope, scriptContent, scriptPath.getFileName().toString(), 1, null);

            Object handlersObj = ScriptableObject.getProperty(jsScope, "handlers");
            if (handlersObj instanceof NativeArray) {
                NativeArray handlers = (NativeArray) handlersObj;
                for (int i = 0; i < handlers.getLength(); i++) {
                    Object handlerObj = handlers.get(i);
                    if (handlerObj instanceof Scriptable) {
                        Scriptable handler = (Scriptable) handlerObj;
                        String eventType = ScriptableObject.getProperty(handler, "eventType").toString();
                        Object callback = ScriptableObject.getProperty(handler, "callback");

                        if (callback instanceof Function) {
                            eventHandlers.add(new ScriptEventHandler(eventType, (Function) callback));
                            getLogger().at(Level.INFO).log("Registered handler for event: %s", eventType);
                        }
                    }
                }
            }

            getLogger().at(Level.INFO).log("Successfully loaded script: %s", scriptPath.getFileName());
        } catch (Exception e) {
            getLogger().at(Level.SEVERE).withCause(e).log("Failed to load script: %s", scriptPath.getFileName());
        } finally {
            Context.exit();
        }
    }

    @Override
    protected void start() {
        super.start();

        getEventRegistry().register(PlayerConnectEvent.class, this::onPlayerConnect);

        getLogger().at(Level.INFO).log("TypeScript Loader started with %d event handlers", eventHandlers.size());
    }

    private void onPlayerConnect(PlayerConnectEvent event) {
        Context cx = Context.enter();
        try {
            for (ScriptEventHandler handler : eventHandlers) {
                if ("PlayerConnectEvent".equals(handler.eventType())) {
                    try {
                        ScriptPlayerConnectEvent scriptEvent = new ScriptPlayerConnectEvent(event);
                        Object jsEvent = Context.javaToJS(scriptEvent, jsScope);
                        handler.callback().call(cx, jsScope, jsScope, new Object[]{jsEvent});
                    } catch (Exception e) {
                        getLogger().at(Level.SEVERE).withCause(e).log("Error executing event handler");
                    }
                }
            }
        } finally {
            Context.exit();
        }
    }

    @Override
    protected void shutdown() {
        super.shutdown();
        eventHandlers.clear();
        getLogger().at(Level.INFO).log("TypeScript Loader shutdown");
    }

    private record ScriptEventHandler(String eventType, Function callback) {}
}
