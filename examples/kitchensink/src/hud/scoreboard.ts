import type { Player, PlayerRef, UICommandBuilder, ScriptCustomUIHud, ScriptTask } from "@hytalejs.com/core";
import { UIBuilder, group, label } from "@hytalejs.com/core";

const SCOREBOARD_HUD_UI = new UIBuilder()
  .import("C", "../Common.ui")
  .root(
    group({ id: "Scoreboard" })
      .anchor({ right: 20, top: 100, width: 200, height: 170 })
      .layoutMode("Top")
      .background({ color: "#0a0e14", opacity: 0.85 })
      .padding({ full: 12 })
      .children(
        label({ id: "Title" })
          .style({
            fontSize: 24,
            textColor: "#f5c542",
            renderBold: true,
            renderUppercase: true,
            horizontalAlignment: "Center",
          })
          .anchor({ height: 30 })
          .text("HytaleJS"),
        group({ id: "Separator1" }).anchor({ height: 1, top: 8 }).background({ color: "#2b3542" }),
        group({ id: "PlayerRow" })
          .layoutMode("Left")
          .anchor({ height: 22, top: 10 })
          .children(
            label({ id: "PlayerLabel" }).style({ fontSize: 13, textColor: "#8a9aab", verticalAlignment: "Center" }).anchor({ width: 80 }).text("Player:"),
            label({ id: "PlayerValue" }).style({ fontSize: 13, textColor: "#ffffff", verticalAlignment: "Center", renderBold: true }).flexWeight(1).text("Unknown"),
          ),
        group({ id: "OnlineRow" })
          .layoutMode("Left")
          .anchor({ height: 22, top: 4 })
          .children(
            label({ id: "OnlineLabel" }).style({ fontSize: 13, textColor: "#8a9aab", verticalAlignment: "Center" }).anchor({ width: 80 }).text("Online:"),
            label({ id: "OnlineValue" }).style({ fontSize: 13, textColor: "#5cb85c", verticalAlignment: "Center", renderBold: true }).flexWeight(1).text("0"),
          ),
        group({ id: "TpsRow" })
          .layoutMode("Left")
          .anchor({ height: 22, top: 4 })
          .children(
            label({ id: "TpsLabel" }).style({ fontSize: 13, textColor: "#8a9aab", verticalAlignment: "Center" }).anchor({ width: 80 }).text("TPS:"),
            label({ id: "TpsValue" }).style({ fontSize: 13, textColor: "#5cb85c", verticalAlignment: "Center", renderBold: true }).flexWeight(1).text("0"),
          ),
        group({ id: "Separator2" }).anchor({ height: 1, top: 10 }).background({ color: "#2b3542" }),
        label({ id: "Website" })
          .style({
            fontSize: 11,
            textColor: "#5a6a7a",
            horizontalAlignment: "Center",
          })
          .anchor({ height: 18, top: 8 })
          .text("hytalejs.com - updates every 10s"),
      ),
  )
  .build();

interface PlayerHudData {
  hud: ScriptCustomUIHud;
  task: ScriptTask;
}

const playerHuds = new Map<string, PlayerHudData>();

let assetsRegistered = false;

export function registerScoreboardAssets(): void {
  if (assetsRegistered) {
    return;
  }
  assetsRegistered = true;

  const asset = new ByteArrayCommonAsset("UI/Custom/Hud/Scoreboard.ui", SCOREBOARD_HUD_UI);
  CommonAssetModule.get().addCommonAsset("hytalejs", asset);

  logger.info("Registered scoreboard HUD assets");
}

export function showScoreboardHud(player: Player): ScriptCustomUIHud {
  const playerRef: PlayerRef = player.getPlayerRef();
  const uuid = player.getUuid().toString();
  const username = playerRef.getUsername();
  const playersOnline = Universe.get().getPlayerCount();
  const tps = Universe.get().getDefaultWorld().getTps();

  const existingData = playerHuds.get(uuid);
  if (existingData) {
    refreshHud(existingData.hud, player);
    return existingData.hud;
  }

  const hud = new ScriptCustomUIHud(playerRef, (cmd: UICommandBuilder) => {
    cmd.append("Hud/Scoreboard.ui");

    cmd.set("#PlayerValue.Text", username);
    cmd.set("#OnlineValue.Text", playersOnline.toString());
    cmd.set("#TpsValue.Text", tps.toString());
  });

  const hudManager = player.getHudManager();
  hudManager.setCustomHud(playerRef, hud);
  hud.triggerShow();

  const hudData: PlayerHudData = { hud, task: null as unknown as ScriptTask };

  hudData.task = scheduler.runRepeating(
    () => {
      const data = playerHuds.get(uuid);
      if (data) {
        refreshHud(data.hud, player);
      }
    },
    10000,
    10000,
  );

  playerHuds.set(uuid, hudData);

  return hud;
}

function refreshHud(hud: ScriptCustomUIHud, player: Player): void {
  const playerRef = player.getPlayerRef();
  const username = playerRef.getUsername();
  const playersOnline = Universe.get().getPlayerCount();
  const tps = Universe.get().getDefaultWorld().getTps();

  const cmd = new UICommandBuilder();
  cmd.set("#PlayerValue.Text", username);
  cmd.set("#OnlineValue.Text", playersOnline.toString());
  cmd.set("#TpsValue.Text", tps.toString());

  hud.triggerUpdate(cmd);
}

export function hideScoreboardHud(player: Player): void {
  const playerRef: PlayerRef = player.getPlayerRef();
  const uuid = player.getUuid().toString();

  const data = playerHuds.get(uuid);
  if (data) {
    data.task.cancel();
  }

  const hudManager = player.getHudManager();
  hudManager.setCustomHud(playerRef, null);

  playerHuds.delete(uuid);
}
