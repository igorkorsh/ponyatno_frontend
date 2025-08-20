export function parseJwtLifetime(time: string): Date {
  const match = time.match(/^(\d+)([smhd])$/);

  if (!match) throw new Error('Некорректный формат времени');

  const [, value, unit] = match;
  const units: Record<string, number> = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  };

  return new Date(Date.now() + +value * units[unit]);
}
