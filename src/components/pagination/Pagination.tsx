import React, { FC, useMemo, useState } from 'react';
import Button from '../button/Button';

import styles from './Pagination.module.scss';

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
      <Button
        icon="bi bi-caret-left-fill"
        variant="default"
        onClick={handlePrevPage}
        isDisabled={currentPage === 1}
      />
      {pageNumbers.map((num) => (
        <Button
          key={num}
          className={`${styles.pageNumber} ${
            currentPage === num ? styles.active : ''
          }`}
          variant="default"
          onClick={() => setPage(num)}
        >
          {num}
        </Button>
      ))}
      <Button
        icon="bi bi-caret-right-fill"
        variant="default"
        onClick={handleNextPage}
        isDisabled={currentPage === totalPages}
      />
    </div>
  );
};

export default Pagination;
