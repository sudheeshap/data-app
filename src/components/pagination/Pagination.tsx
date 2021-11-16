import React, { FC, useMemo } from 'react';

import styles from './Pagination.module.css';

interface PaginationProps {
  nextPage: () => void;
  prevPage: () => void;
  setPage: (page: number) => void;
  perPage: number;
  currentPage: number;
  totalPages: number;
}

const Pagination: FC<PaginationProps> = ({
  nextPage,
  prevPage,
  setPage,
  currentPage,
  perPage,
  totalPages,
}) => {
  const pageNumbers = useMemo(
    () => [...Array(totalPages)].map((n, i) => i + 1),
    [totalPages],
  );

  if (totalPages === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <button onClick={prevPage} disabled={currentPage === 1}>
        <i className="bi bi-caret-left-fill" />
      </button>
      {pageNumbers.map((num) => (
        <button
          onClick={() => setPage(num)}
          key={num}
          className={`${styles.pageNumber} ${
            currentPage === num ? styles.active : ''
          }`}
        >
          {num}
        </button>
      ))}
      <button onClick={nextPage} disabled={currentPage === totalPages}>
        <i className="bi bi-caret-right-fill" />
      </button>
    </div>
  );
};

export default Pagination;
