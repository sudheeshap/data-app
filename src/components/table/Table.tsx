import { ReactElement } from 'react';

import styles from './Table.module.scss';
import { TableColumnInterface } from '../../shared/table-column.interface';
import { Dictionary } from '../../shared/dictionary.interface';

interface TableProps {
  isSelectable: boolean;
  columns: TableColumnInterface[];
  rows: object;
  actions: ReactElement;
}

const Table = ({ isSelectable, columns, rows, actions }: TableProps) => {
  const tableRows = rows as Array<Dictionary<string>>;

  return (
    <>
      {tableRows.length === 0 && (
        <div className={styles.emptyState}>No records found</div>
      )}
      {tableRows.length > 0 && (
        <div className={styles.container}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.header}>
                {isSelectable && (
                  <th className={styles.headerCell}>
                    <input type="checkbox" />
                  </th>
                )}
                {columns.map((column) => (
                  <th key={column.key} className={styles.headerCell}>
                    {column.text}
                  </th>
                ))}
                {actions && <th className={styles.headerCell}>Operations</th>}
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row) => (
                <tr key={row.id} className={styles.tableRow}>
                  {isSelectable && (
                    <td className={styles.rowCell}>
                      <input type="checkbox" />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td key={column.key} className={styles.rowCell}>
                      {row[column.key]}
                    </td>
                  ))}
                  <td className={styles.rowCell}>{actions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Table;
