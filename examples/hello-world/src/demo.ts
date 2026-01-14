import { PlayerConnectEvent, EventListener, handlers } from './types';

class HelloWorldPlugin {
  @EventListener('PlayerConnectEvent')
  onPlayerJoin(event: PlayerConnectEvent): void {
    const playerName = event.getPlayerName();
    const playerUUID = event.getPlayerUUID();
    const worldName = event.getWorldName();

    logger.info('Player ' + playerName + ' (UUID: ' + playerUUID + ') joined world: ' + worldName);
    logger.info('Welcome to the TypeScript plugin demo!');
  }
}

new HelloWorldPlugin();

