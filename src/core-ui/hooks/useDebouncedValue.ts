import { useState, useRef, useEffect, useCallback } from 'react';

export function useDebouncedValue<T>(
  value: T,
  wait: number,
): readonly [T, () => void, (newValue: T) => void] {
  const [_value, setValue] = useState(value);
  const timeoutRef = useRef<number | null>(null);

  const cancel = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const setManualValue = useCallback(
    (newValue: T) => {
      cancel();
      setValue(newValue);
    },
    [cancel],
  );

  useEffect(() => {
    cancel();

    timeoutRef.current = window.setTimeout(() => {
      setValue(value);
    }, wait);

    return cancel;
  }, [value, wait, cancel]);

  return [_value, cancel, setManualValue] as const;
}
