import { useSearchParams } from 'react-router-dom';
import { useCallback, useMemo } from 'react';

export const useSearchId = (paramName: string) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const id = useMemo(() => {
    const val = searchParams.get(paramName);

    return val ? parseInt(val, 10) : null;
  }, [searchParams, paramName]);

  const setId = useCallback(
    (newId: number | null) => {
      const nextParams = new URLSearchParams(searchParams);

      if (newId) {
        nextParams.set(paramName, newId.toString());
      } else {
        nextParams.delete(paramName);
      }

      setSearchParams(nextParams);
    },
    [searchParams, setSearchParams, paramName],
  );

  return [id, setId] as const;
};
