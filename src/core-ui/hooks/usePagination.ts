import { useState, useCallback } from 'react';

export const usePagination = (initialPage = 1, initialPerPage = 10) => {
  const [page, setPage] = useState<number>(initialPage);
  const [perPage, setPerPage] = useState<number>(initialPerPage);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);

  const hasPrev = page > 1;
  const hasNext = totalPages !== null && page < totalPages;

  const nextPage = useCallback(() => {
    if (hasNext) {
      setPage((prev) => prev + 1);
    }
  }, [hasNext]);

  const prevPage = useCallback(() => {
    if (hasPrev) {
      setPage((prev) => prev - 1);
    }
  }, [hasPrev]);

  const lastPage = useCallback(() => {
    if (totalPages !== null) {
      setPage(totalPages);
    }
  }, [totalPages]);

  const resetPage = useCallback(() => {
    setPage(initialPage);
  }, [initialPage]);

  return {
    page,
    setPage,
    perPage,
    setPerPage,
    totalPages,
    setTotalPages,
    totalItems,
    setTotalItems,
    hasPrev,
    hasNext,
    nextPage,
    prevPage,
    lastPage,
    resetPage,
  };
};
