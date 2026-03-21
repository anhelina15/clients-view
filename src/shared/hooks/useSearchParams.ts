import { useSearchParams as useRouterSearchParams } from 'react-router-dom';
import { useState, useCallback } from 'react';

export const useSearchParams = (key: string) => {
  const [searchParams, setSearchParams] = useRouterSearchParams();
  const [value, setValue] = useState(() => searchParams.get(key));

  const updateValue = useCallback(
    (newValue: string | null) => {
      const nextParams = new URLSearchParams(window.location.search);
      if (newValue) {
        nextParams.set(key, newValue);
      } else {
        nextParams.delete(key);
      }
      setSearchParams(nextParams);
      setValue(newValue);
    },
    [setSearchParams, key],
  );

  return [value, updateValue] as const;
};
