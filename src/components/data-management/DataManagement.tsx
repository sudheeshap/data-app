import { useEffect, useMemo } from 'react';

import Table from '../table/Table';
import { TableColumnInterface } from '../../shared/table-column.interface';
import usePagination from '../../hooks/use-pagination';
import Pagination from '../pagination/Pagination';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { updatePagination } from '../../redux/table.slice';
import { selectPagination } from '../../redux/table.selectors';
import { TopicInterface } from '../../shared/topic.interface';
import { updateTopics } from '../../redux/topic.thunks';
import { selectTopicsPerPage } from '../../redux/topic.selectors';

const DataManagement = () => {
  const dispatch = useAppDispatch();
  const pagination = useAppSelector(selectPagination);
  const topicsPerPage = useAppSelector(selectTopicsPerPage);

  const columns: TableColumnInterface[] = [
    { key: 'id', text: 'Primary Key' },
    { key: 'date', text: 'Date' },
    { key: 'operation', text: 'Operating' },
  ];

  const rows: TopicInterface[] = useMemo(
    () => [
      { id: '1', date: '2 days ago' },
      { id: '2', date: '3 minutes ago' },
      { id: '3', date: '1 day ago' },
      { id: '4', date: '2 days ago' },
      { id: '5', date: '3 minutes ago' },
      { id: '6', date: '10 days ago' },
      { id: '7', date: '5 days ago' },
      { id: '9', date: '17 days ago' },
      { id: '10', date: '27 days ago' },
      { id: '11', date: '47 days ago' },
      { id: '12', date: '3 days ago' },
      { id: '13', date: '8 days ago' },
    ],
    [],
  );

  useEffect(() => {
    dispatch(updateTopics(rows));
  }, [dispatch, rows]);

  const perPage = pagination.perPage;
  const totalRows = pagination.total;

  const { totalPages, nextPage, prevPage, setPage } = usePagination({
    perPage,
    total: totalRows,
  });

  /**
   * Clicked on next button
   */
  const handlePaginationNext = () => {
    nextPage();

    dispatch(
      updatePagination({
        ...pagination,
        currentPage: pagination.currentPage + 1,
      }),
    );
  };

  /**
   * Clicked on previous button
   */
  const handlePaginationPrev = () => {
    prevPage();

    dispatch(
      updatePagination({
        ...pagination,
        currentPage: pagination.currentPage - 1,
      }),
    );
  };

  /**
   * Clicked on page button
   */
  const handlePaginationSet = (page: number) => {
    setPage(page);

    dispatch(
      updatePagination({
        ...pagination,
        currentPage: page,
      }),
    );
  };

  const renderActions = () => {
    return (
      <>
        <button>Edit</button>
        <button>Delete</button>
        <button>...</button>
      </>
    );
  };

  return (
    <section>
      <Table
        isSelectable
        columns={columns}
        rows={topicsPerPage}
        actions={renderActions()}
      />

      <Pagination
        nextPage={handlePaginationNext}
        prevPage={handlePaginationPrev}
        setPage={handlePaginationSet}
        perPage={pagination.perPage}
        currentPage={pagination.currentPage}
        totalPages={totalPages}
      />
    </section>
  );
};

export default DataManagement;
