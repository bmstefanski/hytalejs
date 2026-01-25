import { PlayerConnectHandler, PlayerDisconnectHandler, PlayerChatHandler, BreakBlockHandler, PlaceBlockHandler, DamageBlockHandler, NPCInteractHandler } from "./events";

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
  registerNpcSpawnCommand,
  registerNpcRolesCommand,
  registerNpcDespawnCommand,
} from "./commands";

import { startAutoMessages } from "./schedulers/auto-messages";
import { registerScoreboardAssets } from "./hud/scoreboard";

new PlayerConnectHandler();
new PlayerDisconnectHandler();
new PlayerChatHandler();
new BreakBlockHandler();
new PlaceBlockHandler();
new DamageBlockHandler();
new NPCInteractHandler();

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
registerNpcSpawnCommand();
registerNpcRolesCommand();
registerNpcDespawnCommand();

startAutoMessages();
