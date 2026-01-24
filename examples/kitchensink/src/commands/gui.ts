import type { Player, PlayerRef, Ref, Store, EntityStore, UICommandBuilder, UIEventBuilder, ScriptCustomUIPage } from "@hytalejs.com/core";
import { UIBuilder, group, label, textButton } from "@hytalejs.com/core";

const EXAMPLE_PAGE_UI = new UIBuilder()
  .import("C", "../Common.ui")
  .import("Sounds", "../Sounds.ui")
  .roots(
    group()
      .template("$C.@PageOverlay")
      .layoutMode("Middle")
      .children(
        group()
          .template("$C.@DecoratedContainer")
          .anchor({ width: 400 })
          .children(
            group({ id: "Title" }).children(group().template("$C.@Title").param("Text", '"Example Page"')),
            group({ id: "Content" })
              .padding({ vertical: 32, horizontal: 45 })
              .children(
                label({ id: "title" }).style({ renderBold: true, textColor: "#FFFFFF" }).text("Default Title"),
                label({ id: "message" }).anchor({ top: 20 }).style({ textColor: "#94a7bb" }).text("Default Message"),
                group()
                  .layoutMode("Center")
                  .anchor({ top: 30 })
                  .children(textButton({ id: "CloseButton", text: "Close" }).template("$C.@TextButton").param("Sounds", "$Sounds.@ButtonsCancel").flexWeight(1)),
              ),
          ),
      ),
    group().template("$C.@BackButton"),
  )
  .build();

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
