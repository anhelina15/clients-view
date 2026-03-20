/**
 * Utility for local storage operations.
 */
export const getFromStorage = <T = unknown>(key: string): T | null => {
  const item = localStorage.getItem(key);
  try {
    return item ? JSON.parse(item) : null;
  } catch {
    return item as unknown as T;
  }
};

export const setToStorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeFromStorage = (key: string) => {
  localStorage.removeItem(key);
};
