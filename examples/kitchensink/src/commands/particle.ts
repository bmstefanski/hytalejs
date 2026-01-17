export function registerParticleCommand(): void {
  commands.register("particle", "Spawn a particle system at your position", (ctx) => {
    const input = ctx.getInput();
    const parts = input.split(" ");

    if (parts.length < 2) {
      ctx.sendMessage("Usage: /particle <particle_system_id> [scale] [r] [g] [b]");
      return;
    }

    const particleId = parts[1];
    const scale = parts.length >= 3 ? parseFloat(parts[2]) : 1.0;
    let r = parts.length >= 4 ? parseInt(parts[3], 10) : 255;
    let g = parts.length >= 5 ? parseInt(parts[4], 10) : 255;
    let b = parts.length >= 6 ? parseInt(parts[5], 10) : 255;

    if (isNaN(scale) || scale <= 0) {
      ctx.sendMessage("Invalid scale");
      return;
    }

    if (isNaN(r) || r < 0 || r > 255 || isNaN(g) || g < 0 || g > 255 || isNaN(b) || b < 0 || b > 255) {
      ctx.sendMessage("Invalid RGB values (0-255)");
      return;
    }

    if (r > 127) r = r - 256;
    if (g > 127) g = g - 256;
    if (b > 127) b = b - 256;

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
    const rot = transform.getRotation();

    const position = new Position(pos.getX(), pos.getY() + 2.0, pos.getZ());
    const direction = new Direction(rot.getX(), rot.getY(), rot.getZ());

    const color = new Color(r, g, b);

    const packet = new SpawnParticleSystem(particleId, position, direction, scale, color);
    foundPlayerRef.getPacketHandler().write(packet);

    ctx.sendMessage("Spawned particle: " + particleId);
  });
}
