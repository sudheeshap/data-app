import { useState } from 'react';

interface PaginationInterface {
  perPage: number;
  total: number;
}

const usePagination = ({ perPage, total }: PaginationInterface) => {
  const [page, setPage] = useState(1);

  const pageCount = Math.ceil(total / perPage);
  const endIndex = page * perPage;
  const startIndex = endIndex - perPage;

  /**
   * Update page
   */
  const updatePage = (direction: boolean) => {
    setPage((state) => {
      if (direction) {
        // If last page, do nothing
        if (state === pageCount) {
          return state;
        }

        // Go to next
        return state + 1;
      }

      // If first page, do nothing
      if (state === 1) {
        return state;
      }

      // Go to previous
      return state - 1;
    });
  };

  /**
   * Set the current page number
   */
  const setPageByNumber = (num: number) => {
    // If number is greater than number of pages, set to last page
    if (num > pageCount) {
      return setPage(pageCount);
    }

    // If number is less than one, set page to first page
    if (num < 1) {
      return setPage(1);
    }

    setPage(num);
  };

  return {
    totalPages: pageCount,
    nextPage: () => updatePage(true),
    prevPage: () => updatePage(false),
    setPage: setPageByNumber,
    startIndex,
    endIndex,
    page,
  };
};

export default usePagination;
