import Table from '../table/Table';
import { TableColumnInterface } from '../../shared/table-column.interface';
import { Dictionary } from '../../shared/dictionary.interface';

const DataManagement = () => {
  const columns: TableColumnInterface[] = [
    { key: 'id', text: 'Primary Key' },
    { key: 'date', text: 'Date' },
    { key: 'operation', text: 'Operating' },
  ];

  const rows: Array<Dictionary<string>> = [
    { id: '1', date: '2 days ago' },
    { id: '2', date: '3 minutes ago' },
    { id: '3', date: '1 day ago' },
  ];

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
        rows={rows}
        actions={renderActions()}
      />
    </section>
  );
};

export default DataManagement;
