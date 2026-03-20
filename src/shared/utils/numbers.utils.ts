export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

export const parseNumber = (value: string | number, fallback: number): number => {
  const parsed = Number(value);

  return Number.isNaN(parsed) ? fallback : parsed;
};
