import React, { FC, useMemo, useState } from 'react';

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
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(4);

  const pageNumbers = useMemo(
    () =>
      [...Array(totalPages)].map((n, i) => i + 1).slice(startIndex, endIndex),
    [startIndex, endIndex, totalPages],
  );

  if (totalPages === 0) {
    return null;
  }

  const handlePrevPage = () => {
    if (startIndex > 0 && currentPage >= startIndex) {
      setStartIndex((prevStartIndex) => prevStartIndex - 4);
      setEndIndex((prevEndIndex) => prevEndIndex - 4);
    }

    prevPage();
  };

  const handleNextPage = () => {
    if (currentPage >= endIndex) {
      setStartIndex((prevStartIndex) => prevStartIndex + 4);
      setEndIndex((prevEndIndex) => prevEndIndex + 4);
    }

    nextPage();
  };

  return (
    <div className={styles.container}>
      <button onClick={handlePrevPage} disabled={currentPage === 1}>
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
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        <i className="bi bi-caret-right-fill" />
      </button>
    </div>
  );
};

export default Pagination;
