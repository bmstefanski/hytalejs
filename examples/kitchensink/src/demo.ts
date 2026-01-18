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

startAutoMessages();
