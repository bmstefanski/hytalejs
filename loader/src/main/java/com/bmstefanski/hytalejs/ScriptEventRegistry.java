package com.bmstefanski.hytalejs;

import com.hypixel.hytale.component.ArchetypeChunk;
import com.hypixel.hytale.component.CommandBuffer;
import com.hypixel.hytale.component.Store;
import com.hypixel.hytale.component.query.Query;
import com.hypixel.hytale.component.system.EcsEvent;
import com.hypixel.hytale.component.system.EntityEventSystem;
import com.hypixel.hytale.event.IEvent;
import com.hypixel.hytale.server.core.event.events.ecs.*;
import com.hypixel.hytale.server.core.plugin.JavaPlugin;
import com.hypixel.hytale.server.core.universe.world.storage.EntityStore;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.function.Consumer;
import java.util.logging.Level;

public class ScriptEventRegistry {
  private final JavaPlugin plugin;
  private final Set<String> registeredEventTypes = new HashSet<>();
  private final Map<String, Consumer<Object>> ecsEventHandlers = new HashMap<>();
  private int handlerCount = 0;
  private ScriptRuntimePool runtimePool;

  private static final Map<String, String> EVENT_CLASSES = new HashMap<>();
  private static final Set<String> ECS_EVENTS = new HashSet<>();

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

