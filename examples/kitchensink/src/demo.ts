import { PlayerConnectHandler, PlayerDisconnectHandler, PlayerChatHandler, BreakBlockHandler, PlaceBlockHandler, DamageBlockHandler } from "./events";

import {
  registerHelloCommand,
  registerPingCommand,
  registerPlayersCommand,
  registerServerInfoCommand,
  registerHandCommand,
  registerGiveItemCommand,
  registerItemsCommand,
  registerSoundListCommand,
  registerPlaySoundCommand,
  registerPlaySound3DCommand,
  registerParticleCommand,
  registerParticleListCommand,
  registerSetBlockCommand,
  registerBreakBlockCommand,
  registerGetBlockCommand,
  registerSphereCommand,
  registerPyramidCommand,
  registerWallCommand,
  registerSquareCommand,
  registerLongTaskCommand,
  registerGuiCommand,
  registerUpdatingGuiCommand,
  registerGuiAssets,
} from "./commands";

import { startAutoMessages } from "./schedulers/auto-messages";
import { registerScoreboardAssets } from "./hud/scoreboard";

new PlayerConnectHandler();
new PlayerDisconnectHandler();
new PlayerChatHandler();
new BreakBlockHandler();
new PlaceBlockHandler();
new DamageBlockHandler();

registerHelloCommand();
registerPingCommand();
registerPlayersCommand();
registerServerInfoCommand();
registerHandCommand();
registerGiveItemCommand();
registerItemsCommand();
registerSoundListCommand();
registerPlaySoundCommand();
registerPlaySound3DCommand();
registerParticleCommand();
registerParticleListCommand();
registerSetBlockCommand();
registerBreakBlockCommand();
registerGetBlockCommand();
registerSphereCommand();
registerPyramidCommand();
registerWallCommand();
registerSquareCommand();
registerLongTaskCommand();
registerGuiAssets();
registerGuiCommand();
registerUpdatingGuiCommand();
registerScoreboardAssets();

startAutoMessages();
