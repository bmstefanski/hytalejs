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
    jsContext.getBindings("js").putMember("BlockType", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.asset.type.blocktype.config.BlockType')"));
    jsContext.getBindings("js").putMember("ChunkUtil", jsContext.eval("js", "Java.type('com.hypixel.hytale.math.util.ChunkUtil')"));

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
    jsContext.getBindings("js").putMember("ModelTransform", jsContext.eval("js", "Java.type('com.hypixel.hytale.protocol.ModelTransform')"));
    jsContext.getBindings("js").putMember("PlaySoundEvent3D", jsContext.eval("js", "Java.type('com.hypixel.hytale.protocol.packets.world.PlaySoundEvent3D')"));
    jsContext.getBindings("js").putMember("PlaySoundEventEntity", jsContext.eval("js", "Java.type('com.hypixel.hytale.protocol.packets.world.PlaySoundEventEntity')"));
    jsContext.getBindings("js").putMember("SpawnParticleSystem", jsContext.eval("js", "Java.type('com.hypixel.hytale.protocol.packets.world.SpawnParticleSystem')"));
    jsContext.getBindings("js").putMember("ParticleSystem", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.asset.type.particle.config.ParticleSystem')"));

    jsContext.getBindings("js").putMember("ServerSetBlocks", jsContext.eval("js", "Java.type('com.hypixel.hytale.protocol.packets.world.ServerSetBlocks')"));
    jsContext.getBindings("js").putMember("SetBlockCmd", jsContext.eval("js", "Java.type('com.hypixel.hytale.protocol.packets.world.SetBlockCmd')"));

    jsContext.getBindings("js").putMember("AudioComponent", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.AudioComponent')"));
    jsContext.getBindings("js").putMember("DisplayNameComponent", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.DisplayNameComponent')"));
    jsContext.getBindings("js").putMember("TransformComponent", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.TransformComponent')"));

    jsContext.getBindings("js").putMember("ActiveEntityEffect", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.effect.ActiveEntityEffect')"));
    jsContext.getBindings("js").putMember("CameraManager", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.entities.player.CameraManager')"));

    jsContext.getBindings("js").putMember("AbilityEffects", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.asset.type.entityeffect.config.AbilityEffects')"));
    jsContext.getBindings("js").putMember("ActiveAnimationComponent", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.ActiveAnimationComponent')"));
    jsContext.getBindings("js").putMember("AliveCondition", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entitystats.asset.condition.AliveCondition')"));
    jsContext.getBindings("js").putMember("AllLegacyEntityTypesQuery", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.AllLegacyEntityTypesQuery')"));
    jsContext.getBindings("js").putMember("AllLegacyLivingEntityTypesQuery", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.AllLegacyLivingEntityTypesQuery')"));
    jsContext.getBindings("js").putMember("AnimationUtils", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.AnimationUtils')"));
    jsContext.getBindings("js").putMember("AOECircleSelector", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.selector.AOECircleSelector')"));
    jsContext.getBindings("js").putMember("AOECylinderSelector", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.selector.AOECylinderSelector')"));
    jsContext.getBindings("js").putMember("ApplicationEffects", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.asset.type.entityeffect.config.ApplicationEffects')"));
    jsContext.getBindings("js").putMember("ApplyEffectInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.none.simple.ApplyEffectInteraction')"));

    jsContext.getBindings("js").putMember("ApplyForceInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.client.ApplyForceInteraction')"));
    jsContext.getBindings("js").putMember("ApplyRandomSkinPersistedComponent", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.player.ApplyRandomSkinPersistedComponent')"));
    jsContext.getBindings("js").putMember("AudioSystems", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.system.AudioSystems')"));

    jsContext.getBindings("js").putMember("BasicCollisionData", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.collision.BasicCollisionData')"));
    jsContext.getBindings("js").putMember("BlockCollisionData", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.collision.BlockCollisionData')"));
    jsContext.getBindings("js").putMember("BlockCollisionProvider", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.collision.BlockCollisionProvider')"));
    jsContext.getBindings("js").putMember("BlockContactData", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.collision.BlockContactData')"));
    jsContext.getBindings("js").putMember("BlockData", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.collision.BlockData')"));
    jsContext.getBindings("js").putMember("BlockEntity", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.entities.BlockEntity')"));
    jsContext.getBindings("js").putMember("BlockEntitySystems", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.BlockEntitySystems')"));
    jsContext.getBindings("js").putMember("BlockHarvestUtils", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.BlockHarvestUtils')"));
    jsContext.getBindings("js").putMember("BlockHealthChunk", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.blockhealth.BlockHealthChunk')"));
    jsContext.getBindings("js").putMember("BlockMigrationExtraInfo", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.BlockMigrationExtraInfo')"));

    jsContext.getBindings("js").putMember("BlockSetModule", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.blockset.BlockSetModule')"));
    jsContext.getBindings("js").putMember("BoundingBox", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.BoundingBox')"));
    jsContext.getBindings("js").putMember("BoxCollisionData", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.collision.BoxCollisionData')"));
    jsContext.getBindings("js").putMember("BuilderToolInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.none.BuilderToolInteraction')"));
    jsContext.getBindings("js").putMember("CalculationResult", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.universe.world.lighting.CalculationResult')"));
    jsContext.getBindings("js").putMember("CameraInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.none.CameraInteraction')"));
    jsContext.getBindings("js").putMember("ChainingInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.client.ChainingInteraction')"));
    jsContext.getBindings("js").putMember("ChargingCondition", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entitystats.asset.condition.ChargingCondition')"));
    jsContext.getBindings("js").putMember("ChargingInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.client.ChargingInteraction')"));
    jsContext.getBindings("js").putMember("CheckUniqueItemUsageInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.CheckUniqueItemUsageInteraction')"));

    jsContext.getBindings("js").putMember("ChunkLightingManager", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.universe.world.lighting.ChunkLightingManager')"));
    jsContext.getBindings("js").putMember("ChunkTracker", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.player.ChunkTracker')"));
    jsContext.getBindings("js").putMember("ClearEntityEffectInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.ClearEntityEffectInteraction')"));
    jsContext.getBindings("js").putMember("ClientDelegatingProvider", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.accesscontrol.provider.ClientDelegatingProvider')"));
    jsContext.getBindings("js").putMember("ClientSourcedSelector", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.selector.ClientSourcedSelector')"));
    jsContext.getBindings("js").putMember("CollisionConfig", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.collision.CollisionConfig')"));
    jsContext.getBindings("js").putMember("CollisionModuleConfig", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.collision.CollisionModuleConfig')"));
    jsContext.getBindings("js").putMember("CollisionResultComponent", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.CollisionResultComponent')"));
    jsContext.getBindings("js").putMember("CombatTextUIComponent", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entityui.asset.CombatTextUIComponent')"));
    jsContext.getBindings("js").putMember("CombatTextUIComponentOpacityAnimationEvent", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entityui.asset.CombatTextUIComponentOpacityAnimationEvent')"));

    jsContext.getBindings("js").putMember("CombatTextUIComponentPositionAnimationEvent", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entityui.asset.CombatTextUIComponentPositionAnimationEvent')"));
    jsContext.getBindings("js").putMember("CombatTextUIComponentScaleAnimationEvent", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entityui.asset.CombatTextUIComponentScaleAnimationEvent')"));
    jsContext.getBindings("js").putMember("ContainerBlockWindow", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.entities.player.windows.ContainerBlockWindow')"));
    jsContext.getBindings("js").putMember("ContainerWindow", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.entities.player.windows.ContainerWindow')"));
    jsContext.getBindings("js").putMember("CooldownHandler", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.CooldownHandler')"));
    jsContext.getBindings("js").putMember("CraftingRecipePacketGenerator", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.item.CraftingRecipePacketGenerator')"));
    jsContext.getBindings("js").putMember("DamageCalculator", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.combat.DamageCalculator')"));
    jsContext.getBindings("js").putMember("DamageCalculatorSystems", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.damage.DamageCalculatorSystems')"));
    jsContext.getBindings("js").putMember("DamageCause", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.damage.DamageCause')"));
    jsContext.getBindings("js").putMember("DamageDataComponent", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.damage.DamageDataComponent')"));

    jsContext.getBindings("js").putMember("DamageDataSetupSystem", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.damage.DamageDataSetupSystem')"));
    jsContext.getBindings("js").putMember("DamageEffects", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.combat.DamageEffects')"));
    jsContext.getBindings("js").putMember("DamageEntityInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.DamageEntityInteraction')"));
    jsContext.getBindings("js").putMember("DamageModule", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.damage.DamageModule')"));
    jsContext.getBindings("js").putMember("DamageSystems", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.damage.DamageSystems')"));
    jsContext.getBindings("js").putMember("DeathComponent", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.damage.DeathComponent')"));
    jsContext.getBindings("js").putMember("DeathItemLoss", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.damage.DeathItemLoss')"));
    jsContext.getBindings("js").putMember("DeathSystems", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.damage.DeathSystems')"));
    jsContext.getBindings("js").putMember("DebugPlugin", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.debug.DebugPlugin')"));
    jsContext.getBindings("js").putMember("DebugUtils", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.debug.DebugUtils')"));
    jsContext.getBindings("js").putMember("DeferredCorpseRemoval", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.damage.DeferredCorpseRemoval')"));
    jsContext.getBindings("js").putMember("DespawnComponent", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.DespawnComponent')"));
    jsContext.getBindings("js").putMember("DespawnSystem", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.DespawnSystem')"));
    jsContext.getBindings("js").putMember("DestroyConditionInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.DestroyConditionInteraction')"));
    jsContext.getBindings("js").putMember("DesyncDamageCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.damage.commands.DesyncDamageCommand')"));
    jsContext.getBindings("js").putMember("DoorInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.DoorInteraction')"));
    jsContext.getBindings("js").putMember("DynamicLightSystems", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.dynamiclight.DynamicLightSystems')"));
    jsContext.getBindings("js").putMember("EffectConditionInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.none.EffectConditionInteraction')"));
    jsContext.getBindings("js").putMember("EffectControllerComponent", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.effect.EffectControllerComponent')"));
    jsContext.getBindings("js").putMember("Emote", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.cosmetics.Emote')"));
    jsContext.getBindings("js").putMember("EntityCleanCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.command.commands.world.entity.EntityCleanCommand')"));
    jsContext.getBindings("js").putMember("EntityCloneCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.command.commands.world.entity.EntityCloneCommand')"));
    jsContext.getBindings("js").putMember("EntityCollisionProvider", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.collision.EntityCollisionProvider')"));
    jsContext.getBindings("js").putMember("EntityCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.command.commands.world.entity.EntityCommand')"));
    jsContext.getBindings("js").putMember("EntityContactData", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.collision.EntityContactData')"));
    jsContext.getBindings("js").putMember("EntityCountCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.command.commands.world.entity.EntityCountCommand')"));
    jsContext.getBindings("js").putMember("EntityDumpCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.command.commands.world.entity.EntityDumpCommand')"));
    jsContext.getBindings("js").putMember("EntityEffect", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.asset.type.entityeffect.config.EntityEffect')"));
    jsContext.getBindings("js").putMember("EntityEffectCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.command.commands.world.entity.EntityEffectCommand')"));
    jsContext.getBindings("js").putMember("EntityEffectPacketGenerator", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.asset.type.entityeffect.EntityEffectPacketGenerator')"));

    jsContext.getBindings("js").putMember("EntityGroup", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.group.EntityGroup')"));
    jsContext.getBindings("js").putMember("EntityHideFromAdventurePlayersCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.command.commands.world.entity.EntityHideFromAdventurePlayersCommand')"));
    jsContext.getBindings("js").putMember("EntityIntangibleCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.command.commands.world.entity.EntityIntangibleCommand')"));
    jsContext.getBindings("js").putMember("EntityInteractableSystems", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.system.EntityInteractableSystems')"));
    jsContext.getBindings("js").putMember("EntityInvulnerableCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.command.commands.world.entity.EntityInvulnerableCommand')"));
    jsContext.getBindings("js").putMember("EntityLodCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.command.commands.world.entity.EntityLodCommand')"));
    jsContext.getBindings("js").putMember("EntityMakeInteractableCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.command.commands.world.entity.EntityMakeInteractableCommand')"));
    jsContext.getBindings("js").putMember("EntityModule", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.EntityModule')"));
    jsContext.getBindings("js").putMember("EntityNameplateCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.command.commands.world.entity.EntityNameplateCommand')"));
    jsContext.getBindings("js").putMember("EntityRefCollisionProvider", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.collision.EntityRefCollisionProvider')"));

    jsContext.getBindings("js").putMember("EntityRegistration", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.EntityRegistration')"));
    jsContext.getBindings("js").putMember("EntityRegistry", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.EntityRegistry')"));
    jsContext.getBindings("js").putMember("EntityRemoveCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.command.commands.world.entity.EntityRemoveCommand')"));
    jsContext.getBindings("js").putMember("EntityRemoveEvent", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.event.events.entity.EntityRemoveEvent')"));
    jsContext.getBindings("js").putMember("EntityResendCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.command.commands.world.entity.EntityResendCommand')"));
    jsContext.getBindings("js").putMember("EntityScaleComponent", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.EntityScaleComponent')"));
    jsContext.getBindings("js").putMember("EntitySnapshot", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.EntitySnapshot')"));
    jsContext.getBindings("js").putMember("EntitySnapshotHistoryCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.command.commands.world.entity.snapshot.EntitySnapshotHistoryCommand')"));
    jsContext.getBindings("js").putMember("EntitySnapshotLengthCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.command.commands.world.entity.snapshot.EntitySnapshotLengthCommand')"));
    jsContext.getBindings("js").putMember("EntitySnapshotSubCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.command.commands.world.entity.snapshot.EntitySnapshotSubCommand')"));

    jsContext.getBindings("js").putMember("EntitySpatialSystem", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.system.EntitySpatialSystem')"));
    jsContext.getBindings("js").putMember("EntityStatMap", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entitystats.EntityStatMap')"));
    jsContext.getBindings("js").putMember("EntityStatsAddCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.command.commands.world.entity.stats.EntityStatsAddCommand')"));
    jsContext.getBindings("js").putMember("EntityStatsDumpCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.command.commands.world.entity.stats.EntityStatsDumpCommand')"));
    jsContext.getBindings("js").putMember("EntityStatsGetCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.command.commands.world.entity.stats.EntityStatsGetCommand')"));
    jsContext.getBindings("js").putMember("EntityStatsResetCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.command.commands.world.entity.stats.EntityStatsResetCommand')"));
    jsContext.getBindings("js").putMember("EntityStatsSetCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.command.commands.world.entity.stats.EntityStatsSetCommand')"));
    jsContext.getBindings("js").putMember("EntityStatsSetToMaxCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.command.commands.world.entity.stats.EntityStatsSetToMaxCommand')"));
    jsContext.getBindings("js").putMember("EntityStatsSubCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.command.commands.world.entity.stats.EntityStatsSubCommand')"));
    jsContext.getBindings("js").putMember("EntityStatType", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entitystats.asset.EntityStatType')"));

    jsContext.getBindings("js").putMember("EntityStatTypePacketGenerator", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entitystats.asset.EntityStatTypePacketGenerator')"));
    jsContext.getBindings("js").putMember("EntityStatUIComponent", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entityui.asset.EntityStatUIComponent')"));
    jsContext.getBindings("js").putMember("EntityStatValue", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entitystats.EntityStatValue')"));
    jsContext.getBindings("js").putMember("EntitySystems", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.system.EntitySystems')"));
    jsContext.getBindings("js").putMember("EntityTrackerCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.command.commands.world.entity.EntityTrackerCommand')"));
    jsContext.getBindings("js").putMember("EntityTrackerSystems", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.tracker.EntityTrackerSystems')"));
    jsContext.getBindings("js").putMember("EntityUIComponentPacketGenerator", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entityui.asset.EntityUIComponentPacketGenerator')"));
    jsContext.getBindings("js").putMember("EntityUIModule", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entityui.EntityUIModule')"));
    jsContext.getBindings("js").putMember("EntityUtils", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.EntityUtils')"));
    jsContext.getBindings("js").putMember("EnvironmentCondition", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entitystats.asset.condition.EnvironmentCondition')"));

    jsContext.getBindings("js").putMember("EquipItemInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.EquipItemInteraction')"));
    jsContext.getBindings("js").putMember("ExplosionConfig", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.ExplosionConfig')"));
    jsContext.getBindings("js").putMember("ExplosionUtils", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.ExplosionUtils')"));
    jsContext.getBindings("js").putMember("FirstClickInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.client.FirstClickInteraction')"));
    jsContext.getBindings("js").putMember("FloodLightCalculation", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.universe.world.lighting.FloodLightCalculation')"));
    jsContext.getBindings("js").putMember("ForceProviderEntity", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.physics.util.ForceProviderEntity')"));
    jsContext.getBindings("js").putMember("FromPrefab", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.FromPrefab')"));
    jsContext.getBindings("js").putMember("FromWorldGen", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.FromWorldGen')"));
    jsContext.getBindings("js").putMember("Frozen", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.Frozen')"));
    jsContext.getBindings("js").putMember("FullBrightLightCalculation", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.universe.world.lighting.FullBrightLightCalculation')"));

    jsContext.getBindings("js").putMember("GenericVelocityInstructionSystem", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.physics.systems.GenericVelocityInstructionSystem')"));
    jsContext.getBindings("js").putMember("GlidingCondition", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entitystats.asset.condition.GlidingCondition')"));
    jsContext.getBindings("js").putMember("HeadRotation", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.HeadRotation')"));
    jsContext.getBindings("js").putMember("HiddenFromAdventurePlayers", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.HiddenFromAdventurePlayers')"));
    jsContext.getBindings("js").putMember("HiddenPlayersManager", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.entities.player.HiddenPlayersManager')"));
    jsContext.getBindings("js").putMember("HideEntitySystems", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.system.HideEntitySystems')"));
    jsContext.getBindings("js").putMember("HitboxCollision", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.hitboxcollision.HitboxCollision')"));
    jsContext.getBindings("js").putMember("HitboxCollisionConfig", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.hitboxcollision.HitboxCollisionConfig')"));
    jsContext.getBindings("js").putMember("HitboxCollisionConfigPacketGenerator", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.hitboxcollision.HitboxCollisionConfigPacketGenerator')"));
    jsContext.getBindings("js").putMember("HitboxCollisionSystems", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.hitboxcollision.HitboxCollisionSystems')"));
    jsContext.getBindings("js").putMember("HitboxCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.collision.commands.HitboxCommand')"));
    jsContext.getBindings("js").putMember("HorizontalSelector", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.selector.HorizontalSelector')"));
    jsContext.getBindings("js").putMember("HotbarManager", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.entities.player.HotbarManager')"));
    jsContext.getBindings("js").putMember("HudManager", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.entities.player.hud.HudManager')"));
    jsContext.getBindings("js").putMember("HytaleBanProvider", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.accesscontrol.provider.HytaleBanProvider')"));
    jsContext.getBindings("js").putMember("IncreaseBackpackCapacityInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.IncreaseBackpackCapacityInteraction')"));
    jsContext.getBindings("js").putMember("InputUpdate", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.player.PlayerInput$InputUpdate')"));
    jsContext.getBindings("js").putMember("Intangible", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.Intangible')"));
    jsContext.getBindings("js").putMember("IntangibleSystems", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.system.IntangibleSystems')"));
    jsContext.getBindings("js").putMember("Interactable", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.Interactable')"));
    jsContext.getBindings("js").putMember("InteractionChain", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.InteractionChain')"));
    jsContext.getBindings("js").putMember("InteractionConfiguration", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.InteractionConfiguration')"));
    jsContext.getBindings("js").putMember("InteractionEffects", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.InteractionEffects')"));
    jsContext.getBindings("js").putMember("InteractionEntry", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.InteractionEntry')"));
    jsContext.getBindings("js").putMember("InteractionManager", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.InteractionManager')"));
    jsContext.getBindings("js").putMember("InteractionSimulationHandler", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.InteractionSimulationHandler')"));
    jsContext.getBindings("js").putMember("InteractionSystems", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.system.InteractionSystems')"));
    jsContext.getBindings("js").putMember("InteractionTarget", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.util.InteractionTarget')"));
    jsContext.getBindings("js").putMember("InteractionTypeUtils", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.InteractionTypeUtils')"));
    jsContext.getBindings("js").putMember("InvalidatablePersistentRef", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.reference.InvalidatablePersistentRef')"));

    jsContext.getBindings("js").putMember("Invulnerable", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.Invulnerable')"));
    jsContext.getBindings("js").putMember("InvulnerableSystems", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.system.InvulnerableSystems')"));
    jsContext.getBindings("js").putMember("ItemComponent", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.item.ItemComponent')"));
    jsContext.getBindings("js").putMember("ItemContainerStateSpatialSystem", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.block.system.ItemContainerStateSpatialSystem')"));
    jsContext.getBindings("js").putMember("ItemMergeSystem", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.item.ItemMergeSystem')"));
    jsContext.getBindings("js").putMember("ItemPacketGenerator", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.item.ItemPacketGenerator')"));
    jsContext.getBindings("js").putMember("ItemPhysicsComponent", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.item.ItemPhysicsComponent')"));
    jsContext.getBindings("js").putMember("ItemPhysicsSystem", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.item.ItemPhysicsSystem')"));
    jsContext.getBindings("js").putMember("ItemPrePhysicsSystem", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.item.ItemPrePhysicsSystem')"));
    jsContext.getBindings("js").putMember("ItemRepairElement", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.entities.player.pages.itemrepair.ItemRepairElement')"));

    jsContext.getBindings("js").putMember("ItemRepairPage", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.entities.player.pages.itemrepair.ItemRepairPage')"));
    jsContext.getBindings("js").putMember("ItemReticleConfigPacketGenerator", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.item.ItemReticleConfigPacketGenerator')"));
    jsContext.getBindings("js").putMember("ItemSpatialSystem", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.system.ItemSpatialSystem')"));
    jsContext.getBindings("js").putMember("ItemStackContainerWindow", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.entities.player.windows.ItemStackContainerWindow')"));
    jsContext.getBindings("js").putMember("ItemSystems", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.item.ItemSystems')"));
    jsContext.getBindings("js").putMember("ItemUtils", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.ItemUtils')"));
    jsContext.getBindings("js").putMember("JumpOperation", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.operation.JumpOperation')"));
    jsContext.getBindings("js").putMember("KillFeedEvent", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.damage.event.KillFeedEvent')"));
    jsContext.getBindings("js").putMember("KnockbackComponent", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.knockback.KnockbackComponent')"));
    jsContext.getBindings("js").putMember("KnockbackPredictionSystems", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.player.KnockbackPredictionSystems')"));

    jsContext.getBindings("js").putMember("KnockbackSimulation", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.player.KnockbackSimulation')"));
    jsContext.getBindings("js").putMember("KnockbackSystems", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.knockback.KnockbackSystems')"));
    jsContext.getBindings("js").putMember("Label", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.operation.Label')"));
    jsContext.getBindings("js").putMember("LaunchPadInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.LaunchPadInteraction')"));
    jsContext.getBindings("js").putMember("LaunchProjectileInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.LaunchProjectileInteraction')"));
    jsContext.getBindings("js").putMember("LegacyEntityTrackerSystems", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.tracker.LegacyEntityTrackerSystems')"));
    jsContext.getBindings("js").putMember("LegacyProjectileSystems", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.LegacyProjectileSystems')"));
    jsContext.getBindings("js").putMember("LivingEntityEffectClearChangesSystem", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.livingentity.LivingEntityEffectClearChangesSystem')"));
    jsContext.getBindings("js").putMember("LivingEntityEffectSystem", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.livingentity.LivingEntityEffectSystem')"));
    jsContext.getBindings("js").putMember("LivingEntityInventoryChangeEvent", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.event.events.entity.LivingEntityInventoryChangeEvent')"));

    jsContext.getBindings("js").putMember("LivingEntityUseBlockEvent", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.event.events.entity.LivingEntityUseBlockEvent')"));
    jsContext.getBindings("js").putMember("LogicCondition", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entitystats.asset.condition.LogicCondition')"));
    jsContext.getBindings("js").putMember("MaterialExtraResourcesSection", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.entities.player.windows.MaterialExtraResourcesSection')"));
    jsContext.getBindings("js").putMember("MessagesUpdated", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.i18n.event.MessagesUpdated')"));
    jsContext.getBindings("js").putMember("ModelComponent", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.ModelComponent')"));
    jsContext.getBindings("js").putMember("ModelOverride", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.asset.type.entityeffect.config.ModelOverride')"));
    jsContext.getBindings("js").putMember("ModelSystems", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.system.ModelSystems')"));
    jsContext.getBindings("js").putMember("ModifyInventoryInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.ModifyInventoryInteraction')"));
    jsContext.getBindings("js").putMember("MovementAudioComponent", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.MovementAudioComponent')"));
    jsContext.getBindings("js").putMember("MovementConditionInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.client.MovementConditionInteraction')"));

    jsContext.getBindings("js").putMember("MovementConfig", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.entities.player.movement.MovementConfig')"));
    jsContext.getBindings("js").putMember("MovementManager", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.entities.player.movement.MovementManager')"));
    jsContext.getBindings("js").putMember("MovementStatesComponent", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.movement.MovementStatesComponent')"));
    jsContext.getBindings("js").putMember("MovementStatesSystems", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.movement.MovementStatesSystems')"));
    jsContext.getBindings("js").putMember("Nameplate", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.nameplate.Nameplate')"));
    jsContext.getBindings("js").putMember("NameplateSystems", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.nameplate.NameplateSystems')"));
    jsContext.getBindings("js").putMember("NetworkId", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.tracker.NetworkId')"));
    jsContext.getBindings("js").putMember("NetworkSendableSpatialSystem", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.system.NetworkSendableSpatialSystem')"));
    jsContext.getBindings("js").putMember("NewSpawnComponent", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.NewSpawnComponent')"));
    jsContext.getBindings("js").putMember("NoDamageTakenCondition", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entitystats.asset.condition.NoDamageTakenCondition')"));

    jsContext.getBindings("js").putMember("OperationsBuilder", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.operation.OperationsBuilder')"));
    jsContext.getBindings("js").putMember("OutOfCombatCondition", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entitystats.asset.condition.OutOfCombatCondition')"));
    jsContext.getBindings("js").putMember("OverlapBehavior", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.asset.type.entityeffect.config.OverlapBehavior')"));
    jsContext.getBindings("js").putMember("PageManager", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.entities.player.pages.PageManager')"));
    jsContext.getBindings("js").putMember("ParallelInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.none.ParallelInteraction')"));
    jsContext.getBindings("js").putMember("Particle", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.asset.type.particle.config.Particle')"));
    jsContext.getBindings("js").putMember("ParticleAnimationFrame", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.asset.type.particle.config.ParticleAnimationFrame')"));
    jsContext.getBindings("js").putMember("ParticleAttractor", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.asset.type.particle.config.ParticleAttractor')"));
    jsContext.getBindings("js").putMember("ParticleCollision", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.asset.type.particle.config.ParticleCollision')"));
    jsContext.getBindings("js").putMember("ParticleCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.asset.type.particle.commands.ParticleCommand')"));

    jsContext.getBindings("js").putMember("ParticleSpawnCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.asset.type.particle.commands.ParticleSpawnCommand')"));
    jsContext.getBindings("js").putMember("ParticleSpawner", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.asset.type.particle.config.ParticleSpawner')"));
    jsContext.getBindings("js").putMember("ParticleSpawnerGroup", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.asset.type.particle.config.ParticleSpawnerGroup')"));
    jsContext.getBindings("js").putMember("ParticleSpawnerPacketGenerator", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.asset.type.particle.ParticleSpawnerPacketGenerator')"));
    jsContext.getBindings("js").putMember("ParticleSpawnPage", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.asset.type.particle.pages.ParticleSpawnPage')"));
    jsContext.getBindings("js").putMember("ParticleSystemPacketGenerator", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.asset.type.particle.ParticleSystemPacketGenerator')"));
    jsContext.getBindings("js").putMember("PendingTeleport", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.teleport.PendingTeleport')"));
    jsContext.getBindings("js").putMember("PersistentModel", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.PersistentModel')"));
    jsContext.getBindings("js").putMember("PersistentRef", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.reference.PersistentRef')"));

    jsContext.getBindings("js").putMember("PersistentRefCount", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.reference.PersistentRefCount')"));
    jsContext.getBindings("js").putMember("PhysicsMath", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.physics.util.PhysicsMath')"));
    jsContext.getBindings("js").putMember("PickBlockInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.client.PickBlockInteraction')"));
    jsContext.getBindings("js").putMember("PickupItemComponent", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.item.PickupItemComponent')"));
    jsContext.getBindings("js").putMember("PickupItemSystem", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.item.PickupItemSystem')"));
    jsContext.getBindings("js").putMember("PlaceBlockInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.client.PlaceBlockInteraction')"));
    jsContext.getBindings("js").putMember("PlacedByInteractionComponent", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.components.PlacedByInteractionComponent')"));
    jsContext.getBindings("js").putMember("PlaceFluidInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.client.PlaceFluidInteraction')"));
    jsContext.getBindings("js").putMember("PlacementCountConditionInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.PlacementCountConditionInteraction')"));
    jsContext.getBindings("js").putMember("Player", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.entities.Player')"));

    jsContext.getBindings("js").putMember("PlayerCameraAddSystem", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.player.PlayerCameraAddSystem')"));
    jsContext.getBindings("js").putMember("PlayerChunkTrackerSystems", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.player.PlayerChunkTrackerSystems')"));
    jsContext.getBindings("js").putMember("PlayerCollisionResultAddSystem", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.system.PlayerCollisionResultAddSystem')"));
    jsContext.getBindings("js").putMember("PlayerCondition", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entitystats.asset.condition.PlayerCondition')"));
    jsContext.getBindings("js").putMember("PlayerConfigData", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.entities.player.data.PlayerConfigData')"));
    jsContext.getBindings("js").putMember("PlayerConnectionFlushSystem", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.player.PlayerConnectionFlushSystem')"));
    jsContext.getBindings("js").putMember("PlayerDeathPositionData", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.entities.player.data.PlayerDeathPositionData')"));
    jsContext.getBindings("js").putMember("PlayerHudManagerSystems", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.player.PlayerHudManagerSystems')"));
    jsContext.getBindings("js").putMember("PlayerItemEntityPickupSystem", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.player.PlayerItemEntityPickupSystem')"));
    jsContext.getBindings("js").putMember("PlayerMovementManagerSystems", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.player.PlayerMovementManagerSystems')"));
    jsContext.getBindings("js").putMember("PlayerPingSystem", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.player.PlayerPingSystem')"));
    jsContext.getBindings("js").putMember("PlayerProcessMovementSystem", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.player.PlayerProcessMovementSystem')"));
    jsContext.getBindings("js").putMember("PlayerRegenerateStatsSystem", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entitystats.EntityStatsModule$PlayerRegenerateStatsSystem')"));
    jsContext.getBindings("js").putMember("PlayerRespawnPointData", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.entities.player.data.PlayerRespawnPointData')"));
    jsContext.getBindings("js").putMember("PlayerSavingSystems", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.player.PlayerSavingSystems')"));
    jsContext.getBindings("js").putMember("PlayerSendInventorySystem", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.player.PlayerSendInventorySystem')"));
    jsContext.getBindings("js").putMember("PlayerSkinComponent", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.player.PlayerSkinComponent')"));
    jsContext.getBindings("js").putMember("PlayerSkinGradient", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.cosmetics.PlayerSkinGradient')"));
    jsContext.getBindings("js").putMember("PlayerSkinGradientSet", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.cosmetics.PlayerSkinGradientSet')"));
    jsContext.getBindings("js").putMember("PlayerSkinPart", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.cosmetics.PlayerSkinPart')"));

    jsContext.getBindings("js").putMember("PlayerSkinPartTexture", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.cosmetics.PlayerSkinPartTexture')"));
    jsContext.getBindings("js").putMember("PlayerSkinTintColor", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.cosmetics.PlayerSkinTintColor')"));
    jsContext.getBindings("js").putMember("PlayerSpatialSystem", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.system.PlayerSpatialSystem')"));
    jsContext.getBindings("js").putMember("PlayerSystems", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.player.PlayerSystems')"));
    jsContext.getBindings("js").putMember("PlayerWorldData", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.entities.player.data.PlayerWorldData')"));
    jsContext.getBindings("js").putMember("PositionDataComponent", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.PositionDataComponent')"));
    jsContext.getBindings("js").putMember("PredictedProjectile", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.projectile.component.PredictedProjectile')"));
    jsContext.getBindings("js").putMember("PredictedProjectileSystems", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.projectile.system.PredictedProjectileSystems')"));
    jsContext.getBindings("js").putMember("PrefabBufferColumn", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.prefab.selection.buffer.impl.PrefabBufferColumn')"));
    jsContext.getBindings("js").putMember("PrefabBufferUtil", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.prefab.selection.buffer.PrefabBufferUtil')"));
    jsContext.getBindings("js").putMember("PrefabCopyableComponent", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.prefab.PrefabCopyableComponent')"));
    jsContext.getBindings("js").putMember("PrefabLoadException", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.prefab.PrefabLoadException')"));
    jsContext.getBindings("js").putMember("PrefabPasteEvent", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.prefab.event.PrefabPasteEvent')"));
    jsContext.getBindings("js").putMember("PrefabPlaceEntityEvent", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.prefab.event.PrefabPlaceEntityEvent')"));
    jsContext.getBindings("js").putMember("PrefabSaveException", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.prefab.PrefabSaveException')"));
    jsContext.getBindings("js").putMember("PrefabSpawnerState", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.prefabspawner.PrefabSpawnerState')"));
    jsContext.getBindings("js").putMember("PrefabStore", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.prefab.PrefabStore')"));
    jsContext.getBindings("js").putMember("PreventItemMerging", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.item.PreventItemMerging')"));
    jsContext.getBindings("js").putMember("PreventPickup", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.item.PreventPickup')"));
    jsContext.getBindings("js").putMember("Projectile", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.projectile.component.Projectile')"));

    jsContext.getBindings("js").putMember("ProjectileComponent", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.entities.ProjectileComponent')"));
    jsContext.getBindings("js").putMember("ProjectileConfig", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.projectile.config.ProjectileConfig')"));
    jsContext.getBindings("js").putMember("ProjectileConfigPacketGenerator", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.projectile.config.ProjectileConfigPacketGenerator')"));
    jsContext.getBindings("js").putMember("ProjectileInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.projectile.interaction.ProjectileInteraction')"));
    jsContext.getBindings("js").putMember("PropComponent", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.PropComponent')"));
    jsContext.getBindings("js").putMember("RaycastSelector", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.selector.RaycastSelector')"));
    jsContext.getBindings("js").putMember("RecipePacketGenerator", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.item.RecipePacketGenerator')"));
    jsContext.getBindings("js").putMember("RefillContainerInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.RefillContainerInteraction')"));
    jsContext.getBindings("js").putMember("RegeneratingModifier", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entitystats.asset.modifier.RegeneratingModifier')"));
    jsContext.getBindings("js").putMember("RegeneratingValue", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entitystats.RegeneratingValue')"));

    jsContext.getBindings("js").putMember("RegenHealthCondition", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entitystats.asset.condition.RegenHealthCondition')"));
    jsContext.getBindings("js").putMember("RemovalBehavior", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.asset.type.entityeffect.config.RemovalBehavior')"));
    jsContext.getBindings("js").putMember("RemoveEntityInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.none.simple.RemoveEntityInteraction')"));
    jsContext.getBindings("js").putMember("RepairItemInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.entities.player.pages.itemrepair.RepairItemInteraction')"));
    jsContext.getBindings("js").putMember("RepeatInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.none.RepeatInteraction')"));
    jsContext.getBindings("js").putMember("ReplaceInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.none.ReplaceInteraction')"));
    jsContext.getBindings("js").putMember("Repulsion", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.repulsion.Repulsion')"));
    jsContext.getBindings("js").putMember("RepulsionConfig", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.repulsion.RepulsionConfig')"));
    jsContext.getBindings("js").putMember("RepulsionConfigPacketGenerator", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.repulsion.RepulsionConfigPacketGenerator')"));
    jsContext.getBindings("js").putMember("RepulsionSystems", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.repulsion.RepulsionSystems')"));

    jsContext.getBindings("js").putMember("RespawnPage", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.entities.player.pages.RespawnPage')"));
    jsContext.getBindings("js").putMember("RespawnSystems", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.damage.RespawnSystems')"));
    jsContext.getBindings("js").putMember("RespondToHit", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.RespondToHit')"));
    jsContext.getBindings("js").putMember("RespondToHitSystems", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.system.RespondToHitSystems')"));
    jsContext.getBindings("js").putMember("RotateObjectComponent", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.RotateObjectComponent')"));
    jsContext.getBindings("js").putMember("RotateObjectSystem", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.system.RotateObjectSystem')"));
    jsContext.getBindings("js").putMember("SelectInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.none.SelectInteraction')"));
    jsContext.getBindings("js").putMember("SelectionManager", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.prefab.selection.SelectionManager')"));
    jsContext.getBindings("js").putMember("SerialInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.none.SerialInteraction')"));
    jsContext.getBindings("js").putMember("ServerPlayerListModule", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.serverplayerlist.ServerPlayerListModule')"));

    jsContext.getBindings("js").putMember("SingleplayerRequestAccessEvent", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.singleplayer.SingleplayerRequestAccessEvent')"));
    jsContext.getBindings("js").putMember("SnapshotBuffer", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.SnapshotBuffer')"));
    jsContext.getBindings("js").putMember("SnapshotSystems", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.system.SnapshotSystems')"));
    jsContext.getBindings("js").putMember("SprintingCondition", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entitystats.asset.condition.SprintingCondition')"));
    jsContext.getBindings("js").putMember("SprintStaminaRegenDelay", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.stamina.SprintStaminaRegenDelay')"));
    jsContext.getBindings("js").putMember("StabSelector", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.selector.StabSelector')"));
    jsContext.getBindings("js").putMember("StaminaGameplayConfig", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.stamina.StaminaGameplayConfig')"));
    jsContext.getBindings("js").putMember("StaminaModule", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.stamina.StaminaModule')"));

    jsContext.getBindings("js").putMember("StaminaSystems", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.stamina.StaminaSystems')"));
    jsContext.getBindings("js").putMember("StandardPhysicsConfig", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.projectile.config.StandardPhysicsConfig')"));
    jsContext.getBindings("js").putMember("StandardPhysicsTickSystem", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.projectile.system.StandardPhysicsTickSystem')"));
    jsContext.getBindings("js").putMember("StatCondition", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entitystats.asset.condition.StatCondition')"));
    jsContext.getBindings("js").putMember("StaticModifier", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entitystats.modifier.StaticModifier')"));
    jsContext.getBindings("js").putMember("StatModifiersManager", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.StatModifiersManager')"));
    jsContext.getBindings("js").putMember("StatModifyingSystem", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entitystats.EntityStatsSystems$StatModifyingSystem')"));
    jsContext.getBindings("js").putMember("StringTag", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.data.StringTag')"));
    jsContext.getBindings("js").putMember("SuffocatingCondition", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entitystats.asset.condition.SuffocatingCondition')"));
    jsContext.getBindings("js").putMember("TangiableEntitySpatialSystem", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.collision.TangiableEntitySpatialSystem')"));

    jsContext.getBindings("js").putMember("TargetEntityEffect", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.combat.TargetEntityEffect')"));
    jsContext.getBindings("js").putMember("Teleport", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.teleport.Teleport')"));
    jsContext.getBindings("js").putMember("TeleportSystems", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.teleport.TeleportSystems')"));
    jsContext.getBindings("js").putMember("TimeModule", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.time.TimeModule')"));
    jsContext.getBindings("js").putMember("TrackedPlacement", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.blocktrack.TrackedPlacement')"));
    jsContext.getBindings("js").putMember("TransformSystems", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.system.TransformSystems')"));
    jsContext.getBindings("js").putMember("UIComponentList", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entityui.UIComponentList')"));
    jsContext.getBindings("js").putMember("UIComponentSystems", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entityui.UIComponentSystems')"));
    jsContext.getBindings("js").putMember("UnarmedInteractions", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.UnarmedInteractions')"));
    jsContext.getBindings("js").putMember("UnarmedInteractionsPacketGenerator", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.UnarmedInteractionsPacketGenerator')"));

    jsContext.getBindings("js").putMember("UniqueItemUsagesComponent", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.entities.player.data.UniqueItemUsagesComponent')"));
    jsContext.getBindings("js").putMember("UpdateEntitySeedSystem", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.system.UpdateEntitySeedSystem')"));
    jsContext.getBindings("js").putMember("UpdateLocationSystems", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.system.UpdateLocationSystems')"));
    jsContext.getBindings("js").putMember("UseEntityInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.client.UseEntityInteraction')"));
    jsContext.getBindings("js").putMember("UUIDComponent", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.UUIDComponent')"));
    jsContext.getBindings("js").putMember("VelocityConfig", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.splitvelocity.VelocityConfig')"));
    jsContext.getBindings("js").putMember("VelocitySystems", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.physics.systems.VelocitySystems')"));
    jsContext.getBindings("js").putMember("WieldingCondition", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entitystats.asset.condition.WieldingCondition')"));
    jsContext.getBindings("js").putMember("WieldingInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.client.WieldingInteraction')"));
    jsContext.getBindings("js").putMember("WindowManager", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.entity.entities.player.windows.WindowManager')"));

    jsContext.getBindings("js").putMember("WorldGenId", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.entity.component.WorldGenId')"));
    jsContext.getBindings("js").putMember("WorldParticle", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.asset.type.particle.config.WorldParticle')"));
    jsContext.getBindings("js").putMember("WorldTimeResource", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.time.WorldTimeResource')"));
    jsContext.getBindings("js").putMember("WorldTimeSystems", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.time.WorldTimeSystems')"));
    jsContext.getBindings("js").putMember("WorldUtil", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.collision.WorldUtil')"));
    jsContext.getBindings("js").putMember("AccessControlModule", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.accesscontrol.AccessControlModule')"));
    jsContext.getBindings("js").putMember("BlockCounter", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.blocktrack.BlockCounter')"));
    jsContext.getBindings("js").putMember("BlockFilter", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.prefab.selection.mask.BlockFilter')"));
    jsContext.getBindings("js").putMember("BlockHealth", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.blockhealth.BlockHealth')"));
    jsContext.getBindings("js").putMember("BlockHealthModule", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.blockhealth.BlockHealthModule')"));
    jsContext.getBindings("js").putMember("BlockMask", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.prefab.selection.mask.BlockMask')"));
    jsContext.getBindings("js").putMember("BlockModule", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.block.BlockModule')"));
    jsContext.getBindings("js").putMember("BlockPattern", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.prefab.selection.mask.BlockPattern')"));
    jsContext.getBindings("js").putMember("BlockSetLookupTable", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.blockset.BlockSetLookupTable')"));
    jsContext.getBindings("js").putMember("BlockTracker", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.collision.BlockTracker')"));
    jsContext.getBindings("js").putMember("BoxBlockIntersectionEvaluator", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.collision.BoxBlockIntersectionEvaluator')"));
    jsContext.getBindings("js").putMember("ChangeActiveSlotInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.none.ChangeActiveSlotInteraction')"));
    jsContext.getBindings("js").putMember("CollisionDataArray", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.collision.CollisionDataArray')"));
    jsContext.getBindings("js").putMember("CollisionMath", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.collision.CollisionMath')"));
    jsContext.getBindings("js").putMember("CollisionModule", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.collision.CollisionModule')"));
    jsContext.getBindings("js").putMember("CollisionResult", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.collision.CollisionResult')"));
    jsContext.getBindings("js").putMember("CollisionTracker", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.collision.CollisionTracker')"));
    jsContext.getBindings("js").putMember("CosmeticRegistry", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.cosmetics.CosmeticRegistry')"));
    jsContext.getBindings("js").putMember("CosmeticsModule", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.cosmetics.CosmeticsModule')"));
    jsContext.getBindings("js").putMember("ForceProviderStandardState", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.physics.util.ForceProviderStandardState')"));
    jsContext.getBindings("js").putMember("FragileBlock", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.blockhealth.FragileBlock')"));
    jsContext.getBindings("js").putMember("HytaleWhitelistProvider", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.accesscontrol.provider.HytaleWhitelistProvider')"));
    jsContext.getBindings("js").putMember("I18nModule", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.i18n.I18nModule')"));
    jsContext.getBindings("js").putMember("InfiniteBan", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.accesscontrol.ban.InfiniteBan')"));
    jsContext.getBindings("js").putMember("InteractionModule", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.InteractionModule')"));

    jsContext.getBindings("js").putMember("Interactions", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.Interactions')"));
    jsContext.getBindings("js").putMember("ItemModule", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.item.ItemModule')"));
    jsContext.getBindings("js").putMember("LegacyModule", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.LegacyModule')"));
    jsContext.getBindings("js").putMember("ListCollector", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.data.ListCollector')"));
    jsContext.getBindings("js").putMember("MigrationModule", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.migrations.MigrationModule')"));
    jsContext.getBindings("js").putMember("MovingBoxBoxCollisionEvaluator", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.collision.MovingBoxBoxCollisionEvaluator')"));
    jsContext.getBindings("js").putMember("PhysicsValues", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.physics.component.PhysicsValues')"));
    jsContext.getBindings("js").putMember("PhysicsValuesAddSystem", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.physics.systems.PhysicsValuesAddSystem')"));
    jsContext.getBindings("js").putMember("PlayerSkin", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.cosmetics.PlayerSkin')"));
    jsContext.getBindings("js").putMember("PrefabLoader", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.prefab.selection.buffer.PrefabLoader')"));

    jsContext.getBindings("js").putMember("PrefabRotation", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.prefab.PrefabRotation')"));
    jsContext.getBindings("js").putMember("PrefabWeights", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.prefab.PrefabWeights')"));
    jsContext.getBindings("js").putMember("ProjectileModule", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.projectile.ProjectileModule')"));
    jsContext.getBindings("js").putMember("RootInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.RootInteraction')"));
    jsContext.getBindings("js").putMember("SimpleInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.SimpleInteraction')"));
    jsContext.getBindings("js").putMember("SimplePhysicsProvider", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.physics.SimplePhysicsProvider')"));
    jsContext.getBindings("js").putMember("SingleCollector", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.data.SingleCollector')"));
    jsContext.getBindings("js").putMember("SingleplayerModule", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.singleplayer.SingleplayerModule')"));
    jsContext.getBindings("js").putMember("StandardPhysicsProvider", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.projectile.config.StandardPhysicsProvider')"));
    jsContext.getBindings("js").putMember("TimeCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.time.commands.TimeCommand')"));

    jsContext.getBindings("js").putMember("TimedBan", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.accesscontrol.ban.TimedBan')"));
    jsContext.getBindings("js").putMember("TimeResource", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.time.TimeResource')"));
    jsContext.getBindings("js").putMember("TranslationMap", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.i18n.generator.TranslationMap')"));
    jsContext.getBindings("js").putMember("TreeCollector", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.data.TreeCollector')"));
    jsContext.getBindings("js").putMember("Velocity", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.physics.component.Velocity')"));
    jsContext.getBindings("js").putMember("AddItemInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.client.AddItemInteraction')"));
    jsContext.getBindings("js").putMember("BanCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.accesscontrol.commands.BanCommand')"));
    jsContext.getBindings("js").putMember("BinaryPrefabBufferCodec", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.prefab.selection.buffer.BinaryPrefabBufferCodec')"));
    jsContext.getBindings("js").putMember("BlockConditionInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.client.BlockConditionInteraction')"));
    jsContext.getBindings("js").putMember("BlockDataProvider", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.collision.BlockDataProvider')"));

    jsContext.getBindings("js").putMember("BlockInteractionUtils", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.BlockInteractionUtils')"));
    jsContext.getBindings("js").putMember("BlockMaskConstants", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.prefab.selection.buffer.impl.PrefabBuffer$BlockMaskConstants')"));
    jsContext.getBindings("js").putMember("BlockPlaceUtils", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.BlockPlaceUtils')"));
    jsContext.getBindings("js").putMember("BlockSetCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.blockset.commands.BlockSetCommand')"));
    jsContext.getBindings("js").putMember("BodyType", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.cosmetics.BodyType')"));
    jsContext.getBindings("js").putMember("BreakBlockInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.client.BreakBlockInteraction')"));
    jsContext.getBindings("js").putMember("BsonPrefabBufferDeserializer", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.prefab.selection.buffer.BsonPrefabBufferDeserializer')"));
    jsContext.getBindings("js").putMember("CancelChainInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.none.CancelChainInteraction')"));
    jsContext.getBindings("js").putMember("ChainFlagInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.none.ChainFlagInteraction')"));
    jsContext.getBindings("js").putMember("ChangeBlockInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.client.ChangeBlockInteraction')"));
    jsContext.getBindings("js").putMember("ChangeStateInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.client.ChangeStateInteraction')"));
    jsContext.getBindings("js").putMember("ChangeStatInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.ChangeStatInteraction')"));
    jsContext.getBindings("js").putMember("ChangeStatWithModifierInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.ChangeStatWithModifierInteraction')"));
    jsContext.getBindings("js").putMember("CharacterCollisionData", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.collision.CharacterCollisionData')"));
    jsContext.getBindings("js").putMember("CollisionMaterial", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.collision.CollisionMaterial')"));
    jsContext.getBindings("js").putMember("ConditionInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.none.ConditionInteraction')"));
    jsContext.getBindings("js").putMember("CooldownConditionInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.client.CooldownConditionInteraction')"));
    jsContext.getBindings("js").putMember("CosmeticAssetValidator", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.cosmetics.CosmeticAssetValidator')"));
    jsContext.getBindings("js").putMember("CosmeticType", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.cosmetics.CosmeticType')"));
    jsContext.getBindings("js").putMember("CycleBlockGroupInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.client.CycleBlockGroupInteraction')"));
    jsContext.getBindings("js").putMember("DamageClass", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.combat.DamageClass')"));
    jsContext.getBindings("js").putMember("DebugCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.debug.commands.DebugCommand')"));
    jsContext.getBindings("js").putMember("DebugShapeArrowCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.debug.commands.DebugShapeArrowCommand')"));
    jsContext.getBindings("js").putMember("DebugShapeClearCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.debug.commands.DebugShapeClearCommand')"));
    jsContext.getBindings("js").putMember("DebugShapeConeCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.debug.commands.DebugShapeConeCommand')"));
    jsContext.getBindings("js").putMember("DebugShapeCubeCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.debug.commands.DebugShapeCubeCommand')"));
    jsContext.getBindings("js").putMember("DebugShapeCylinderCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.debug.commands.DebugShapeCylinderCommand')"));
    jsContext.getBindings("js").putMember("DebugShapeShowForceCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.debug.commands.DebugShapeShowForceCommand')"));
    jsContext.getBindings("js").putMember("DebugShapeSphereCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.debug.commands.DebugShapeSphereCommand')"));
    jsContext.getBindings("js").putMember("DebugShapeSubCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.debug.commands.DebugShapeSubCommand')"));
    jsContext.getBindings("js").putMember("DestroyBlockInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.client.DestroyBlockInteraction')"));
    jsContext.getBindings("js").putMember("DirectionalKnockback", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.combat.DirectionalKnockback')"));
    jsContext.getBindings("js").putMember("EmoteCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.cosmetics.commands.EmoteCommand')"));
    jsContext.getBindings("js").putMember("EnableTmpTagsCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.i18n.commands.EnableTmpTagsCommand')"));
    jsContext.getBindings("js").putMember("ExplodeInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.client.ExplodeInteraction')"));
    jsContext.getBindings("js").putMember("FluidIterator", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.prefab.selection.standard.BlockSelection$FluidIterator')"));
    jsContext.getBindings("js").putMember("FlyCameraModule", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.camera.FlyCameraModule')"));
    jsContext.getBindings("js").putMember("ForceAccumulator", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.physics.util.ForceAccumulator')"));
    jsContext.getBindings("js").putMember("ForceKnockback", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.combat.ForceKnockback')"));
    jsContext.getBindings("js").putMember("GenerateDefaultLanguageEvent", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.i18n.event.GenerateDefaultLanguageEvent')"));

    jsContext.getBindings("js").putMember("GenerateI18nCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.i18n.commands.GenerateI18nCommand')"));
    jsContext.getBindings("js").putMember("IncrementCooldownInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.client.IncrementCooldownInteraction')"));
    jsContext.getBindings("js").putMember("InteractionCameraSettings", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.InteractionCameraSettings')"));
    jsContext.getBindings("js").putMember("InteractionClearCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.commands.InteractionClearCommand')"));
    jsContext.getBindings("js").putMember("InteractionCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.commands.InteractionCommand')"));
    jsContext.getBindings("js").putMember("InteractionPacketGenerator", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.InteractionPacketGenerator')"));
    jsContext.getBindings("js").putMember("InteractionPriorityCodec", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.InteractionPriorityCodec')"));
    jsContext.getBindings("js").putMember("InteractionRules", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.InteractionRules')"));
    jsContext.getBindings("js").putMember("InteractionRunCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.commands.InteractionRunCommand')"));
    jsContext.getBindings("js").putMember("InteractionRunSpecificCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.commands.InteractionRunSpecificCommand')"));

    jsContext.getBindings("js").putMember("InteractionSetSnapshotSourceCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.commands.InteractionSetSnapshotSourceCommand')"));
    jsContext.getBindings("js").putMember("InteractionSnapshotSourceCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.commands.InteractionSnapshotSourceCommand')"));
    jsContext.getBindings("js").putMember("InternationalizationCommands", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.i18n.commands.InternationalizationCommands')"));
    jsContext.getBindings("js").putMember("InterruptInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.InterruptInteraction')"));
    jsContext.getBindings("js").putMember("ItemQualityPacketGenerator", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.item.ItemQualityPacketGenerator')"));
    jsContext.getBindings("js").putMember("ItemRepairPageSupplier", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.suppliers.ItemRepairPageSupplier')"));
    jsContext.getBindings("js").putMember("LangFileParser", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.i18n.parser.LangFileParser')"));
    jsContext.getBindings("js").putMember("MultiBlockMask", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.prefab.selection.mask.MultiBlockMask')"));
    jsContext.getBindings("js").putMember("OpenContainerInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.OpenContainerInteraction')"));
    jsContext.getBindings("js").putMember("OpenItemStackContainerInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.OpenItemStackContainerInteraction')"));

    jsContext.getBindings("js").putMember("PhysicsBodyState", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.physics.util.PhysicsBodyState')"));
    jsContext.getBindings("js").putMember("PhysicsBodyStateUpdater", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.physics.util.PhysicsBodyStateUpdater')"));
    jsContext.getBindings("js").putMember("PhysicsBodyStateUpdaterMidpoint", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.physics.util.PhysicsBodyStateUpdaterMidpoint')"));
    jsContext.getBindings("js").putMember("PhysicsBodyStateUpdaterRK4", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.physics.util.PhysicsBodyStateUpdaterRK4')"));
    jsContext.getBindings("js").putMember("PhysicsBodyStateUpdaterSymplecticEuler", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.physics.util.PhysicsBodyStateUpdaterSymplecticEuler')"));
    jsContext.getBindings("js").putMember("PhysicsConstants", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.physics.util.PhysicsConstants')"));
    jsContext.getBindings("js").putMember("PhysicsFlags", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.physics.util.PhysicsFlags')"));
    jsContext.getBindings("js").putMember("PlayCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.singleplayer.commands.PlayCommand')"));
    jsContext.getBindings("js").putMember("PlayerMatcher", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.selector.PlayerMatcher')"));
    jsContext.getBindings("js").putMember("PlayerSkinPartType", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.cosmetics.PlayerSkinPartType')"));
    jsContext.getBindings("js").putMember("PlayFriendCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.singleplayer.commands.PlayFriendCommand')"));
    jsContext.getBindings("js").putMember("PlayLanCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.singleplayer.commands.PlayLanCommand')"));
    jsContext.getBindings("js").putMember("PlayOnlineCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.singleplayer.commands.PlayOnlineCommand')"));
    jsContext.getBindings("js").putMember("PointKnockback", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.combat.PointKnockback')"));
    jsContext.getBindings("js").putMember("PrefabBufferBlockEntry", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.prefab.selection.buffer.impl.PrefabBufferBlockEntry')"));
    jsContext.getBindings("js").putMember("PrefabBufferCall", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.prefab.selection.buffer.PrefabBufferCall')"));
    jsContext.getBindings("js").putMember("PrefabSpawnerCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.prefabspawner.commands.PrefabSpawnerCommand')"));
    jsContext.getBindings("js").putMember("PrefabSpawnerGetCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.prefabspawner.commands.PrefabSpawnerGetCommand')"));
    jsContext.getBindings("js").putMember("PrefabSpawnerModule", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.prefabspawner.PrefabSpawnerModule')"));
    jsContext.getBindings("js").putMember("PrefabSpawnerSetCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.prefabspawner.commands.PrefabSpawnerSetCommand')"));
    jsContext.getBindings("js").putMember("PrefabSpawnerWeightCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.prefabspawner.commands.PrefabSpawnerWeightCommand')"));
    jsContext.getBindings("js").putMember("ResetCooldownInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.client.ResetCooldownInteraction')"));
    jsContext.getBindings("js").putMember("RestingSupport", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.physics.RestingSupport')"));
    jsContext.getBindings("js").putMember("RootInteractionPacketGenerator", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.RootInteractionPacketGenerator')"));
    jsContext.getBindings("js").putMember("RunRootInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.none.RunRootInteraction')"));
    jsContext.getBindings("js").putMember("SelectionPrefabSerializer", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.prefab.config.SelectionPrefabSerializer')"));
    jsContext.getBindings("js").putMember("SendMessageInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.none.simple.SendMessageInteraction')"));
    jsContext.getBindings("js").putMember("SpawnItemCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.item.commands.SpawnItemCommand')"));
    jsContext.getBindings("js").putMember("SpawnPrefabInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.server.SpawnPrefabInteraction')"));
    jsContext.getBindings("js").putMember("SplitVelocity", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.splitvelocity.SplitVelocity')"));
    jsContext.getBindings("js").putMember("StatsConditionInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.none.StatsConditionInteraction')"));
    jsContext.getBindings("js").putMember("StatsConditionWithModifierInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.none.StatsConditionWithModifierInteraction')"));
    jsContext.getBindings("js").putMember("TimePacketSystem", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.time.TimePacketSystem')"));
    jsContext.getBindings("js").putMember("TimeSystem", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.time.TimeSystem')"));
    jsContext.getBindings("js").putMember("ToggleGliderInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.client.ToggleGliderInteraction')"));
    jsContext.getBindings("js").putMember("TriggerCooldownInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.client.TriggerCooldownInteraction')"));
    jsContext.getBindings("js").putMember("UnbanCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.accesscontrol.commands.UnbanCommand')"));
    jsContext.getBindings("js").putMember("UpdateBinaryPrefabException", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.prefab.selection.buffer.UpdateBinaryPrefabException')"));
    jsContext.getBindings("js").putMember("UseBlockInteraction", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.client.UseBlockInteraction')"));
    jsContext.getBindings("js").putMember("VulnerableMatcher", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.interaction.interaction.config.selector.VulnerableMatcher')"));
    jsContext.getBindings("js").putMember("WhitelistAddCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.accesscontrol.commands.WhitelistAddCommand')"));
    jsContext.getBindings("js").putMember("WhitelistClearCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.accesscontrol.commands.WhitelistClearCommand')"));
    jsContext.getBindings("js").putMember("WhitelistCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.accesscontrol.commands.WhitelistCommand')"));
    jsContext.getBindings("js").putMember("WhitelistDisableCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.accesscontrol.commands.WhitelistDisableCommand')"));
    jsContext.getBindings("js").putMember("WhitelistEnableCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.accesscontrol.commands.WhitelistEnableCommand')"));
    jsContext.getBindings("js").putMember("WhitelistListCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.accesscontrol.commands.WhitelistListCommand')"));
    jsContext.getBindings("js").putMember("WhitelistRemoveCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.accesscontrol.commands.WhitelistRemoveCommand')"));
    jsContext.getBindings("js").putMember("WhitelistStatusCommand", jsContext.eval("js", "Java.type('com.hypixel.hytale.server.core.modules.accesscontrol.commands.WhitelistStatusCommand')"));

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
