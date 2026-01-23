package com.bmstefanski.hytalejs;

import com.hypixel.hytale.component.Ref;
import com.hypixel.hytale.component.Store;
import com.hypixel.hytale.protocol.packets.interface_.CustomPageLifetime;
import com.hypixel.hytale.server.core.entity.entities.player.pages.CustomUIPage;
import com.hypixel.hytale.server.core.ui.builder.UICommandBuilder;
import com.hypixel.hytale.server.core.ui.builder.UIEventBuilder;
import com.hypixel.hytale.server.core.universe.PlayerRef;
import com.hypixel.hytale.server.core.universe.world.World;
import com.hypixel.hytale.server.core.universe.world.storage.EntityStore;
import javax.annotation.Nonnull;
import javax.annotation.Nullable;

public class ScriptCustomUIPage extends CustomUIPage {

    @FunctionalInterface
    public interface BuildCallback {
        void build(Ref<EntityStore> ref, UICommandBuilder commandBuilder,
                   UIEventBuilder eventBuilder, Store<EntityStore> store);
    }

    @FunctionalInterface
    public interface EventCallback {
        void handleEvent(Ref<EntityStore> ref, Store<EntityStore> store, String rawData);
    }

    @FunctionalInterface
    public interface DismissCallback {
        void onDismiss(Ref<EntityStore> ref, Store<EntityStore> store);
    }

    @Nonnull
    private final BuildCallback buildCallback;

    @Nullable
    private final EventCallback eventCallback;

    @Nullable
    private final DismissCallback dismissCallback;

    public ScriptCustomUIPage(
        @Nonnull PlayerRef playerRef,
        @Nonnull CustomPageLifetime lifetime,
        @Nonnull BuildCallback buildCallback
    ) {
        this(playerRef, lifetime, buildCallback, null, null);
    }

    public ScriptCustomUIPage(
        @Nonnull PlayerRef playerRef,
        @Nonnull CustomPageLifetime lifetime,
        @Nonnull BuildCallback buildCallback,
        @Nullable EventCallback eventCallback
    ) {
        this(playerRef, lifetime, buildCallback, eventCallback, null);
    }

    public ScriptCustomUIPage(
        @Nonnull PlayerRef playerRef,
        @Nonnull CustomPageLifetime lifetime,
        @Nonnull BuildCallback buildCallback,
        @Nullable EventCallback eventCallback,
        @Nullable DismissCallback dismissCallback
    ) {
        super(playerRef, lifetime);
        this.buildCallback = buildCallback;
        this.eventCallback = eventCallback;
        this.dismissCallback = dismissCallback;
    }

    @Override
    public void build(@Nonnull Ref<EntityStore> ref, @Nonnull UICommandBuilder commandBuilder,
                      @Nonnull UIEventBuilder eventBuilder, @Nonnull Store<EntityStore> store) {
        buildCallback.build(ref, commandBuilder, eventBuilder, store);
    }

    @Override
    public void handleDataEvent(@Nonnull Ref<EntityStore> ref, @Nonnull Store<EntityStore> store,
                                String rawData) {
        if (eventCallback != null) {
            eventCallback.handleEvent(ref, store, rawData);
        } else {
            super.handleDataEvent(ref, store, rawData);
        }
    }

    @Override
    public void onDismiss(@Nonnull Ref<EntityStore> ref, @Nonnull Store<EntityStore> store) {
        if (dismissCallback != null) {
            dismissCallback.onDismiss(ref, store);
        }
    }

    public void triggerRebuild() {
        executeOnWorldThread(() -> rebuild());
    }

    public void triggerSendUpdate() {
        executeOnWorldThread(() -> sendUpdate());
    }

    public void triggerSendUpdate(@Nonnull UICommandBuilder commandBuilder) {
        executeOnWorldThread(() -> sendUpdate(commandBuilder));
    }

    public void triggerSendUpdate(@Nonnull UICommandBuilder commandBuilder, boolean clear) {
        executeOnWorldThread(() -> sendUpdate(commandBuilder, clear));
    }

    public void triggerClose() {
        executeOnWorldThread(() -> close());
    }

    private void executeOnWorldThread(@Nonnull Runnable action) {
        Ref<EntityStore> ref = playerRef.getReference();
        if (ref == null) {
            return;
        }
        Store<EntityStore> store = ref.getStore();
        World world = store.getExternalData().getWorld();
        if (world.isInThread()) {
            action.run();
        } else {
            world.execute(action);
        }
    }

    @Nonnull
    public PlayerRef getPlayerRef() {
        return this.playerRef;
    }

    @Nonnull
    public CustomPageLifetime getPageLifetime() {
        return this.lifetime;
    }

    public void setPageLifetime(@Nonnull CustomPageLifetime lifetime) {
        setLifetime(lifetime);
    }
}
