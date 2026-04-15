import type { Engine } from '@tsparticles/engine';

export async function registerParticles(engine: Engine): Promise<void> {
  const [{ loadSlim }] = await Promise.all([import('@tsparticles/slim')]);

  await loadSlim(engine);
}
