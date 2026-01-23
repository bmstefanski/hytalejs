import type { Player, PlayerRef, Ref, Store, EntityStore, UICommandBuilder, UIEventBuilder, ScriptCustomUIPage } from "@hytalejs.com/core";

export function registerGuiCommand(): void {
  commands.register("gui", "Opens an example custom GUI page", (ctx) => {
    const player = ctx.getPlayer();
    if (!player) {
      ctx.sendMessage("This command can only be used by players!");
      return;
    }

    const playerRef: PlayerRef = player.getPlayerRef();

    let page: ScriptCustomUIPage;

    page = new ScriptCustomUIPage(
      playerRef,
      CustomPageLifetime.CanDismiss,

      (ref: Ref<EntityStore>, cmd: UICommandBuilder, events: UIEventBuilder, store: Store<EntityStore>) => {
        cmd.append("Pages/ExamplePage.ui");
        cmd.set("#title.Text", "Welcome!");
        cmd.set("#message.Text", "Hello, " + player.getDisplayName() + "!");
        events.addEventBinding(CustomUIEventBindingType.Activating, "#CloseButton", EventData.of("action", "close"), false);
      },

      (ref: Ref<EntityStore>, store: Store<EntityStore>, rawData: string) => {
        try {
          const data = JSON.parse(rawData);
          logger.info("GUI Event received: " + rawData + " from " + player.getDisplayName());

          if (data.action === "close") {
            page.triggerClose();
          }
        } catch (e) {
          logger.severe("Failed to parse GUI event data: " + e);
        }
      },

      (ref: Ref<EntityStore>, store: Store<EntityStore>) => {
        logger.info("GUI closed for " + player.getDisplayName());
      },
    );

    const pageManager = player.getPageManager();
    const ref = playerRef.getReference();

    if (ref) {
      pageManager.openCustomPage(ref, ref.getStore(), page);
      ctx.sendMessage("Opening custom GUI...");
    } else {
      ctx.sendMessage("Failed to open GUI - player reference not found!");
    }
  });
}

export function registerSimpleGuiCommand(): void {
  commands.register("simplegui", "Opens a simple non-interactive GUI", (ctx) => {
    const player = ctx.getPlayer();
    if (!player) {
      ctx.sendMessage("This command can only be used by players!");
      return;
    }

    const playerRef: PlayerRef = player.getPlayerRef();

    const page = new ScriptCustomUIPage(
      playerRef,
      CustomPageLifetime.CanDismiss,
      (ref: Ref<EntityStore>, cmd: UICommandBuilder, events: UIEventBuilder, store: Store<EntityStore>) => {
        cmd.append("Pages/ExamplePage.ui");
        cmd.set("#title.Text", "Information");
        cmd.set("#message.Text", "This is a simple informational GUI.");
      },
    );

    const pageManager = player.getPageManager();
    const ref = playerRef.getReference();

    if (ref) {
      pageManager.openCustomPage(ref, ref.getStore(), page);
    }
  });
}

export function registerUpdatingGuiCommand(): void {
  commands.register("updatinggui", "Opens a GUI that updates over time", (ctx) => {
    const player = ctx.getPlayer();
    if (!player) {
      ctx.sendMessage("This command can only be used by players!");
      return;
    }

    const playerRef: PlayerRef = player.getPlayerRef();

    let counter = 0;
    let task: { cancel(): void } | null = null;

    const page = new ScriptCustomUIPage(
      playerRef,
      CustomPageLifetime.CanDismiss,
      (ref: Ref<EntityStore>, cmd: UICommandBuilder, events: UIEventBuilder, store: Store<EntityStore>) => {
        cmd.append("Pages/ExamplePage.ui");
        cmd.set("#title.Text", "Live Counter");
        cmd.set("#message.Text", "Counter: " + counter);
        events.addEventBinding(CustomUIEventBindingType.Activating, "#CloseButton", EventData.of("action", "close"), false);
      },
      (ref: Ref<EntityStore>, store: Store<EntityStore>, rawData: string) => {
        const data = JSON.parse(rawData);
        if (data.action === "close") {
          page.triggerClose();
        }
      },
      (ref: Ref<EntityStore>, store: Store<EntityStore>) => {
        if (task !== null) {
          task.cancel();
          task = null;
        }
        logger.info("Updating GUI closed, interval cancelled");
      },
    );

    const pageManager = player.getPageManager();
    const ref = playerRef.getReference();

    if (ref) {
      pageManager.openCustomPage(ref, ref.getStore(), page);

      task = scheduler.runRepeating(
        () => {
          counter++;
          const updateCmd = new UICommandBuilder();
          updateCmd.set("#message.Text", "Counter: " + counter);
          page.triggerSendUpdate(updateCmd);
        },
        1000,
        1000,
      );

      ctx.sendMessage("Opening updating GUI...");
    }
  });
}
