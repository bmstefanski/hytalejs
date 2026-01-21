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
} from "./commands";

import { startAutoMessages } from "./schedulers/auto-messages";

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

startAutoMessages();
