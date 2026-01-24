package com.bmstefanski.hytalejs;

import com.hypixel.hytale.component.Ref;
import com.hypixel.hytale.component.Store;
import com.hypixel.hytale.server.core.entity.entities.player.hud.CustomUIHud;
import com.hypixel.hytale.server.core.ui.builder.UICommandBuilder;
import com.hypixel.hytale.server.core.universe.PlayerRef;
import com.hypixel.hytale.server.core.universe.world.World;
import com.hypixel.hytale.server.core.universe.world.storage.EntityStore;
import javax.annotation.Nonnull;

public class ScriptCustomUIHud extends CustomUIHud {

    @FunctionalInterface
    public interface BuildCallback {
        void build(UICommandBuilder commandBuilder);
    }

    @Nonnull
    private final BuildCallback buildCallback;

    public ScriptCustomUIHud(
        @Nonnull PlayerRef playerRef,
        @Nonnull BuildCallback buildCallback
    ) {
        super(playerRef);
        this.buildCallback = buildCallback;
    }

    @Override
    protected void build(@Nonnull UICommandBuilder commandBuilder) {
        buildCallback.build(commandBuilder);
    }

    public void triggerShow() {
        executeOnWorldThread(() -> show());
    }

    public void triggerUpdate(@Nonnull UICommandBuilder commandBuilder) {
        executeOnWorldThread(() -> update(false, commandBuilder));
    }

    public void triggerUpdate(@Nonnull UICommandBuilder commandBuilder, boolean clear) {
        executeOnWorldThread(() -> update(clear, commandBuilder));
    }

    private void executeOnWorldThread(@Nonnull Runnable action) {
        Ref<EntityStore> ref = getPlayerRef().getReference();
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
}
