package com.bstefanski.hytalejs;

import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.*;

public class TypeGenerator {
    private static final Set<Class<?>> processedClasses = new HashSet<>();
    private static final Map<Class<?>, String> typeMapping = new HashMap<>();
    private static final StringBuilder output = new StringBuilder();
    private static final Set<Class<?>> toProcess = new LinkedHashSet<>();
    private static final Set<String> referencedTypes = new TreeSet<>();
    private static final Set<String> definedTypes = new HashSet<>();

    private static final List<String> EVENT_CLASSES = List.of(
        "com.hypixel.hytale.server.core.event.events.BootEvent",
        "com.hypixel.hytale.server.core.event.events.ShutdownEvent",
        "com.hypixel.hytale.server.core.event.events.PrepareUniverseEvent",
        "com.hypixel.hytale.server.core.event.events.player.PlayerConnectEvent",
        "com.hypixel.hytale.server.core.event.events.player.PlayerDisconnectEvent",
        "com.hypixel.hytale.server.core.event.events.player.PlayerChatEvent",
        "com.hypixel.hytale.server.core.event.events.player.PlayerReadyEvent",
        "com.hypixel.hytale.server.core.event.events.player.PlayerInteractEvent",
        "com.hypixel.hytale.server.core.event.events.player.PlayerCraftEvent",
        "com.hypixel.hytale.server.core.event.events.player.PlayerMouseButtonEvent",
        "com.hypixel.hytale.server.core.event.events.player.PlayerMouseMotionEvent",
        "com.hypixel.hytale.server.core.event.events.player.PlayerSetupConnectEvent",
        "com.hypixel.hytale.server.core.event.events.player.PlayerSetupDisconnectEvent",
        "com.hypixel.hytale.server.core.event.events.player.AddPlayerToWorldEvent",
        "com.hypixel.hytale.server.core.event.events.player.DrainPlayerFromWorldEvent",
        "com.hypixel.hytale.server.core.event.events.player.PlayerRefEvent",
        "com.hypixel.hytale.server.core.event.events.player.PlayerEvent",
        "com.hypixel.hytale.server.core.event.events.entity.EntityEvent",
        "com.hypixel.hytale.server.core.event.events.entity.EntityRemoveEvent",
        "com.hypixel.hytale.server.core.event.events.entity.LivingEntityInventoryChangeEvent",
        "com.hypixel.hytale.server.core.event.events.entity.LivingEntityUseBlockEvent",
        "com.hypixel.hytale.server.core.event.events.ecs.BreakBlockEvent",
        "com.hypixel.hytale.server.core.event.events.ecs.PlaceBlockEvent",
        "com.hypixel.hytale.server.core.event.events.ecs.DamageBlockEvent",
        "com.hypixel.hytale.server.core.event.events.ecs.UseBlockEvent",
        "com.hypixel.hytale.server.core.event.events.ecs.DropItemEvent",
        "com.hypixel.hytale.server.core.event.events.ecs.InteractivelyPickupItemEvent",
        "com.hypixel.hytale.server.core.event.events.ecs.ChangeGameModeEvent",
        "com.hypixel.hytale.server.core.event.events.ecs.CraftRecipeEvent",
        "com.hypixel.hytale.server.core.event.events.ecs.DiscoverZoneEvent",
        "com.hypixel.hytale.server.core.event.events.ecs.SwitchActiveSlotEvent",
        "com.hypixel.hytale.server.core.event.events.permissions.PlayerPermissionChangeEvent",
        "com.hypixel.hytale.server.core.event.events.permissions.GroupPermissionChangeEvent",
        "com.hypixel.hytale.server.core.event.events.permissions.PlayerGroupEvent"
    );

    private static final List<String> CORE_CLASSES = List.of(
        "com.hypixel.hytale.server.core.entity.entities.Player",
        "com.hypixel.hytale.server.core.universe.PlayerRef",
        "com.hypixel.hytale.server.core.universe.world.World",
        "com.hypixel.hytale.server.core.universe.Universe",
        "com.hypixel.hytale.server.core.HytaleServer",
        "com.hypixel.hytale.server.core.Message",
        "com.hypixel.hytale.server.core.entity.Entity",
        "com.hypixel.hytale.server.core.inventory.ItemStack",
        "com.hypixel.hytale.server.core.inventory.Inventory",
        "com.hypixel.hytale.server.core.asset.type.item.config.Item",
        "com.hypixel.hytale.server.core.asset.type.item.config.CraftingRecipe",
        "com.hypixel.hytale.server.core.asset.type.blocktype.config.BlockType",
        "com.hypixel.hytale.server.core.universe.world.meta.BlockState",
        "com.hypixel.hytale.component.Holder",
        "com.hypixel.hytale.component.Ref",
        "com.hypixel.hytale.math.vector.Vector3i",
        "com.hypixel.hytale.math.vector.Vector3f",
        "com.hypixel.hytale.math.vector.Vector3d",
        "com.hypixel.hytale.math.vector.Transform",
        "com.hypixel.hytale.protocol.Vector2f",
        "com.hypixel.hytale.protocol.GameMode",
        "com.hypixel.hytale.protocol.InteractionType",
        "com.hypixel.hytale.server.core.inventory.container.ItemContainer"
    );

    static {
        typeMapping.put(void.class, "void");
        typeMapping.put(boolean.class, "boolean");
        typeMapping.put(Boolean.class, "boolean");
        typeMapping.put(int.class, "number");
        typeMapping.put(Integer.class, "number");
        typeMapping.put(long.class, "number");
        typeMapping.put(Long.class, "number");
        typeMapping.put(float.class, "number");
        typeMapping.put(Float.class, "number");
        typeMapping.put(double.class, "number");
        typeMapping.put(Double.class, "number");
        typeMapping.put(String.class, "string");
        typeMapping.put(Object.class, "unknown");
    }