    ECS_EVENTS.add("BreakBlockEvent");
    ECS_EVENTS.add("PlaceBlockEvent");
    ECS_EVENTS.add("DamageBlockEvent");
    ECS_EVENTS.add("UseBlockEvent");
    ECS_EVENTS.add("DropItemEvent");
    ECS_EVENTS.add("InteractivelyPickupItemEvent");
    ECS_EVENTS.add("ChangeGameModeEvent");
    ECS_EVENTS.add("CraftRecipeEvent");
    ECS_EVENTS.add("DiscoverZoneEvent");
    ECS_EVENTS.add("SwitchActiveSlotEvent");
  }

  public ScriptEventRegistry(JavaPlugin plugin) {
    this.plugin = plugin;
  }

  public void setRuntimePool(ScriptRuntimePool runtimePool) {
    this.runtimePool = runtimePool;
  }

  public void registerEcsSystems() {
    plugin.getEntityStoreRegistry().registerSystem(new BreakBlockEventSystem(this));
    plugin.getEntityStoreRegistry().registerSystem(new PlaceBlockEventSystem(this));
    plugin.getEntityStoreRegistry().registerSystem(new DamageBlockEventSystem(this));
    plugin.getEntityStoreRegistry().registerSystem(new UseBlockEventSystem(this));
    plugin.getEntityStoreRegistry().registerSystem(new DropItemEventSystem(this));
    plugin.getEntityStoreRegistry().registerSystem(new InteractivelyPickupItemEventSystem(this));
    plugin.getEntityStoreRegistry().registerSystem(new ChangeGameModeEventSystem(this));
    plugin.getEntityStoreRegistry().registerSystem(new CraftRecipeEventSystem(this));
    plugin.getEntityStoreRegistry().registerSystem(new DiscoverZoneEventSystem(this));
    plugin.getEntityStoreRegistry().registerSystem(new SwitchActiveSlotEventSystem(this));
  }

  void dispatchEcsEvent(String eventType, Object event) {
    Consumer<Object> handler = ecsEventHandlers.get(eventType);
    if (handler != null) {
      handler.accept(event);
    }
  }

  @SuppressWarnings("unchecked")
  public void registerHandler(String eventType, Object callback) {
    String className = EVENT_CLASSES.get(eventType);
    if (className == null) {
      plugin.getLogger().at(Level.WARNING).log("Unknown event type: %s", eventType);
      return;
    }

    boolean shouldClose = !(callback instanceof ScriptValue);
    ScriptValue callbackValue = ScriptValueFactory.from(callback);
    if (callbackValue == null || !callbackValue.isExecutable()) {
      plugin.getLogger().at(Level.SEVERE).log(
        "Event callback for '%s' is not executable (type: %s)",
        eventType,
        ScriptValueFactory.describe(callback)
      );
      if (shouldClose && callbackValue != null) {
        callbackValue.close();
      }
      return;
    }

    ScriptRuntime runtime = callbackValue.getRuntime();
    try (ScriptValue callbacks = runtime.getGlobal("__eventCallbacks__")) {
      if (callbacks == null) {
        plugin.getLogger().at(Level.WARNING).log(
          "Event callback map '__eventCallbacks__' is not initialized for '%s'",
          eventType
        );
        return;
      }
      callbacks.setMember(eventType, callbackValue);
    } finally {
      if (shouldClose) {
        callbackValue.close();
      }
    }
    handlerCount++;

    if (registeredEventTypes.contains(eventType)) {
      return;
    }
    registeredEventTypes.add(eventType);

    Consumer<Object> handler = event -> {
      try {
        if (runtimePool == null) {
          plugin.getLogger().at(Level.WARNING).log("Event handler skipped for '%s' (runtime pool not initialized)", eventType);
          return;
        }
        runtimePool.executeInRuntime("event:" + eventType, runtimeContext -> {
          try (ScriptValue callbacks = runtimeContext.getGlobal("__eventCallbacks__")) {
            if (callbacks == null) {
              return;
            }
            try (ScriptValue cb = callbacks.getMember(eventType)) {
              if (cb != null && cb.isExecutable()) {
                cb.executeVoid(event);
              }
            }
          }
        });
      } catch (Exception e) {
        plugin.getLogger().at(Level.SEVERE).withCause(e).log("Error executing handler for %s", eventType);
      }
    };

    if (ECS_EVENTS.contains(eventType)) {
      ecsEventHandlers.put(eventType, handler);
    } else {
      try {
        Class<?> eventClass = Class.forName(className);
        plugin.getEventRegistry().register(
          (Class<? super IEvent<Void>>) eventClass,
          (Consumer<IEvent<Void>>) (Consumer<?>) handler
        );
      } catch (ClassNotFoundException e) {
        plugin.getLogger().at(Level.SEVERE).withCause(e).log("Event class not found: %s", className);
      }
    }

    plugin.getLogger().at(Level.INFO).log("Registered handler for event: %s", eventType);
  }

  public void registerFromHandlersArray(ScriptValue handlersArray) {
    if (handlersArray == null || !handlersArray.hasArrayElements()) {
      return;
    }

    long length = handlersArray.getArraySize();
    for (int i = 0; i < length; i++) {
      try (ScriptValue handler = handlersArray.getArrayElement(i)) {
        if (handler != null && handler.hasMember("eventType") && handler.hasMember("callback")) {
          try (ScriptValue eventTypeValue = handler.getMember("eventType");
               ScriptValue callbackValue = handler.getMember("callback")) {
            if (eventTypeValue == null || callbackValue == null) {
              continue;
            }
            String eventType = eventTypeValue.asString();
            registerHandler(eventType, callbackValue);
          }
        }
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

  private static abstract class BaseEcsEventSystem<T extends EcsEvent> extends EntityEventSystem<EntityStore, T> {
    protected final ScriptEventRegistry registry;
    protected final String eventTypeName;

    BaseEcsEventSystem(Class<T> eventClass, ScriptEventRegistry registry, String eventTypeName) {
      super(eventClass);
      this.registry = registry;
      this.eventTypeName = eventTypeName;
    }

    @Override
    public void handle(int index, ArchetypeChunk<EntityStore> chunk, Store<EntityStore> store, CommandBuffer<EntityStore> buffer, T event) {
      registry.dispatchEcsEvent(eventTypeName, event);
    }

    @Override
    public Query<EntityStore> getQuery() {
      return Query.any();
    }
  }

  private static class BreakBlockEventSystem extends BaseEcsEventSystem<BreakBlockEvent> {
    BreakBlockEventSystem(ScriptEventRegistry registry) {
      super(BreakBlockEvent.class, registry, "BreakBlockEvent");
    }
  }

  private static class PlaceBlockEventSystem extends BaseEcsEventSystem<PlaceBlockEvent> {
    PlaceBlockEventSystem(ScriptEventRegistry registry) {
      super(PlaceBlockEvent.class, registry, "PlaceBlockEvent");
    }
  }

  private static class DamageBlockEventSystem extends BaseEcsEventSystem<DamageBlockEvent> {
    DamageBlockEventSystem(ScriptEventRegistry registry) {
      super(DamageBlockEvent.class, registry, "DamageBlockEvent");
    }
  }

  private static class UseBlockEventSystem extends BaseEcsEventSystem<UseBlockEvent> {
    UseBlockEventSystem(ScriptEventRegistry registry) {
      super(UseBlockEvent.class, registry, "UseBlockEvent");
    }
  }

  private static class DropItemEventSystem extends BaseEcsEventSystem<DropItemEvent> {
    DropItemEventSystem(ScriptEventRegistry registry) {
      super(DropItemEvent.class, registry, "DropItemEvent");
    }
  }

  private static class InteractivelyPickupItemEventSystem extends BaseEcsEventSystem<InteractivelyPickupItemEvent> {
    InteractivelyPickupItemEventSystem(ScriptEventRegistry registry) {
      super(InteractivelyPickupItemEvent.class, registry, "InteractivelyPickupItemEvent");
    }
  }

  private static class ChangeGameModeEventSystem extends BaseEcsEventSystem<ChangeGameModeEvent> {
    ChangeGameModeEventSystem(ScriptEventRegistry registry) {
      super(ChangeGameModeEvent.class, registry, "ChangeGameModeEvent");
    }
  }

  private static class CraftRecipeEventSystem extends BaseEcsEventSystem<CraftRecipeEvent> {
    CraftRecipeEventSystem(ScriptEventRegistry registry) {
      super(CraftRecipeEvent.class, registry, "CraftRecipeEvent");
    }
  }

  private static class DiscoverZoneEventSystem extends BaseEcsEventSystem<DiscoverZoneEvent> {
    DiscoverZoneEventSystem(ScriptEventRegistry registry) {
      super(DiscoverZoneEvent.class, registry, "DiscoverZoneEvent");
    }
  }

  private static class SwitchActiveSlotEventSystem extends BaseEcsEventSystem<SwitchActiveSlotEvent> {
    SwitchActiveSlotEventSystem(ScriptEventRegistry registry) {
      super(SwitchActiveSlotEvent.class, registry, "SwitchActiveSlotEvent");
    }
  }
}
