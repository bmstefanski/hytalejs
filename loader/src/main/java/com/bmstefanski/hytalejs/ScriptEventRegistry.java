package com.bmstefanski.hytalejs;

import com.hypixel.hytale.event.IEvent;
import com.hypixel.hytale.server.core.plugin.JavaPlugin;
import org.graalvm.polyglot.Value;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.function.Consumer;
import java.util.logging.Level;

public class ScriptEventRegistry {
  private final JavaPlugin plugin;
  private final Set<String> registeredEventTypes = new HashSet<>();
  private int handlerCount = 0;
  private ContextPool contextPool;

  private static final Map<String, String> EVENT_CLASSES = new HashMap<>();

  static {
    EVENT_CLASSES.put("BootEvent", "com.hypixel.hytale.server.core.event.events.BootEvent");
    EVENT_CLASSES.put("ShutdownEvent", "com.hypixel.hytale.server.core.event.events.ShutdownEvent");
    EVENT_CLASSES.put("PrepareUniverseEvent", "com.hypixel.hytale.server.core.event.events.PrepareUniverseEvent");

    EVENT_CLASSES.put("PlayerConnectEvent", "com.hypixel.hytale.server.core.event.events.player.PlayerConnectEvent");
    EVENT_CLASSES.put("PlayerDisconnectEvent", "com.hypixel.hytale.server.core.event.events.player.PlayerDisconnectEvent");
    EVENT_CLASSES.put("PlayerChatEvent", "com.hypixel.hytale.server.core.event.events.player.PlayerChatEvent");
    EVENT_CLASSES.put("PlayerReadyEvent", "com.hypixel.hytale.server.core.event.events.player.PlayerReadyEvent");
    EVENT_CLASSES.put("PlayerInteractEvent", "com.hypixel.hytale.server.core.event.events.player.PlayerInteractEvent");
    EVENT_CLASSES.put("PlayerCraftEvent", "com.hypixel.hytale.server.core.event.events.player.PlayerCraftEvent");
    EVENT_CLASSES.put("PlayerMouseButtonEvent", "com.hypixel.hytale.server.core.event.events.player.PlayerMouseButtonEvent");
    EVENT_CLASSES.put("PlayerMouseMotionEvent", "com.hypixel.hytale.server.core.event.events.player.PlayerMouseMotionEvent");
    EVENT_CLASSES.put("PlayerSetupConnectEvent", "com.hypixel.hytale.server.core.event.events.player.PlayerSetupConnectEvent");
    EVENT_CLASSES.put("PlayerSetupDisconnectEvent", "com.hypixel.hytale.server.core.event.events.player.PlayerSetupDisconnectEvent");
    EVENT_CLASSES.put("AddPlayerToWorldEvent", "com.hypixel.hytale.server.core.event.events.player.AddPlayerToWorldEvent");
    EVENT_CLASSES.put("DrainPlayerFromWorldEvent", "com.hypixel.hytale.server.core.event.events.player.DrainPlayerFromWorldEvent");
    EVENT_CLASSES.put("PlayerRefEvent", "com.hypixel.hytale.server.core.event.events.player.PlayerRefEvent");
    EVENT_CLASSES.put("PlayerEvent", "com.hypixel.hytale.server.core.event.events.player.PlayerEvent");

    EVENT_CLASSES.put("EntityEvent", "com.hypixel.hytale.server.core.event.events.entity.EntityEvent");
    EVENT_CLASSES.put("EntityRemoveEvent", "com.hypixel.hytale.server.core.event.events.entity.EntityRemoveEvent");
    EVENT_CLASSES.put("LivingEntityInventoryChangeEvent", "com.hypixel.hytale.server.core.event.events.entity.LivingEntityInventoryChangeEvent");
    EVENT_CLASSES.put("LivingEntityUseBlockEvent", "com.hypixel.hytale.server.core.event.events.entity.LivingEntityUseBlockEvent");

    EVENT_CLASSES.put("BreakBlockEvent", "com.hypixel.hytale.server.core.event.events.ecs.BreakBlockEvent");
    EVENT_CLASSES.put("PlaceBlockEvent", "com.hypixel.hytale.server.core.event.events.ecs.PlaceBlockEvent");
    EVENT_CLASSES.put("DamageBlockEvent", "com.hypixel.hytale.server.core.event.events.ecs.DamageBlockEvent");
    EVENT_CLASSES.put("UseBlockEvent", "com.hypixel.hytale.server.core.event.events.ecs.UseBlockEvent");
    EVENT_CLASSES.put("DropItemEvent", "com.hypixel.hytale.server.core.event.events.ecs.DropItemEvent");
    EVENT_CLASSES.put("InteractivelyPickupItemEvent", "com.hypixel.hytale.server.core.event.events.ecs.InteractivelyPickupItemEvent");
    EVENT_CLASSES.put("ChangeGameModeEvent", "com.hypixel.hytale.server.core.event.events.ecs.ChangeGameModeEvent");
    EVENT_CLASSES.put("CraftRecipeEvent", "com.hypixel.hytale.server.core.event.events.ecs.CraftRecipeEvent");
    EVENT_CLASSES.put("DiscoverZoneEvent", "com.hypixel.hytale.server.core.event.events.ecs.DiscoverZoneEvent");
    EVENT_CLASSES.put("SwitchActiveSlotEvent", "com.hypixel.hytale.server.core.event.events.ecs.SwitchActiveSlotEvent");

    EVENT_CLASSES.put("PlayerPermissionChangeEvent", "com.hypixel.hytale.server.core.event.events.permissions.PlayerPermissionChangeEvent");
    EVENT_CLASSES.put("GroupPermissionChangeEvent", "com.hypixel.hytale.server.core.event.events.permissions.GroupPermissionChangeEvent");
    EVENT_CLASSES.put("PlayerGroupEvent", "com.hypixel.hytale.server.core.event.events.permissions.PlayerGroupEvent");
  }

