import Table from '../table/Table';
import { TableColumnInterface } from '../../shared/table-column.interface';
import usePagination from '../../hooks/use-pagination';
import Pagination from '../pagination/Pagination';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { updatePagination } from '../../redux/table.slice';
import { selectPagination } from '../../redux/table.selectors';
import { TopicInterface } from '../../shared/topic.interface';
import { updateTopics } from '../../redux/topic.thunks';
import {
  selectTopicsPerPage,
  selectIsUploadActive,
} from '../../redux/topic.selectors';
import Upload from '../upload/Upload';
import { toggleUpload } from '../../redux/topic.slice';
import Panel from '../panel/Panel';

const DataManagement = () => {
  const dispatch = useAppDispatch();
  const pagination = useAppSelector(selectPagination);
  const topicsPerPage = useAppSelector(selectTopicsPerPage);
  const isUploadActive = useAppSelector(selectIsUploadActive);

  // Max upload file size: 500 KB
  const uploadMaxFileSize = 1024 * 500;
  const uploadFileType = '.csv';
  const uploadDescription = 'Only upload csv files, and not more than 500 KB';

  const columns: TableColumnInterface[] = [
    { key: 'id', text: 'Primary Key' },
    { key: 'date', text: 'Date' },
    { key: 'intention', text: 'Intention' },
    { key: 'standard_question', text: 'Standard Question' },
    { key: 'standard_answer', text: 'Standard answer' },
  ];

  const perPage = pagination.perPage;
  const totalRows = pagination.total;

  const { totalPages, nextPage, prevPage, setPage } = usePagination({
    perPage,
    total: totalRows,
  });

  /**
   * Clicked to show upload section
   */
  const handleClickUpload = () => {
    dispatch(toggleUpload(true));
  };

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

  /**
   * Upload topics
   */
  const handleUpload = (data: object[]) => {
    dispatch(updateTopics(data as TopicInterface[]));
  };

  /**
   * Close upload
   */
  const handleUploadClose = () => {
    dispatch(toggleUpload(false));
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
      {!isUploadActive && (
        <>
          <Panel>
            <div>
              <i className="bi bi-check" />
              <span>Data Management</span>
            </div>
          </Panel>
          <Panel>
            <div>
              <button onClick={handleClickUpload}>
                <span>Upload Data</span>
                <i className="bi bi-check" />
              </button>
            </div>
          </Panel>
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
        </>
      )}

      {isUploadActive && (
        <Upload
          fileType={uploadFileType}
          maxFileSize={uploadMaxFileSize}
          description={uploadDescription}
          onUpload={handleUpload}
          onClose={handleUploadClose}
        />
      )}
    </section>
  );
};

export default DataManagement;
