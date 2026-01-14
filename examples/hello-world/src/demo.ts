import { PlayerConnectEvent, EventListener, handlers } from './types';

class HelloWorldPlugin {
  @EventListener('PlayerConnectEvent')
  onPlayerJoin(event: PlayerConnectEvent): void {
    const player = event.getPlayer();
    const worldName = event.getWorldName();

    logger.info('Player ' + player.getName() + ' joined world: ' + worldName);

    player.sendMessage('Welcome to the server, ' + player.getName() + '!');
    player.sendMessage('Switching you to Creative mode...');

    player.runCommand('gamemode creative');

    player.sendMessage('You can now fly! Double-tap jump to toggle flight.');
  }
}

new HelloWorldPlugin();