  public ScriptEventRegistry(JavaPlugin plugin) {
    this.plugin = plugin;
  }

  public void setContextPool(ContextPool contextPool) {
    this.contextPool = contextPool;
  }

  @SuppressWarnings("unchecked")
  public void registerHandler(String eventType, Value callback) {
    String className = EVENT_CLASSES.get(eventType);
    if (className == null) {
      plugin.getLogger().at(Level.WARNING).log("Unknown event type: %s", eventType);
      return;
    }

    if (!callback.canExecute()) {
      plugin.getLogger().at(Level.WARNING).log("Event callback for '%s' is not executable", eventType);
      return;
    }

    callback.getContext().getBindings("js").getMember("__eventCallbacks__").putMember(eventType, callback);
    handlerCount++;

    if (registeredEventTypes.contains(eventType)) {
      return;
    }
    registeredEventTypes.add(eventType);

    try {
      Class<?> eventClass = Class.forName(className);

      Consumer<Object> handler = event -> {
        try {
          contextPool.executeInContext("event:" + eventType, ctx -> {
            Value callbacks = ctx.getBindings("js").getMember("__eventCallbacks__");
            Value cb = callbacks.getMember(eventType);
            if (cb != null && cb.canExecute()) {
              cb.execute(event);
            }
          });
        } catch (Exception e) {
          plugin.getLogger().at(Level.SEVERE).withCause(e).log("Error executing handler for %s", eventType);
        }
      };

      plugin.getEventRegistry().register(
        (Class<? super IEvent<Void>>) eventClass,
        (Consumer<IEvent<Void>>) (Consumer<?>) handler
      );

      plugin.getLogger().at(Level.INFO).log("Registered handler for event: %s", eventType);

    } catch (ClassNotFoundException e) {
      plugin.getLogger().at(Level.SEVERE).withCause(e).log("Event class not found: %s", className);
    }
  }

  public void registerFromHandlersArray(Value handlersArray) {
    if (handlersArray == null || !handlersArray.hasArrayElements()) {
      return;
    }

    long length = handlersArray.getArraySize();
    for (int i = 0; i < length; i++) {
      Value handler = handlersArray.getArrayElement(i);
      if (handler.hasMember("eventType") && handler.hasMember("callback")) {
        String eventType = handler.getMember("eventType").asString();
        Value callback = handler.getMember("callback");
        registerHandler(eventType, callback);
      }
    }
  }

  public int getHandlerCount() {
    return handlerCount;
  }

  public void resetHandlerCount() {
    handlerCount = 0;
  }

  public static boolean isValidEventType(String eventType) {
    return EVENT_CLASSES.containsKey(eventType);
  }

  public static String[] getAvailableEvents() {
    return EVENT_CLASSES.keySet().toArray(new String[0]);
  }
}
