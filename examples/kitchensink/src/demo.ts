import {
  PlayerConnectHandler,
  PlayerDisconnectHandler,
  PlayerChatHandler,
} from "./events";

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
} from "./commands";

import { startAutoMessages } from "./schedulers/auto-messages";

new PlayerConnectHandler();
new PlayerDisconnectHandler();
new PlayerChatHandler();

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

startAutoMessages();
