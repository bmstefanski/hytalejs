import type { Player, PlayerRef, Ref, Store, EntityStore, UICommandBuilder, UIEventBuilder, ScriptCustomUIPage } from "@hytalejs.com/core";

const EXAMPLE_PAGE_UI = `$C = "../Common.ui";
$Sounds = "../Sounds.ui";

$C.@PageOverlay {
  LayoutMode: Middle;

  $C.@DecoratedContainer {
    Anchor: (Width: 400);

    #Title {
      $C.@Title {
        @Text = "Example Page";
      }
    }

    #Content {
      Padding: (Vertical: 32, Horizontal: 45);

      Label #title {
        Style: (RenderBold: true, TextColor: #FFFFFF);
        Text: "Default Title";
      }

      Label #message {
        Anchor: (Top: 20);
        Style: (TextColor: #94a7bb);
        Text: "Default Message";
      }

      Group {
        LayoutMode: Center;
        Anchor: (Top: 30);

        $C.@TextButton #CloseButton {
          @Sounds = $Sounds.@ButtonsCancel;
          Text: "Close";
          FlexWeight: 1;
        }
      }
    }
  }
}

$C.@BackButton {}
`;

let assetsRegistered = false;

export function registerGuiAssets(): void {
  if (assetsRegistered) {
    return;
  }
  assetsRegistered = true;

  const asset = new ByteArrayCommonAsset("UI/Custom/Pages/ExamplePage.ui", EXAMPLE_PAGE_UI);
  CommonAssetModule.get().addCommonAsset("hytalejs", asset);

  logger.info("Registered custom UI assets");
}

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