    public static void main(String[] args) {
        try {
            System.out.println("// Auto-generated TypeScript types from Hytale JAR");
            System.out.println("// Generated: " + new Date());
            System.out.println();

            for (String className : EVENT_CLASSES) {
                try {
                    Class<?> clazz = Class.forName(className);
                    toProcess.add(clazz);
                } catch (Throwable e) {
                    System.err.println("// WARNING: Event not found: " + className + " - " + e.getMessage());
                }
            }

            for (String className : CORE_CLASSES) {
                try {
                    Class<?> clazz = Class.forName(className);
                    toProcess.add(clazz);
                } catch (Throwable e) {
                    System.err.println("// WARNING: Core class not found: " + className + " - " + e.getMessage());
                }
            }

            while (!toProcess.isEmpty()) {
                Class<?> clazz = toProcess.iterator().next();
                toProcess.remove(clazz);
                if (!processedClasses.contains(clazz)) {
                    processClass(clazz);
                }
            }

            generateStubInterfaces();

            System.out.println(output);

            generateEventTypeUnion();
        } catch (Throwable e) {
            System.err.println("// FATAL ERROR: " + e.getClass().getName() + " - " + e.getMessage());
            e.printStackTrace();
        }
    }

    private static void processClass(Class<?> clazz) {
        if (processedClasses.contains(clazz)) return;
        if (clazz.isPrimitive()) return;
        if (clazz.isArray()) return;
        if (typeMapping.containsKey(clazz)) return;
        if (clazz.getPackageName().startsWith("java.")) return;

        processedClasses.add(clazz);

        String simpleName = clazz.getSimpleName();
        definedTypes.add(simpleName);
        output.append("export interface ").append(simpleName).append(" {\n");

        Set<String> seenMethods = new HashSet<>();
        for (Method method : clazz.getMethods()) {
            if (!Modifier.isPublic(method.getModifiers())) continue;
            if (method.getDeclaringClass() == Object.class) continue;
            if (method.isSynthetic()) continue;

            String methodSig = getMethodSignature(method);
            if (seenMethods.contains(methodSig)) continue;
            seenMethods.add(methodSig);

            output.append("  ").append(method.getName()).append("(");

            Type[] genericParamTypes = method.getGenericParameterTypes();
            for (int i = 0; i < genericParamTypes.length; i++) {
                if (i > 0) output.append(", ");
                output.append("arg").append(i).append(": ").append(toTsType(genericParamTypes[i]));
            }

            output.append("): ").append(toTsType(method.getGenericReturnType())).append(";\n");
        }

        output.append("}\n\n");
    }

    private static String getMethodSignature(Method method) {
        StringBuilder sb = new StringBuilder();
        sb.append(method.getName()).append("(");
        for (Class<?> param : method.getParameterTypes()) {
            sb.append(param.getName()).append(",");
        }
        sb.append(")");
        return sb.toString();
    }

    private static String toTsType(Type type) {
        if (type instanceof ParameterizedType paramType) {
            Type rawType = paramType.getRawType();
            Type[] typeArgs = paramType.getActualTypeArguments();

            if (rawType instanceof Class<?> rawClass) {
                if (List.class.isAssignableFrom(rawClass) || Collection.class.isAssignableFrom(rawClass)) {
                    if (typeArgs.length > 0) {
                        return toTsType(typeArgs[0]) + "[]";
                    }
                    return "unknown[]";
                }
                if (Map.class.isAssignableFrom(rawClass)) {
                    if (typeArgs.length >= 2) {
                        return "Map<" + toTsType(typeArgs[0]) + ", " + toTsType(typeArgs[1]) + ">";
                    }
                    return "Map<unknown, unknown>";
                }
            }
            return toTsType(rawType);
        }

        if (type instanceof Class<?> clazz) {
            return toTsTypeFromClass(clazz);
        }

        return "unknown";
    }

    private static String toTsTypeFromClass(Class<?> clazz) {
        if (typeMapping.containsKey(clazz)) {
            return typeMapping.get(clazz);
        }

        if (clazz.isArray()) {
            return toTsTypeFromClass(clazz.getComponentType()) + "[]";
        }

        if (List.class.isAssignableFrom(clazz) || Collection.class.isAssignableFrom(clazz)) {
            return "unknown[]";
        }

        if (Map.class.isAssignableFrom(clazz)) {
            return "Map<unknown, unknown>";
        }

        if (clazz.getPackageName().startsWith("java.")) {
            if (clazz == java.util.UUID.class) {
                return "{ toString(): string }";
            }
            return "unknown";
        }

        String simpleName = clazz.getSimpleName();
        referencedTypes.add(simpleName);
        return simpleName;
    }

    private static void generateStubInterfaces() {
        output.append("// Stub interfaces for referenced but undefined types\n");
        for (String typeName : referencedTypes) {
            if (!definedTypes.contains(typeName)) {
                output.append("export interface ").append(typeName).append(" {}\n");
                definedTypes.add(typeName);
            }
        }
        output.append("\n");
    }

    private static void generateEventTypeUnion() {
        System.out.println("export type EventType =");
        for (int i = 0; i < EVENT_CLASSES.size(); i++) {
            String className = EVENT_CLASSES.get(i);
            String simpleName = className.substring(className.lastIndexOf('.') + 1);
            String separator = (i < EVENT_CLASSES.size() - 1) ? " |" : ";";
            System.out.println("  | \"" + simpleName + "\"" + (i == EVENT_CLASSES.size() - 1 ? ";" : ""));
        }
    }
}
