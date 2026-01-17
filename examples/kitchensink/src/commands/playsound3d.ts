export function registerPlaySound3DCommand(): void {
  commands.register("playsound3d", "Play a sound at your position in 3D space", (ctx) => {
    const input = ctx.getInput();
    const parts = input.split(" ");

    if (parts.length < 2) {
      ctx.sendMessage("Usage: /playsound3d <sound_id> [volume] [pitch]");
      return;
    }

    const soundId = parts[1];
    const volume = parts.length >= 3 ? parseFloat(parts[2]) : 1.0;
    const pitch = parts.length >= 4 ? parseFloat(parts[3]) : 1.0;

    if (isNaN(volume) || volume < 0 || volume > 2) {
      ctx.sendMessage("Invalid volume (0-2)");
      return;
    }

    if (isNaN(pitch) || pitch < 0.5 || pitch > 2) {
      ctx.sendMessage("Invalid pitch (0.5-2)");
      return;
    }

    const assetMap = SoundEvent.getAssetMap();
    const soundIndex = assetMap.getIndex(soundId);

    if (soundIndex < 0) {
      ctx.sendMessage("Sound not found: " + soundId);
      return;
    }

    const senderName = ctx.getSenderName();
    const universe = Universe.get();
    const players = universe.getPlayers();

    let foundPlayerRef = null;
    for (let i = 0; i < players.length; i++) {
      if (players[i].getUsername() === senderName) {
        foundPlayerRef = players[i];
        break;
      }
    }

    if (!foundPlayerRef) {
      ctx.sendMessage("Could not find player");
      return;
    }

    const transform = foundPlayerRef.getTransform();
    const pos = transform.getPosition();
    const position = new Position(pos.getX(), pos.getY(), pos.getZ());

    const packet = new PlaySoundEvent3D(soundIndex, SoundCategory.SFX, position, volume, pitch);
    foundPlayerRef.getPacketHandler().write(packet);

    ctx.sendMessage("Playing 3D sound: " + soundId + " at your position");
  });
}
