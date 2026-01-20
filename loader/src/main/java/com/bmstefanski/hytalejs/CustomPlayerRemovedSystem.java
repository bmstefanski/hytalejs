package com.bmstefanski.hytalejs;

import com.hypixel.hytale.component.AddReason;
import com.hypixel.hytale.component.Holder;
import com.hypixel.hytale.component.RemoveReason;
import com.hypixel.hytale.component.Store;
import com.hypixel.hytale.component.query.Query;
import com.hypixel.hytale.component.system.HolderSystem;
import com.hypixel.hytale.math.vector.Transform;
import com.hypixel.hytale.server.core.Message;
import com.hypixel.hytale.server.core.entity.entities.Player;
import com.hypixel.hytale.server.core.modules.entity.component.DisplayNameComponent;
import com.hypixel.hytale.server.core.modules.entity.component.HeadRotation;
import com.hypixel.hytale.server.core.modules.entity.component.TransformComponent;
import com.hypixel.hytale.server.core.universe.PlayerRef;
import com.hypixel.hytale.server.core.universe.world.PlayerUtil;
import com.hypixel.hytale.server.core.universe.world.World;
import com.hypixel.hytale.server.core.universe.world.WorldConfig;
import com.hypixel.hytale.server.core.universe.world.storage.EntityStore;

import javax.annotation.Nonnull;

import static com.hypixel.hytale.server.core.command.system.CommandUtil.WORLD_OPTION;

public class CustomPlayerRemovedSystem extends HolderSystem<EntityStore> {
  private static volatile boolean broadcastLeaveMessage = true;

  public static void setBroadcastLeaveMessage(boolean value) {
    broadcastLeaveMessage = value;
  }

  public static boolean shouldBroadcastLeaveMessage() {
    return broadcastLeaveMessage;
  }

  @Override
  public Query<EntityStore> getQuery() {
    return PlayerRef.getComponentType();
  }

  @Override
  public void onEntityAdd(@Nonnull Holder<EntityStore> holder, @Nonnull AddReason reason, @Nonnull Store<EntityStore> store) {
  }

  @Override
  public void onEntityRemoved(@Nonnull Holder<EntityStore> holder, @Nonnull RemoveReason reason, @Nonnull Store<EntityStore> store) {
    World world = store.getExternalData().getWorld();
    PlayerRef playerRefComponent = (PlayerRef) holder.getComponent(PlayerRef.getComponentType());
    if (playerRefComponent == null) {
      return;
    }
    Player playerComponent = (Player) holder.getComponent(Player.getComponentType());
    if (playerComponent == null) {
      return;
    }
    TransformComponent transformComponent = (TransformComponent) holder.getComponent(TransformComponent.getComponentType());
    if (transformComponent == null) {
      return;
    }
    HeadRotation headRotationComponent = (HeadRotation) holder.getComponent(HeadRotation.getComponentType());
    if (headRotationComponent == null) {
      return;
    }
    DisplayNameComponent displayNameComponent = (DisplayNameComponent) holder.getComponent(DisplayNameComponent.getComponentType());
    if (displayNameComponent == null) {
      return;
    }

    playerComponent.getPlayerConfigData().getPerWorldData(world.getName()).setLastPosition(
      new Transform(transformComponent.getPosition().clone(), headRotationComponent.getRotation().clone())
    );

    playerRefComponent.getPacketHandler().setQueuePackets(false);
    playerRefComponent.getPacketHandler().tryFlush();

    if (broadcastLeaveMessage) {
      WorldConfig worldConfig = world.getWorldConfig();
      PlayerUtil.broadcastMessageToPlayers(
        playerRefComponent.getUuid(),
        Message.translation("server.general.playerLeftWorld")
          .param("username", playerRefComponent.getUsername())
          .param(WORLD_OPTION, worldConfig.getDisplayName() != null ? worldConfig.getDisplayName() : WorldConfig.formatDisplayName(world.getName())),
        store
      );
    }
  }
}
