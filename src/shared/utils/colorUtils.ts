// Generates a stable numeric hash from a string.
export const getHash = (str: string, step = 5): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    const shifted = hash << step;
    const mixed = shifted - hash;
    hash = charCode + mixed;
  }

  return Math.abs(hash);
};

// Returns a deterministic HSL background and text color based on a hash value.
export const getColorByHash = (hash: number) => {
  const hue = (hash * 137) % 360;

  return {
    bgColor: `hsl(${hue}, 55%, 92%)`,
    textColor: `hsl(${hue}, 60%, 35%)`,
    borderColor: `hsl(${hue}, 50%, 85%)`,
  };
};

export const getColor = (text: string, step = 5) => {
  const hash = getHash(text, step);

  return getColorByHash(hash);
};
