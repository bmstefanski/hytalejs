package com.bmstefanski.hytalejs;

import com.hypixel.hytale.server.core.plugin.JavaPlugin;
import com.hypixel.hytale.server.core.plugin.JavaPluginInit;
import org.graalvm.polyglot.Context;
import org.graalvm.polyglot.Value;

import javax.annotation.Nonnull;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.logging.Level;
import java.util.stream.Stream;

public class HytaleJS extends JavaPlugin {
  private ContextPool contextPool;
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

    contextPool = new ContextPool(config.getPoolSize(), this::setupBindings);

    eventRegistry.setContextPool(contextPool);
    commandRegistry.setContextPool(contextPool);
    scheduler.setContextPool(contextPool);

    getCommandRegistry().registerCommand(new HytaleJSCommand(this));

    loadScripts();
  }

  private void setupBindings(Context ctx) {
    ctx.eval("js", "var __commandCallbacks__ = {}; var __eventCallbacks__ = {}; var __schedulerCallbacks__ = {};");
    ctx.getBindings("js").putMember("plugin", this);
    ctx.getBindings("js").putMember("logger", new ScriptLogger(getLogger()));
    ctx.getBindings("js").putMember("commands", commandRegistry);
    ctx.getBindings("js").putMember("events", eventRegistry);
    ctx.getBindings("js").putMember("scheduler", scheduler);
    ctx.getBindings("js").putMember("Universe", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.universe.Universe')"));
    ctx.getBindings("js").putMember("HytaleServer", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.HytaleServer')"));
    ctx.getBindings("js").putMember("Message", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.Message')"));
    ctx.getBindings("js").putMember("ItemStack", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.inventory.ItemStack')"));
    ctx.getBindings("js").putMember("Item", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.asset.type.item.config.Item')"));
    ctx.getBindings("js").putMember("BlockType", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.asset.type.blocktype.config.BlockType')"));
    ctx.getBindings("js").putMember("ChunkUtil", ctx.eval("js", "Java.type('com.hypixel.hytale.math.util.ChunkUtil')"));

    ctx.getBindings("js").putMember("Vector3i", ctx.eval("js", "Java.type('com.hypixel.hytale.math.vector.Vector3i')"));
    ctx.getBindings("js").putMember("Vector3f", ctx.eval("js", "Java.type('com.hypixel.hytale.math.vector.Vector3f')"));
    ctx.getBindings("js").putMember("Vector3d", ctx.eval("js", "Java.type('com.hypixel.hytale.math.vector.Vector3d')"));
    ctx.getBindings("js").putMember("Transform", ctx.eval("js", "Java.type('com.hypixel.hytale.math.vector.Transform')"));
    ctx.getBindings("js").putMember("Color", ctx.eval("js", "Java.type('com.hypixel.hytale.protocol.Color')"));
    ctx.getBindings("js").putMember("ColorLight", ctx.eval("js", "Java.type('com.hypixel.hytale.protocol.ColorLight')"));

    ctx.getBindings("js").putMember("Vector2i", ctx.eval("js", "Java.type('com.hypixel.hytale.math.vector.Vector2i')"));
    ctx.getBindings("js").putMember("Vector2d", ctx.eval("js", "Java.type('com.hypixel.hytale.math.vector.Vector2d')"));
    ctx.getBindings("js").putMember("Vector2f", ctx.eval("js", "Java.type('com.hypixel.hytale.protocol.Vector2f')"));
    ctx.getBindings("js").putMember("Box", ctx.eval("js", "Java.type('com.hypixel.hytale.math.shape.Box')"));
    ctx.getBindings("js").putMember("Cylinder", ctx.eval("js", "Java.type('com.hypixel.hytale.math.shape.Cylinder')"));

    ctx.getBindings("js").putMember("SoundEvent", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.asset.type.soundevent.config.SoundEvent')"));
    ctx.getBindings("js").putMember("SoundCategory", ctx.eval("js", "Java.type('com.hypixel.hytale.protocol.SoundCategory')"));
    ctx.getBindings("js").putMember("PlaySoundEvent2D", ctx.eval("js", "Java.type('com.hypixel.hytale.protocol.packets.world.PlaySoundEvent2D')"));

    ctx.getBindings("js").putMember("DynamicLight", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.DynamicLight')"));
    ctx.getBindings("js").putMember("PersistentDynamicLight", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.PersistentDynamicLight')"));

    ctx.getBindings("js").putMember("Position", ctx.eval("js", "Java.type('com.hypixel.hytale.protocol.Position')"));
    ctx.getBindings("js").putMember("Direction", ctx.eval("js", "Java.type('com.hypixel.hytale.protocol.Direction')"));
    ctx.getBindings("js").putMember("ModelTransform", ctx.eval("js", "Java.type('com.hypixel.hytale.protocol.ModelTransform')"));
    ctx.getBindings("js").putMember("PlaySoundEvent3D", ctx.eval("js", "Java.type('com.hypixel.hytale.protocol.packets.world.PlaySoundEvent3D')"));
    ctx.getBindings("js").putMember("PlaySoundEventEntity", ctx.eval("js", "Java.type('com.hypixel.hytale.protocol.packets.world.PlaySoundEventEntity')"));
    ctx.getBindings("js").putMember("SpawnParticleSystem", ctx.eval("js", "Java.type('com.hypixel.hytale.protocol.packets.world.SpawnParticleSystem')"));
    ctx.getBindings("js").putMember("ParticleSystem", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.asset.type.particle.config.ParticleSystem')"));

    ctx.getBindings("js").putMember("ServerSetBlocks", ctx.eval("js", "Java.type('com.hypixel.hytale.protocol.packets.world.ServerSetBlocks')"));
    ctx.getBindings("js").putMember("SetBlockCmd", ctx.eval("js", "Java.type('com.hypixel.hytale.protocol.packets.world.SetBlockCmd')"));

    ctx.getBindings("js").putMember("AudioComponent", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.AudioComponent')"));
    ctx.getBindings("js").putMember("DisplayNameComponent", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.DisplayNameComponent')"));
    ctx.getBindings("js").putMember("TransformComponent", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.TransformComponent')"));

    ctx.getBindings("js").putMember("ActiveEntityEffect", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.effect.ActiveEntityEffect')"));
    ctx.getBindings("js").putMember("CameraManager", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.entities.player.CameraManager')"));

    ctx.getBindings("js").putMember("AbilityEffects", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.asset.type.entityeffect.config.AbilityEffects')"));
    ctx.getBindings("js").putMember("ActiveAnimationComponent", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.ActiveAnimationComponent')"));
    ctx.getBindings("js").putMember("AliveCondition", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entitystats.asset.condition.AliveCondition')"));
    ctx.getBindings("js").putMember("AllLegacyEntityTypesQuery", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.AllLegacyEntityTypesQuery')"));
    ctx.getBindings("js").putMember("AllLegacyLivingEntityTypesQuery", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.AllLegacyLivingEntityTypesQuery')"));
    ctx.getBindings("js").putMember("AnimationUtils", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.AnimationUtils')"));
    ctx.getBindings("js").putMember("AOECircleSelector", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.selector.AOECircleSelector')"));
    ctx.getBindings("js").putMember("AOECylinderSelector", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.selector.AOECylinderSelector')"));
    ctx.getBindings("js").putMember("ApplicationEffects", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.asset.type.entityeffect.config.ApplicationEffects')"));
    ctx.getBindings("js").putMember("ApplyEffectInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.none.simple.ApplyEffectInteraction')"));

    ctx.getBindings("js").putMember("ApplyForceInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.client.ApplyForceInteraction')"));
    ctx.getBindings("js").putMember("ApplyRandomSkinPersistedComponent", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.player.ApplyRandomSkinPersistedComponent')"));
    ctx.getBindings("js").putMember("AudioSystems", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.system.AudioSystems')"));

    ctx.getBindings("js").putMember("BasicCollisionData", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.collision.BasicCollisionData')"));
    ctx.getBindings("js").putMember("BlockCollisionData", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.collision.BlockCollisionData')"));
    ctx.getBindings("js").putMember("BlockCollisionProvider", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.collision.BlockCollisionProvider')"));
    ctx.getBindings("js").putMember("BlockContactData", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.collision.BlockContactData')"));
    ctx.getBindings("js").putMember("BlockData", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.collision.BlockData')"));
    ctx.getBindings("js").putMember("BlockEntity", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.entities.BlockEntity')"));
    ctx.getBindings("js").putMember("BlockEntitySystems", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.BlockEntitySystems')"));
    ctx.getBindings("js").putMember("BlockHarvestUtils", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.BlockHarvestUtils')"));
    ctx.getBindings("js").putMember("BlockHealthChunk", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.blockhealth.BlockHealthChunk')"));
    ctx.getBindings("js").putMember("BlockMigrationExtraInfo", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.BlockMigrationExtraInfo')"));

    ctx.getBindings("js").putMember("BlockSetModule", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.blockset.BlockSetModule')"));
    ctx.getBindings("js").putMember("BoundingBox", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.BoundingBox')"));
    ctx.getBindings("js").putMember("BoxCollisionData", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.collision.BoxCollisionData')"));
    ctx.getBindings("js").putMember("BuilderToolInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.none.BuilderToolInteraction')"));
    ctx.getBindings("js").putMember("CalculationResult", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.universe.world.lighting.CalculationResult')"));
    ctx.getBindings("js").putMember("CameraInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.none.CameraInteraction')"));
    ctx.getBindings("js").putMember("ChainingInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.client.ChainingInteraction')"));
    ctx.getBindings("js").putMember("ChargingCondition", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entitystats.asset.condition.ChargingCondition')"));
    ctx.getBindings("js").putMember("ChargingInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.client.ChargingInteraction')"));
    ctx.getBindings("js").putMember("CheckUniqueItemUsageInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.CheckUniqueItemUsageInteraction')"));

    ctx.getBindings("js").putMember("ChunkLightingManager", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.universe.world.lighting.ChunkLightingManager')"));
    ctx.getBindings("js").putMember("ChunkTracker", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.player.ChunkTracker')"));
    ctx.getBindings("js").putMember("ClearEntityEffectInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.ClearEntityEffectInteraction')"));
    ctx.getBindings("js").putMember("ClientDelegatingProvider", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.accesscontrol.provider.ClientDelegatingProvider')"));
    ctx.getBindings("js").putMember("ClientSourcedSelector", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.selector.ClientSourcedSelector')"));
    ctx.getBindings("js").putMember("CollisionConfig", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.collision.CollisionConfig')"));
    ctx.getBindings("js").putMember("CollisionModuleConfig", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.collision.CollisionModuleConfig')"));
    ctx.getBindings("js").putMember("CollisionResultComponent", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.CollisionResultComponent')"));
    ctx.getBindings("js").putMember("CombatTextUIComponent", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entityui.asset.CombatTextUIComponent')"));
    ctx.getBindings("js").putMember("CombatTextUIComponentOpacityAnimationEvent", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entityui.asset.CombatTextUIComponentOpacityAnimationEvent')"));

    ctx.getBindings("js").putMember("CombatTextUIComponentPositionAnimationEvent", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entityui.asset.CombatTextUIComponentPositionAnimationEvent')"));
    ctx.getBindings("js").putMember("CombatTextUIComponentScaleAnimationEvent", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entityui.asset.CombatTextUIComponentScaleAnimationEvent')"));
    ctx.getBindings("js").putMember("ContainerBlockWindow", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.entities.player.windows.ContainerBlockWindow')"));
    ctx.getBindings("js").putMember("ContainerWindow", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.entities.player.windows.ContainerWindow')"));
    ctx.getBindings("js").putMember("CooldownHandler", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.CooldownHandler')"));
    ctx.getBindings("js").putMember("CraftingRecipePacketGenerator", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.item.CraftingRecipePacketGenerator')"));
    ctx.getBindings("js").putMember("DamageCalculator", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.combat.DamageCalculator')"));
    ctx.getBindings("js").putMember("DamageCalculatorSystems", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.damage.DamageCalculatorSystems')"));
    ctx.getBindings("js").putMember("DamageCause", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.damage.DamageCause')"));
    ctx.getBindings("js").putMember("DamageDataComponent", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.damage.DamageDataComponent')"));

    ctx.getBindings("js").putMember("DamageDataSetupSystem", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.damage.DamageDataSetupSystem')"));
    ctx.getBindings("js").putMember("DamageEffects", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.combat.DamageEffects')"));
    ctx.getBindings("js").putMember("DamageEntityInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.DamageEntityInteraction')"));
    ctx.getBindings("js").putMember("DamageModule", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.damage.DamageModule')"));
    ctx.getBindings("js").putMember("DamageSystems", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.damage.DamageSystems')"));
    ctx.getBindings("js").putMember("DeathComponent", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.damage.DeathComponent')"));
    ctx.getBindings("js").putMember("DeathItemLoss", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.damage.DeathItemLoss')"));
    ctx.getBindings("js").putMember("DeathSystems", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.damage.DeathSystems')"));
    ctx.getBindings("js").putMember("DebugPlugin", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.debug.DebugPlugin')"));
    ctx.getBindings("js").putMember("DebugUtils", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.debug.DebugUtils')"));
    ctx.getBindings("js").putMember("DeferredCorpseRemoval", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.damage.DeferredCorpseRemoval')"));
    ctx.getBindings("js").putMember("DespawnComponent", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.DespawnComponent')"));
    ctx.getBindings("js").putMember("DespawnSystem", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.DespawnSystem')"));
    ctx.getBindings("js").putMember("DestroyConditionInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.DestroyConditionInteraction')"));
    ctx.getBindings("js").putMember("DesyncDamageCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.damage.commands.DesyncDamageCommand')"));
    ctx.getBindings("js").putMember("DoorInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.DoorInteraction')"));
    ctx.getBindings("js").putMember("DynamicLightSystems", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.dynamiclight.DynamicLightSystems')"));
    ctx.getBindings("js").putMember("EffectConditionInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.none.EffectConditionInteraction')"));
    ctx.getBindings("js").putMember("EffectControllerComponent", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.effect.EffectControllerComponent')"));
    ctx.getBindings("js").putMember("Emote", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.cosmetics.Emote')"));
    ctx.getBindings("js").putMember("EntityCleanCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.command.commands.world.entity.EntityCleanCommand')"));
    ctx.getBindings("js").putMember("EntityCloneCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.command.commands.world.entity.EntityCloneCommand')"));
    ctx.getBindings("js").putMember("EntityCollisionProvider", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.collision.EntityCollisionProvider')"));
    ctx.getBindings("js").putMember("EntityCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.command.commands.world.entity.EntityCommand')"));
    ctx.getBindings("js").putMember("EntityContactData", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.collision.EntityContactData')"));
    ctx.getBindings("js").putMember("EntityCountCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.command.commands.world.entity.EntityCountCommand')"));
    ctx.getBindings("js").putMember("EntityDumpCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.command.commands.world.entity.EntityDumpCommand')"));
    ctx.getBindings("js").putMember("EntityEffect", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.asset.type.entityeffect.config.EntityEffect')"));
    ctx.getBindings("js").putMember("EntityEffectCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.command.commands.world.entity.EntityEffectCommand')"));
    ctx.getBindings("js").putMember("EntityEffectPacketGenerator", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.asset.type.entityeffect.EntityEffectPacketGenerator')"));

    ctx.getBindings("js").putMember("EntityGroup", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.group.EntityGroup')"));
    ctx.getBindings("js").putMember("EntityHideFromAdventurePlayersCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.command.commands.world.entity.EntityHideFromAdventurePlayersCommand')"));
    ctx.getBindings("js").putMember("EntityIntangibleCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.command.commands.world.entity.EntityIntangibleCommand')"));
    ctx.getBindings("js").putMember("EntityInteractableSystems", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.system.EntityInteractableSystems')"));
    ctx.getBindings("js").putMember("EntityInvulnerableCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.command.commands.world.entity.EntityInvulnerableCommand')"));
    ctx.getBindings("js").putMember("EntityLodCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.command.commands.world.entity.EntityLodCommand')"));
    ctx.getBindings("js").putMember("EntityMakeInteractableCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.command.commands.world.entity.EntityMakeInteractableCommand')"));
    ctx.getBindings("js").putMember("EntityModule", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.EntityModule')"));
    ctx.getBindings("js").putMember("EntityNameplateCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.command.commands.world.entity.EntityNameplateCommand')"));
    ctx.getBindings("js").putMember("EntityRefCollisionProvider", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.collision.EntityRefCollisionProvider')"));

    ctx.getBindings("js").putMember("EntityRegistration", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.EntityRegistration')"));
    ctx.getBindings("js").putMember("EntityRegistry", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.EntityRegistry')"));
    ctx.getBindings("js").putMember("EntityRemoveCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.command.commands.world.entity.EntityRemoveCommand')"));
    ctx.getBindings("js").putMember("EntityRemoveEvent", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.event.events.entity.EntityRemoveEvent')"));
    ctx.getBindings("js").putMember("EntityResendCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.command.commands.world.entity.EntityResendCommand')"));
    ctx.getBindings("js").putMember("EntityScaleComponent", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.EntityScaleComponent')"));
    ctx.getBindings("js").putMember("EntitySnapshot", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.EntitySnapshot')"));
    ctx.getBindings("js").putMember("EntitySnapshotHistoryCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.command.commands.world.entity.snapshot.EntitySnapshotHistoryCommand')"));
    ctx.getBindings("js").putMember("EntitySnapshotLengthCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.command.commands.world.entity.snapshot.EntitySnapshotLengthCommand')"));
    ctx.getBindings("js").putMember("EntitySnapshotSubCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.command.commands.world.entity.snapshot.EntitySnapshotSubCommand')"));

    ctx.getBindings("js").putMember("EntitySpatialSystem", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.system.EntitySpatialSystem')"));
    ctx.getBindings("js").putMember("EntityStatMap", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entitystats.EntityStatMap')"));
    ctx.getBindings("js").putMember("EntityStatsAddCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.command.commands.world.entity.stats.EntityStatsAddCommand')"));
    ctx.getBindings("js").putMember("EntityStatsDumpCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.command.commands.world.entity.stats.EntityStatsDumpCommand')"));
    ctx.getBindings("js").putMember("EntityStatsGetCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.command.commands.world.entity.stats.EntityStatsGetCommand')"));
    ctx.getBindings("js").putMember("EntityStatsResetCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.command.commands.world.entity.stats.EntityStatsResetCommand')"));
    ctx.getBindings("js").putMember("EntityStatsSetCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.command.commands.world.entity.stats.EntityStatsSetCommand')"));
    ctx.getBindings("js").putMember("EntityStatsSetToMaxCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.command.commands.world.entity.stats.EntityStatsSetToMaxCommand')"));
    ctx.getBindings("js").putMember("EntityStatsSubCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.command.commands.world.entity.stats.EntityStatsSubCommand')"));
    ctx.getBindings("js").putMember("EntityStatType", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entitystats.asset.EntityStatType')"));

    ctx.getBindings("js").putMember("EntityStatTypePacketGenerator", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entitystats.asset.EntityStatTypePacketGenerator')"));
    ctx.getBindings("js").putMember("EntityStatUIComponent", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entityui.asset.EntityStatUIComponent')"));
    ctx.getBindings("js").putMember("EntityStatValue", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entitystats.EntityStatValue')"));
    ctx.getBindings("js").putMember("EntitySystems", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.system.EntitySystems')"));
    ctx.getBindings("js").putMember("EntityTrackerCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.command.commands.world.entity.EntityTrackerCommand')"));
    ctx.getBindings("js").putMember("EntityTrackerSystems", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.tracker.EntityTrackerSystems')"));
    ctx.getBindings("js").putMember("EntityUIComponentPacketGenerator", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entityui.asset.EntityUIComponentPacketGenerator')"));
    ctx.getBindings("js").putMember("EntityUIModule", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entityui.EntityUIModule')"));
    ctx.getBindings("js").putMember("EntityUtils", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.EntityUtils')"));
    ctx.getBindings("js").putMember("EnvironmentCondition", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entitystats.asset.condition.EnvironmentCondition')"));

    ctx.getBindings("js").putMember("EquipItemInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.EquipItemInteraction')"));
    ctx.getBindings("js").putMember("ExplosionConfig", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.ExplosionConfig')"));
    ctx.getBindings("js").putMember("ExplosionUtils", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.ExplosionUtils')"));
    ctx.getBindings("js").putMember("FirstClickInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.client.FirstClickInteraction')"));
    ctx.getBindings("js").putMember("FloodLightCalculation", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.universe.world.lighting.FloodLightCalculation')"));
    ctx.getBindings("js").putMember("ForceProviderEntity", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.physics.util.ForceProviderEntity')"));
    ctx.getBindings("js").putMember("FromPrefab", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.FromPrefab')"));
    ctx.getBindings("js").putMember("FromWorldGen", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.FromWorldGen')"));
    ctx.getBindings("js").putMember("Frozen", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.Frozen')"));
    ctx.getBindings("js").putMember("FullBrightLightCalculation", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.universe.world.lighting.FullBrightLightCalculation')"));

    ctx.getBindings("js").putMember("GenericVelocityInstructionSystem", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.physics.systems.GenericVelocityInstructionSystem')"));
    ctx.getBindings("js").putMember("GlidingCondition", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entitystats.asset.condition.GlidingCondition')"));
    ctx.getBindings("js").putMember("HeadRotation", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.HeadRotation')"));
    ctx.getBindings("js").putMember("HiddenFromAdventurePlayers", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.HiddenFromAdventurePlayers')"));
    ctx.getBindings("js").putMember("HiddenPlayersManager", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.entities.player.HiddenPlayersManager')"));
    ctx.getBindings("js").putMember("HideEntitySystems", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.system.HideEntitySystems')"));
    ctx.getBindings("js").putMember("HitboxCollision", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.hitboxcollision.HitboxCollision')"));
    ctx.getBindings("js").putMember("HitboxCollisionConfig", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.hitboxcollision.HitboxCollisionConfig')"));
    ctx.getBindings("js").putMember("HitboxCollisionConfigPacketGenerator", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.hitboxcollision.HitboxCollisionConfigPacketGenerator')"));
    ctx.getBindings("js").putMember("HitboxCollisionSystems", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.hitboxcollision.HitboxCollisionSystems')"));
    ctx.getBindings("js").putMember("HitboxCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.collision.commands.HitboxCommand')"));
    ctx.getBindings("js").putMember("HorizontalSelector", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.selector.HorizontalSelector')"));
    ctx.getBindings("js").putMember("HotbarManager", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.entities.player.HotbarManager')"));
    ctx.getBindings("js").putMember("HudManager", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.entities.player.hud.HudManager')"));
    ctx.getBindings("js").putMember("HytaleBanProvider", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.accesscontrol.provider.HytaleBanProvider')"));
    ctx.getBindings("js").putMember("IncreaseBackpackCapacityInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.IncreaseBackpackCapacityInteraction')"));
    ctx.getBindings("js").putMember("InputUpdate", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.player.PlayerInput$InputUpdate')"));
    ctx.getBindings("js").putMember("Intangible", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.Intangible')"));
    ctx.getBindings("js").putMember("IntangibleSystems", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.system.IntangibleSystems')"));
    ctx.getBindings("js").putMember("Interactable", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.Interactable')"));
    ctx.getBindings("js").putMember("InteractionChain", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.InteractionChain')"));
    ctx.getBindings("js").putMember("InteractionConfiguration", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.InteractionConfiguration')"));
    ctx.getBindings("js").putMember("InteractionEffects", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.InteractionEffects')"));
    ctx.getBindings("js").putMember("InteractionEntry", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.InteractionEntry')"));
    ctx.getBindings("js").putMember("InteractionManager", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.InteractionManager')"));
    ctx.getBindings("js").putMember("InteractionSimulationHandler", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.InteractionSimulationHandler')"));
    ctx.getBindings("js").putMember("InteractionSystems", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.system.InteractionSystems')"));
    ctx.getBindings("js").putMember("InteractionTarget", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.util.InteractionTarget')"));
    ctx.getBindings("js").putMember("InteractionTypeUtils", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.InteractionTypeUtils')"));
    ctx.getBindings("js").putMember("InvalidatablePersistentRef", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.reference.InvalidatablePersistentRef')"));

    ctx.getBindings("js").putMember("Invulnerable", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.Invulnerable')"));
    ctx.getBindings("js").putMember("InvulnerableSystems", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.system.InvulnerableSystems')"));
    ctx.getBindings("js").putMember("ItemComponent", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.item.ItemComponent')"));
    ctx.getBindings("js").putMember("ItemContainerStateSpatialSystem", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.block.system.ItemContainerStateSpatialSystem')"));
    ctx.getBindings("js").putMember("ItemMergeSystem", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.item.ItemMergeSystem')"));
    ctx.getBindings("js").putMember("ItemPacketGenerator", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.item.ItemPacketGenerator')"));
    ctx.getBindings("js").putMember("ItemPhysicsComponent", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.item.ItemPhysicsComponent')"));
    ctx.getBindings("js").putMember("ItemPhysicsSystem", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.item.ItemPhysicsSystem')"));
    ctx.getBindings("js").putMember("ItemPrePhysicsSystem", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.item.ItemPrePhysicsSystem')"));
    ctx.getBindings("js").putMember("ItemRepairElement", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.entities.player.pages.itemrepair.ItemRepairElement')"));

    ctx.getBindings("js").putMember("ItemRepairPage", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.entities.player.pages.itemrepair.ItemRepairPage')"));
    ctx.getBindings("js").putMember("ItemReticleConfigPacketGenerator", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.item.ItemReticleConfigPacketGenerator')"));
    ctx.getBindings("js").putMember("ItemSpatialSystem", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.system.ItemSpatialSystem')"));
    ctx.getBindings("js").putMember("ItemStackContainerWindow", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.entities.player.windows.ItemStackContainerWindow')"));
    ctx.getBindings("js").putMember("ItemSystems", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.item.ItemSystems')"));
    ctx.getBindings("js").putMember("ItemUtils", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.ItemUtils')"));
    ctx.getBindings("js").putMember("JumpOperation", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.operation.JumpOperation')"));
    ctx.getBindings("js").putMember("KillFeedEvent", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.damage.event.KillFeedEvent')"));
    ctx.getBindings("js").putMember("KnockbackComponent", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.knockback.KnockbackComponent')"));
    ctx.getBindings("js").putMember("KnockbackPredictionSystems", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.player.KnockbackPredictionSystems')"));

    ctx.getBindings("js").putMember("KnockbackSimulation", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.player.KnockbackSimulation')"));
    ctx.getBindings("js").putMember("KnockbackSystems", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.knockback.KnockbackSystems')"));
    ctx.getBindings("js").putMember("Label", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.operation.Label')"));
    ctx.getBindings("js").putMember("LaunchPadInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.LaunchPadInteraction')"));
    ctx.getBindings("js").putMember("LaunchProjectileInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.LaunchProjectileInteraction')"));
    ctx.getBindings("js").putMember("LegacyEntityTrackerSystems", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.tracker.LegacyEntityTrackerSystems')"));
    ctx.getBindings("js").putMember("LegacyProjectileSystems", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.LegacyProjectileSystems')"));
    ctx.getBindings("js").putMember("LivingEntityEffectClearChangesSystem", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.livingentity.LivingEntityEffectClearChangesSystem')"));
    ctx.getBindings("js").putMember("LivingEntityEffectSystem", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.livingentity.LivingEntityEffectSystem')"));
    ctx.getBindings("js").putMember("LivingEntityInventoryChangeEvent", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.event.events.entity.LivingEntityInventoryChangeEvent')"));

    ctx.getBindings("js").putMember("LivingEntityUseBlockEvent", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.event.events.entity.LivingEntityUseBlockEvent')"));
    ctx.getBindings("js").putMember("LogicCondition", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entitystats.asset.condition.LogicCondition')"));
    ctx.getBindings("js").putMember("MaterialExtraResourcesSection", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.entities.player.windows.MaterialExtraResourcesSection')"));
    ctx.getBindings("js").putMember("MessagesUpdated", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.i18n.event.MessagesUpdated')"));
    ctx.getBindings("js").putMember("ModelComponent", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.ModelComponent')"));
    ctx.getBindings("js").putMember("ModelOverride", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.asset.type.entityeffect.config.ModelOverride')"));
    ctx.getBindings("js").putMember("ModelSystems", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.system.ModelSystems')"));
    ctx.getBindings("js").putMember("ModifyInventoryInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.ModifyInventoryInteraction')"));
    ctx.getBindings("js").putMember("MovementAudioComponent", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.MovementAudioComponent')"));
    ctx.getBindings("js").putMember("MovementConditionInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.client.MovementConditionInteraction')"));

    ctx.getBindings("js").putMember("MovementConfig", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.entities.player.movement.MovementConfig')"));
    ctx.getBindings("js").putMember("MovementManager", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.entities.player.movement.MovementManager')"));
    ctx.getBindings("js").putMember("MovementStatesComponent", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.movement.MovementStatesComponent')"));
    ctx.getBindings("js").putMember("MovementStatesSystems", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.movement.MovementStatesSystems')"));
    ctx.getBindings("js").putMember("Nameplate", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.nameplate.Nameplate')"));
    ctx.getBindings("js").putMember("NameplateSystems", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.nameplate.NameplateSystems')"));
    ctx.getBindings("js").putMember("NetworkId", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.tracker.NetworkId')"));
    ctx.getBindings("js").putMember("NetworkSendableSpatialSystem", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.system.NetworkSendableSpatialSystem')"));
    ctx.getBindings("js").putMember("NewSpawnComponent", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.NewSpawnComponent')"));
    ctx.getBindings("js").putMember("NoDamageTakenCondition", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entitystats.asset.condition.NoDamageTakenCondition')"));

    ctx.getBindings("js").putMember("OperationsBuilder", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.operation.OperationsBuilder')"));
    ctx.getBindings("js").putMember("OutOfCombatCondition", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entitystats.asset.condition.OutOfCombatCondition')"));
    ctx.getBindings("js").putMember("OverlapBehavior", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.asset.type.entityeffect.config.OverlapBehavior')"));
    ctx.getBindings("js").putMember("PageManager", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.entities.player.pages.PageManager')"));
    ctx.getBindings("js").putMember("ParallelInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.none.ParallelInteraction')"));
    ctx.getBindings("js").putMember("Particle", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.asset.type.particle.config.Particle')"));
    ctx.getBindings("js").putMember("ParticleAnimationFrame", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.asset.type.particle.config.ParticleAnimationFrame')"));
    ctx.getBindings("js").putMember("ParticleAttractor", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.asset.type.particle.config.ParticleAttractor')"));
    ctx.getBindings("js").putMember("ParticleCollision", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.asset.type.particle.config.ParticleCollision')"));
    ctx.getBindings("js").putMember("ParticleCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.asset.type.particle.commands.ParticleCommand')"));

    ctx.getBindings("js").putMember("ParticleSpawnCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.asset.type.particle.commands.ParticleSpawnCommand')"));
    ctx.getBindings("js").putMember("ParticleSpawner", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.asset.type.particle.config.ParticleSpawner')"));
    ctx.getBindings("js").putMember("ParticleSpawnerGroup", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.asset.type.particle.config.ParticleSpawnerGroup')"));
    ctx.getBindings("js").putMember("ParticleSpawnerPacketGenerator", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.asset.type.particle.ParticleSpawnerPacketGenerator')"));
    ctx.getBindings("js").putMember("ParticleSpawnPage", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.asset.type.particle.pages.ParticleSpawnPage')"));
    ctx.getBindings("js").putMember("ParticleSystemPacketGenerator", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.asset.type.particle.ParticleSystemPacketGenerator')"));
    ctx.getBindings("js").putMember("PendingTeleport", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.teleport.PendingTeleport')"));
    ctx.getBindings("js").putMember("PersistentModel", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.PersistentModel')"));
    ctx.getBindings("js").putMember("PersistentRef", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.reference.PersistentRef')"));

    ctx.getBindings("js").putMember("PersistentRefCount", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.reference.PersistentRefCount')"));
    ctx.getBindings("js").putMember("PhysicsMath", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.physics.util.PhysicsMath')"));
    ctx.getBindings("js").putMember("PickBlockInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.client.PickBlockInteraction')"));
    ctx.getBindings("js").putMember("PickupItemComponent", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.item.PickupItemComponent')"));
    ctx.getBindings("js").putMember("PickupItemSystem", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.item.PickupItemSystem')"));
    ctx.getBindings("js").putMember("PlaceBlockInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.client.PlaceBlockInteraction')"));
    ctx.getBindings("js").putMember("PlacedByInteractionComponent", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.components.PlacedByInteractionComponent')"));
    ctx.getBindings("js").putMember("PlaceFluidInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.client.PlaceFluidInteraction')"));
    ctx.getBindings("js").putMember("PlacementCountConditionInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.PlacementCountConditionInteraction')"));
    ctx.getBindings("js").putMember("Player", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.entities.Player')"));

    ctx.getBindings("js").putMember("PlayerCameraAddSystem", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.player.PlayerCameraAddSystem')"));
    ctx.getBindings("js").putMember("PlayerChunkTrackerSystems", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.player.PlayerChunkTrackerSystems')"));
    ctx.getBindings("js").putMember("PlayerCollisionResultAddSystem", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.system.PlayerCollisionResultAddSystem')"));
    ctx.getBindings("js").putMember("PlayerCondition", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entitystats.asset.condition.PlayerCondition')"));
    ctx.getBindings("js").putMember("PlayerConfigData", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.entities.player.data.PlayerConfigData')"));
    ctx.getBindings("js").putMember("PlayerConnectionFlushSystem", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.player.PlayerConnectionFlushSystem')"));
    ctx.getBindings("js").putMember("PlayerDeathPositionData", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.entities.player.data.PlayerDeathPositionData')"));
    ctx.getBindings("js").putMember("PlayerHudManagerSystems", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.player.PlayerHudManagerSystems')"));
    ctx.getBindings("js").putMember("PlayerItemEntityPickupSystem", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.player.PlayerItemEntityPickupSystem')"));
    ctx.getBindings("js").putMember("PlayerMovementManagerSystems", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.player.PlayerMovementManagerSystems')"));
    ctx.getBindings("js").putMember("PlayerPingSystem", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.player.PlayerPingSystem')"));
    ctx.getBindings("js").putMember("PlayerProcessMovementSystem", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.player.PlayerProcessMovementSystem')"));
    ctx.getBindings("js").putMember("PlayerRegenerateStatsSystem", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entitystats.EntityStatsModule$PlayerRegenerateStatsSystem')"));
    ctx.getBindings("js").putMember("PlayerRespawnPointData", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.entities.player.data.PlayerRespawnPointData')"));
    ctx.getBindings("js").putMember("PlayerSavingSystems", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.player.PlayerSavingSystems')"));
    ctx.getBindings("js").putMember("PlayerSendInventorySystem", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.player.PlayerSendInventorySystem')"));
    ctx.getBindings("js").putMember("PlayerSkinComponent", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.player.PlayerSkinComponent')"));
    ctx.getBindings("js").putMember("PlayerSkinGradient", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.cosmetics.PlayerSkinGradient')"));
    ctx.getBindings("js").putMember("PlayerSkinGradientSet", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.cosmetics.PlayerSkinGradientSet')"));
    ctx.getBindings("js").putMember("PlayerSkinPart", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.cosmetics.PlayerSkinPart')"));

    ctx.getBindings("js").putMember("PlayerSkinPartTexture", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.cosmetics.PlayerSkinPartTexture')"));
    ctx.getBindings("js").putMember("PlayerSkinTintColor", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.cosmetics.PlayerSkinTintColor')"));
    ctx.getBindings("js").putMember("PlayerSpatialSystem", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.system.PlayerSpatialSystem')"));
    ctx.getBindings("js").putMember("PlayerSystems", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.player.PlayerSystems')"));
    ctx.getBindings("js").putMember("PlayerWorldData", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.entities.player.data.PlayerWorldData')"));
    ctx.getBindings("js").putMember("PositionDataComponent", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.PositionDataComponent')"));
    ctx.getBindings("js").putMember("PredictedProjectile", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.projectile.component.PredictedProjectile')"));
    ctx.getBindings("js").putMember("PredictedProjectileSystems", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.projectile.system.PredictedProjectileSystems')"));
    ctx.getBindings("js").putMember("PrefabBufferColumn", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.prefab.selection.buffer.impl.PrefabBufferColumn')"));
    ctx.getBindings("js").putMember("PrefabBufferUtil", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.prefab.selection.buffer.PrefabBufferUtil')"));
    ctx.getBindings("js").putMember("PrefabCopyableComponent", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.prefab.PrefabCopyableComponent')"));
    ctx.getBindings("js").putMember("PrefabLoadException", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.prefab.PrefabLoadException')"));
    ctx.getBindings("js").putMember("PrefabPasteEvent", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.prefab.event.PrefabPasteEvent')"));
    ctx.getBindings("js").putMember("PrefabPlaceEntityEvent", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.prefab.event.PrefabPlaceEntityEvent')"));
    ctx.getBindings("js").putMember("PrefabSaveException", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.prefab.PrefabSaveException')"));
    ctx.getBindings("js").putMember("PrefabSpawnerState", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.prefabspawner.PrefabSpawnerState')"));
    ctx.getBindings("js").putMember("PrefabStore", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.prefab.PrefabStore')"));
    ctx.getBindings("js").putMember("PreventItemMerging", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.item.PreventItemMerging')"));
    ctx.getBindings("js").putMember("PreventPickup", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.item.PreventPickup')"));
    ctx.getBindings("js").putMember("Projectile", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.projectile.component.Projectile')"));

    ctx.getBindings("js").putMember("ProjectileComponent", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.entities.ProjectileComponent')"));
    ctx.getBindings("js").putMember("ProjectileConfig", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.projectile.config.ProjectileConfig')"));
    ctx.getBindings("js").putMember("ProjectileConfigPacketGenerator", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.projectile.config.ProjectileConfigPacketGenerator')"));
    ctx.getBindings("js").putMember("ProjectileInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.projectile.interaction.ProjectileInteraction')"));
    ctx.getBindings("js").putMember("PropComponent", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.PropComponent')"));
    ctx.getBindings("js").putMember("RaycastSelector", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.selector.RaycastSelector')"));
    ctx.getBindings("js").putMember("RecipePacketGenerator", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.item.RecipePacketGenerator')"));
    ctx.getBindings("js").putMember("RefillContainerInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.RefillContainerInteraction')"));
    ctx.getBindings("js").putMember("RegeneratingModifier", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entitystats.asset.modifier.RegeneratingModifier')"));
    ctx.getBindings("js").putMember("RegeneratingValue", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entitystats.RegeneratingValue')"));

    ctx.getBindings("js").putMember("RegenHealthCondition", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entitystats.asset.condition.RegenHealthCondition')"));
    ctx.getBindings("js").putMember("RemovalBehavior", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.asset.type.entityeffect.config.RemovalBehavior')"));
    ctx.getBindings("js").putMember("RemoveEntityInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.none.simple.RemoveEntityInteraction')"));
    ctx.getBindings("js").putMember("RepairItemInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.entities.player.pages.itemrepair.RepairItemInteraction')"));
    ctx.getBindings("js").putMember("RepeatInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.none.RepeatInteraction')"));
    ctx.getBindings("js").putMember("ReplaceInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.none.ReplaceInteraction')"));
    ctx.getBindings("js").putMember("Repulsion", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.repulsion.Repulsion')"));
    ctx.getBindings("js").putMember("RepulsionConfig", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.repulsion.RepulsionConfig')"));
    ctx.getBindings("js").putMember("RepulsionConfigPacketGenerator", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.repulsion.RepulsionConfigPacketGenerator')"));
    ctx.getBindings("js").putMember("RepulsionSystems", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.repulsion.RepulsionSystems')"));

    ctx.getBindings("js").putMember("RespawnPage", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.entities.player.pages.RespawnPage')"));
    ctx.getBindings("js").putMember("RespawnSystems", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.damage.RespawnSystems')"));
    ctx.getBindings("js").putMember("RespondToHit", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.RespondToHit')"));
    ctx.getBindings("js").putMember("RespondToHitSystems", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.system.RespondToHitSystems')"));
    ctx.getBindings("js").putMember("RotateObjectComponent", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.RotateObjectComponent')"));
    ctx.getBindings("js").putMember("RotateObjectSystem", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.system.RotateObjectSystem')"));
    ctx.getBindings("js").putMember("SelectInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.none.SelectInteraction')"));
    ctx.getBindings("js").putMember("SelectionManager", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.prefab.selection.SelectionManager')"));
    ctx.getBindings("js").putMember("SerialInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.none.SerialInteraction')"));
    ctx.getBindings("js").putMember("ServerPlayerListModule", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.serverplayerlist.ServerPlayerListModule')"));

    ctx.getBindings("js").putMember("SingleplayerRequestAccessEvent", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.singleplayer.SingleplayerRequestAccessEvent')"));
    ctx.getBindings("js").putMember("SnapshotBuffer", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.SnapshotBuffer')"));
    ctx.getBindings("js").putMember("SnapshotSystems", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.system.SnapshotSystems')"));
    ctx.getBindings("js").putMember("SprintingCondition", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entitystats.asset.condition.SprintingCondition')"));
    ctx.getBindings("js").putMember("SprintStaminaRegenDelay", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.stamina.SprintStaminaRegenDelay')"));
    ctx.getBindings("js").putMember("StabSelector", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.selector.StabSelector')"));
    ctx.getBindings("js").putMember("StaminaGameplayConfig", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.stamina.StaminaGameplayConfig')"));
    ctx.getBindings("js").putMember("StaminaModule", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.stamina.StaminaModule')"));

    ctx.getBindings("js").putMember("StaminaSystems", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.stamina.StaminaSystems')"));
    ctx.getBindings("js").putMember("StandardPhysicsConfig", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.projectile.config.StandardPhysicsConfig')"));
    ctx.getBindings("js").putMember("StandardPhysicsTickSystem", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.projectile.system.StandardPhysicsTickSystem')"));
    ctx.getBindings("js").putMember("StatCondition", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entitystats.asset.condition.StatCondition')"));
    ctx.getBindings("js").putMember("StaticModifier", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entitystats.modifier.StaticModifier')"));
    ctx.getBindings("js").putMember("StatModifiersManager", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.StatModifiersManager')"));
    ctx.getBindings("js").putMember("StatModifyingSystem", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entitystats.EntityStatsSystems$StatModifyingSystem')"));
    ctx.getBindings("js").putMember("StringTag", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.data.StringTag')"));
    ctx.getBindings("js").putMember("SuffocatingCondition", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entitystats.asset.condition.SuffocatingCondition')"));
    ctx.getBindings("js").putMember("TangiableEntitySpatialSystem", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.collision.TangiableEntitySpatialSystem')"));

    ctx.getBindings("js").putMember("TargetEntityEffect", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.combat.TargetEntityEffect')"));
    ctx.getBindings("js").putMember("Teleport", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.teleport.Teleport')"));
    ctx.getBindings("js").putMember("TeleportSystems", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.teleport.TeleportSystems')"));
    ctx.getBindings("js").putMember("TimeModule", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.time.TimeModule')"));
    ctx.getBindings("js").putMember("TrackedPlacement", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.blocktrack.TrackedPlacement')"));
    ctx.getBindings("js").putMember("TransformSystems", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.system.TransformSystems')"));
    ctx.getBindings("js").putMember("UIComponentList", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entityui.UIComponentList')"));
    ctx.getBindings("js").putMember("UIComponentSystems", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entityui.UIComponentSystems')"));
    ctx.getBindings("js").putMember("UnarmedInteractions", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.UnarmedInteractions')"));
    ctx.getBindings("js").putMember("UnarmedInteractionsPacketGenerator", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.UnarmedInteractionsPacketGenerator')"));

    ctx.getBindings("js").putMember("UniqueItemUsagesComponent", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.entities.player.data.UniqueItemUsagesComponent')"));
    ctx.getBindings("js").putMember("UpdateEntitySeedSystem", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.system.UpdateEntitySeedSystem')"));
    ctx.getBindings("js").putMember("UpdateLocationSystems", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.system.UpdateLocationSystems')"));
    ctx.getBindings("js").putMember("UseEntityInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.client.UseEntityInteraction')"));
    ctx.getBindings("js").putMember("UUIDComponent", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.UUIDComponent')"));
    ctx.getBindings("js").putMember("VelocityConfig", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.splitvelocity.VelocityConfig')"));
    ctx.getBindings("js").putMember("VelocitySystems", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.physics.systems.VelocitySystems')"));
    ctx.getBindings("js").putMember("WieldingCondition", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entitystats.asset.condition.WieldingCondition')"));
    ctx.getBindings("js").putMember("WieldingInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.client.WieldingInteraction')"));
    ctx.getBindings("js").putMember("WindowManager", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.entities.player.windows.WindowManager')"));

    ctx.getBindings("js").putMember("WorldGenId", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.WorldGenId')"));
    ctx.getBindings("js").putMember("WorldParticle", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.asset.type.particle.config.WorldParticle')"));
    ctx.getBindings("js").putMember("WorldTimeResource", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.time.WorldTimeResource')"));
    ctx.getBindings("js").putMember("WorldTimeSystems", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.time.WorldTimeSystems')"));
    ctx.getBindings("js").putMember("WorldUtil", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.collision.WorldUtil')"));
    ctx.getBindings("js").putMember("AccessControlModule", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.accesscontrol.AccessControlModule')"));
    ctx.getBindings("js").putMember("BlockCounter", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.blocktrack.BlockCounter')"));
    ctx.getBindings("js").putMember("BlockFilter", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.prefab.selection.mask.BlockFilter')"));
    ctx.getBindings("js").putMember("BlockHealth", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.blockhealth.BlockHealth')"));
    ctx.getBindings("js").putMember("BlockHealthModule", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.blockhealth.BlockHealthModule')"));
    ctx.getBindings("js").putMember("BlockMask", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.prefab.selection.mask.BlockMask')"));
    ctx.getBindings("js").putMember("BlockModule", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.block.BlockModule')"));
    ctx.getBindings("js").putMember("BlockPattern", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.prefab.selection.mask.BlockPattern')"));
    ctx.getBindings("js").putMember("BlockSetLookupTable", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.blockset.BlockSetLookupTable')"));
    ctx.getBindings("js").putMember("BlockTracker", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.collision.BlockTracker')"));
    ctx.getBindings("js").putMember("BoxBlockIntersectionEvaluator", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.collision.BoxBlockIntersectionEvaluator')"));
    ctx.getBindings("js").putMember("ChangeActiveSlotInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.none.ChangeActiveSlotInteraction')"));
    ctx.getBindings("js").putMember("CollisionDataArray", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.collision.CollisionDataArray')"));
    ctx.getBindings("js").putMember("CollisionMath", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.collision.CollisionMath')"));
    ctx.getBindings("js").putMember("CollisionModule", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.collision.CollisionModule')"));
    ctx.getBindings("js").putMember("CollisionResult", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.collision.CollisionResult')"));
    ctx.getBindings("js").putMember("CollisionTracker", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.collision.CollisionTracker')"));
    ctx.getBindings("js").putMember("CosmeticRegistry", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.cosmetics.CosmeticRegistry')"));
    ctx.getBindings("js").putMember("CosmeticsModule", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.cosmetics.CosmeticsModule')"));
    ctx.getBindings("js").putMember("ForceProviderStandardState", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.physics.util.ForceProviderStandardState')"));
    ctx.getBindings("js").putMember("FragileBlock", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.blockhealth.FragileBlock')"));
    ctx.getBindings("js").putMember("HytaleWhitelistProvider", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.accesscontrol.provider.HytaleWhitelistProvider')"));
    ctx.getBindings("js").putMember("I18nModule", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.i18n.I18nModule')"));
    ctx.getBindings("js").putMember("InfiniteBan", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.accesscontrol.ban.InfiniteBan')"));
    ctx.getBindings("js").putMember("InteractionModule", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.InteractionModule')"));

    ctx.getBindings("js").putMember("Interactions", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.Interactions')"));
    ctx.getBindings("js").putMember("ItemModule", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.item.ItemModule')"));
    ctx.getBindings("js").putMember("LegacyModule", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.LegacyModule')"));
    ctx.getBindings("js").putMember("ListCollector", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.data.ListCollector')"));
    ctx.getBindings("js").putMember("MigrationModule", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.migrations.MigrationModule')"));
    ctx.getBindings("js").putMember("MovingBoxBoxCollisionEvaluator", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.collision.MovingBoxBoxCollisionEvaluator')"));
    ctx.getBindings("js").putMember("PhysicsValues", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.physics.component.PhysicsValues')"));
    ctx.getBindings("js").putMember("PhysicsValuesAddSystem", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.physics.systems.PhysicsValuesAddSystem')"));
    ctx.getBindings("js").putMember("PlayerSkin", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.cosmetics.PlayerSkin')"));
    ctx.getBindings("js").putMember("PrefabLoader", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.prefab.selection.buffer.PrefabLoader')"));

    ctx.getBindings("js").putMember("PrefabRotation", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.prefab.PrefabRotation')"));
    ctx.getBindings("js").putMember("PrefabWeights", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.prefab.PrefabWeights')"));
    ctx.getBindings("js").putMember("ProjectileModule", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.projectile.ProjectileModule')"));
    ctx.getBindings("js").putMember("RootInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.RootInteraction')"));
    ctx.getBindings("js").putMember("SimpleInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.SimpleInteraction')"));
    ctx.getBindings("js").putMember("SimplePhysicsProvider", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.physics.SimplePhysicsProvider')"));
    ctx.getBindings("js").putMember("SingleCollector", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.data.SingleCollector')"));
    ctx.getBindings("js").putMember("SingleplayerModule", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.singleplayer.SingleplayerModule')"));
    ctx.getBindings("js").putMember("StandardPhysicsProvider", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.projectile.config.StandardPhysicsProvider')"));
    ctx.getBindings("js").putMember("TimeCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.time.commands.TimeCommand')"));

    ctx.getBindings("js").putMember("TimedBan", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.accesscontrol.ban.TimedBan')"));
    ctx.getBindings("js").putMember("TimeResource", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.time.TimeResource')"));
    ctx.getBindings("js").putMember("TranslationMap", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.i18n.generator.TranslationMap')"));
    ctx.getBindings("js").putMember("TreeCollector", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.data.TreeCollector')"));
    ctx.getBindings("js").putMember("Velocity", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.physics.component.Velocity')"));
    ctx.getBindings("js").putMember("AddItemInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.client.AddItemInteraction')"));
    ctx.getBindings("js").putMember("BanCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.accesscontrol.commands.BanCommand')"));
    ctx.getBindings("js").putMember("BinaryPrefabBufferCodec", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.prefab.selection.buffer.BinaryPrefabBufferCodec')"));
    ctx.getBindings("js").putMember("BlockConditionInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.client.BlockConditionInteraction')"));
    ctx.getBindings("js").putMember("BlockDataProvider", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.collision.BlockDataProvider')"));

    ctx.getBindings("js").putMember("BlockInteractionUtils", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.BlockInteractionUtils')"));
    ctx.getBindings("js").putMember("BlockMaskConstants", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.prefab.selection.buffer.impl.PrefabBuffer$BlockMaskConstants')"));
    ctx.getBindings("js").putMember("BlockPlaceUtils", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.BlockPlaceUtils')"));
    ctx.getBindings("js").putMember("BlockSetCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.blockset.commands.BlockSetCommand')"));
    ctx.getBindings("js").putMember("BodyType", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.cosmetics.BodyType')"));
    ctx.getBindings("js").putMember("BreakBlockInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.client.BreakBlockInteraction')"));
    ctx.getBindings("js").putMember("BsonPrefabBufferDeserializer", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.prefab.selection.buffer.BsonPrefabBufferDeserializer')"));
    ctx.getBindings("js").putMember("CancelChainInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.none.CancelChainInteraction')"));
    ctx.getBindings("js").putMember("ChainFlagInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.none.ChainFlagInteraction')"));
    ctx.getBindings("js").putMember("ChangeBlockInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.client.ChangeBlockInteraction')"));
    ctx.getBindings("js").putMember("ChangeStateInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.client.ChangeStateInteraction')"));
    ctx.getBindings("js").putMember("ChangeStatInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.ChangeStatInteraction')"));
    ctx.getBindings("js").putMember("ChangeStatWithModifierInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.ChangeStatWithModifierInteraction')"));
    ctx.getBindings("js").putMember("CharacterCollisionData", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.collision.CharacterCollisionData')"));
    ctx.getBindings("js").putMember("CollisionMaterial", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.collision.CollisionMaterial')"));
    ctx.getBindings("js").putMember("ConditionInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.none.ConditionInteraction')"));
    ctx.getBindings("js").putMember("CooldownConditionInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.client.CooldownConditionInteraction')"));
    ctx.getBindings("js").putMember("CosmeticAssetValidator", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.cosmetics.CosmeticAssetValidator')"));
    ctx.getBindings("js").putMember("CosmeticType", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.cosmetics.CosmeticType')"));
    ctx.getBindings("js").putMember("CycleBlockGroupInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.client.CycleBlockGroupInteraction')"));
    ctx.getBindings("js").putMember("DamageClass", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.combat.DamageClass')"));
    ctx.getBindings("js").putMember("DebugCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.debug.commands.DebugCommand')"));
    ctx.getBindings("js").putMember("DebugShapeArrowCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.debug.commands.DebugShapeArrowCommand')"));
    ctx.getBindings("js").putMember("DebugShapeClearCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.debug.commands.DebugShapeClearCommand')"));
    ctx.getBindings("js").putMember("DebugShapeConeCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.debug.commands.DebugShapeConeCommand')"));
    ctx.getBindings("js").putMember("DebugShapeCubeCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.debug.commands.DebugShapeCubeCommand')"));
    ctx.getBindings("js").putMember("DebugShapeCylinderCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.debug.commands.DebugShapeCylinderCommand')"));
    ctx.getBindings("js").putMember("DebugShapeShowForceCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.debug.commands.DebugShapeShowForceCommand')"));
    ctx.getBindings("js").putMember("DebugShapeSphereCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.debug.commands.DebugShapeSphereCommand')"));
    ctx.getBindings("js").putMember("DebugShapeSubCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.debug.commands.DebugShapeSubCommand')"));
    ctx.getBindings("js").putMember("DestroyBlockInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.client.DestroyBlockInteraction')"));
    ctx.getBindings("js").putMember("DirectionalKnockback", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.combat.DirectionalKnockback')"));
    ctx.getBindings("js").putMember("EmoteCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.cosmetics.commands.EmoteCommand')"));
    ctx.getBindings("js").putMember("EnableTmpTagsCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.i18n.commands.EnableTmpTagsCommand')"));
    ctx.getBindings("js").putMember("ExplodeInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.client.ExplodeInteraction')"));
    ctx.getBindings("js").putMember("FluidIterator", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.prefab.selection.standard.BlockSelection$FluidIterator')"));
    ctx.getBindings("js").putMember("FlyCameraModule", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.camera.FlyCameraModule')"));
    ctx.getBindings("js").putMember("ForceAccumulator", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.physics.util.ForceAccumulator')"));
    ctx.getBindings("js").putMember("ForceKnockback", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.combat.ForceKnockback')"));
    ctx.getBindings("js").putMember("GenerateDefaultLanguageEvent", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.i18n.event.GenerateDefaultLanguageEvent')"));

    ctx.getBindings("js").putMember("GenerateI18nCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.i18n.commands.GenerateI18nCommand')"));
    ctx.getBindings("js").putMember("IncrementCooldownInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.client.IncrementCooldownInteraction')"));
    ctx.getBindings("js").putMember("InteractionCameraSettings", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.InteractionCameraSettings')"));
    ctx.getBindings("js").putMember("InteractionClearCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.commands.InteractionClearCommand')"));
    ctx.getBindings("js").putMember("InteractionCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.commands.InteractionCommand')"));
    ctx.getBindings("js").putMember("InteractionPacketGenerator", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.InteractionPacketGenerator')"));
    ctx.getBindings("js").putMember("InteractionPriorityCodec", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.InteractionPriorityCodec')"));
    ctx.getBindings("js").putMember("InteractionRules", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.InteractionRules')"));
    ctx.getBindings("js").putMember("InteractionRunCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.commands.InteractionRunCommand')"));
    ctx.getBindings("js").putMember("InteractionRunSpecificCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.commands.InteractionRunSpecificCommand')"));

    ctx.getBindings("js").putMember("InteractionSetSnapshotSourceCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.commands.InteractionSetSnapshotSourceCommand')"));
    ctx.getBindings("js").putMember("InteractionSnapshotSourceCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.commands.InteractionSnapshotSourceCommand')"));
    ctx.getBindings("js").putMember("InternationalizationCommands", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.i18n.commands.InternationalizationCommands')"));
    ctx.getBindings("js").putMember("InterruptInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.InterruptInteraction')"));
    ctx.getBindings("js").putMember("ItemQualityPacketGenerator", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.item.ItemQualityPacketGenerator')"));
    ctx.getBindings("js").putMember("ItemRepairPageSupplier", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.suppliers.ItemRepairPageSupplier')"));
    ctx.getBindings("js").putMember("LangFileParser", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.i18n.parser.LangFileParser')"));
    ctx.getBindings("js").putMember("MultiBlockMask", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.prefab.selection.mask.MultiBlockMask')"));
    ctx.getBindings("js").putMember("OpenContainerInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.OpenContainerInteraction')"));
    ctx.getBindings("js").putMember("OpenItemStackContainerInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.OpenItemStackContainerInteraction')"));

    ctx.getBindings("js").putMember("PhysicsBodyState", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.physics.util.PhysicsBodyState')"));
    ctx.getBindings("js").putMember("PhysicsBodyStateUpdater", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.physics.util.PhysicsBodyStateUpdater')"));
    ctx.getBindings("js").putMember("PhysicsBodyStateUpdaterMidpoint", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.physics.util.PhysicsBodyStateUpdaterMidpoint')"));
    ctx.getBindings("js").putMember("PhysicsBodyStateUpdaterRK4", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.physics.util.PhysicsBodyStateUpdaterRK4')"));
    ctx.getBindings("js").putMember("PhysicsBodyStateUpdaterSymplecticEuler", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.physics.util.PhysicsBodyStateUpdaterSymplecticEuler')"));
    ctx.getBindings("js").putMember("PhysicsConstants", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.physics.util.PhysicsConstants')"));
    ctx.getBindings("js").putMember("PhysicsFlags", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.physics.util.PhysicsFlags')"));
    ctx.getBindings("js").putMember("PlayCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.singleplayer.commands.PlayCommand')"));
    ctx.getBindings("js").putMember("PlayerMatcher", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.selector.PlayerMatcher')"));
    ctx.getBindings("js").putMember("PlayerSkinPartType", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.cosmetics.PlayerSkinPartType')"));
    ctx.getBindings("js").putMember("PlayFriendCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.singleplayer.commands.PlayFriendCommand')"));
    ctx.getBindings("js").putMember("PlayLanCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.singleplayer.commands.PlayLanCommand')"));
    ctx.getBindings("js").putMember("PlayOnlineCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.singleplayer.commands.PlayOnlineCommand')"));
    ctx.getBindings("js").putMember("PointKnockback", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.combat.PointKnockback')"));
    ctx.getBindings("js").putMember("PrefabBufferBlockEntry", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.prefab.selection.buffer.impl.PrefabBufferBlockEntry')"));
    ctx.getBindings("js").putMember("PrefabBufferCall", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.prefab.selection.buffer.PrefabBufferCall')"));
    ctx.getBindings("js").putMember("PrefabSpawnerCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.prefabspawner.commands.PrefabSpawnerCommand')"));
    ctx.getBindings("js").putMember("PrefabSpawnerGetCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.prefabspawner.commands.PrefabSpawnerGetCommand')"));
    ctx.getBindings("js").putMember("PrefabSpawnerModule", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.prefabspawner.PrefabSpawnerModule')"));
    ctx.getBindings("js").putMember("PrefabSpawnerSetCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.prefabspawner.commands.PrefabSpawnerSetCommand')"));
    ctx.getBindings("js").putMember("PrefabSpawnerWeightCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.prefabspawner.commands.PrefabSpawnerWeightCommand')"));
    ctx.getBindings("js").putMember("ResetCooldownInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.client.ResetCooldownInteraction')"));
    ctx.getBindings("js").putMember("RestingSupport", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.physics.RestingSupport')"));
    ctx.getBindings("js").putMember("RootInteractionPacketGenerator", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.RootInteractionPacketGenerator')"));
    ctx.getBindings("js").putMember("RunRootInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.none.RunRootInteraction')"));
    ctx.getBindings("js").putMember("SelectionPrefabSerializer", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.prefab.config.SelectionPrefabSerializer')"));
    ctx.getBindings("js").putMember("SendMessageInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.none.simple.SendMessageInteraction')"));
    ctx.getBindings("js").putMember("SpawnItemCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.item.commands.SpawnItemCommand')"));
    ctx.getBindings("js").putMember("SpawnPrefabInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.SpawnPrefabInteraction')"));
    ctx.getBindings("js").putMember("SplitVelocity", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.splitvelocity.SplitVelocity')"));
    ctx.getBindings("js").putMember("StatsConditionInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.none.StatsConditionInteraction')"));
    ctx.getBindings("js").putMember("StatsConditionWithModifierInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.none.StatsConditionWithModifierInteraction')"));
    ctx.getBindings("js").putMember("TimePacketSystem", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.time.TimePacketSystem')"));
    ctx.getBindings("js").putMember("TimeSystem", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.time.TimeSystem')"));
    ctx.getBindings("js").putMember("ToggleGliderInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.client.ToggleGliderInteraction')"));
    ctx.getBindings("js").putMember("TriggerCooldownInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.client.TriggerCooldownInteraction')"));
    ctx.getBindings("js").putMember("UnbanCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.accesscontrol.commands.UnbanCommand')"));
    ctx.getBindings("js").putMember("UpdateBinaryPrefabException", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.prefab.selection.buffer.UpdateBinaryPrefabException')"));
    ctx.getBindings("js").putMember("UseBlockInteraction", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.client.UseBlockInteraction')"));
    ctx.getBindings("js").putMember("VulnerableMatcher", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.selector.VulnerableMatcher')"));
    ctx.getBindings("js").putMember("WhitelistAddCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.accesscontrol.commands.WhitelistAddCommand')"));
    ctx.getBindings("js").putMember("WhitelistClearCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.accesscontrol.commands.WhitelistClearCommand')"));
    ctx.getBindings("js").putMember("WhitelistCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.accesscontrol.commands.WhitelistCommand')"));
    ctx.getBindings("js").putMember("WhitelistDisableCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.accesscontrol.commands.WhitelistDisableCommand')"));
    ctx.getBindings("js").putMember("WhitelistEnableCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.accesscontrol.commands.WhitelistEnableCommand')"));
    ctx.getBindings("js").putMember("WhitelistListCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.accesscontrol.commands.WhitelistListCommand')"));
    ctx.getBindings("js").putMember("WhitelistRemoveCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.accesscontrol.commands.WhitelistRemoveCommand')"));
    ctx.getBindings("js").putMember("WhitelistStatusCommand", ctx.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.accesscontrol.commands.WhitelistStatusCommand')"));
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
    } catch (Exception e) {
      getLogger().at(Level.SEVERE).withCause(e).log("Failed to load script: %s", scriptPath.getFileName());
    }
  }

  @Override
  protected void start() {
    super.start();
    getLogger().at(Level.INFO).log("HytaleJS started with %d event handlers", eventRegistry.getHandlerCount());
  }

  public ContextPoolStats getContextPoolStats() {
    if (contextPool == null) {
      return new ContextPoolStats(0, 0, 0);
    }
    return new ContextPoolStats(
      contextPool.getTotalSize(),
      contextPool.getAvailableCount(),
      contextPool.getBusyCount()
    );
  }

  public List<ContextPool.QueuedOperation> getQueuedOperations() {
    if (contextPool == null) {
      return List.of();
    }
    return contextPool.getQueuedOperations();
  }

  @Override
  protected void shutdown() {
    super.shutdown();
    if (contextPool != null) {
      contextPool.close();
    }
    getLogger().at(Level.INFO).log("HytaleJS shutdown");
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
}

