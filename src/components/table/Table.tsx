import { ReactElement } from 'react';

import styles from './Table.module.css';
import { TableColumnInterface } from '../../shared/table-column.interface';
import { Dictionary } from '../../shared/dictionary.interface';

interface TableProps {
  isSelectable: boolean;
  columns: TableColumnInterface[];
  rows: Array<Dictionary<string>>;
  actions: ReactElement;
}

const Table = ({ isSelectable, columns, rows, actions }: TableProps) => {
  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            {isSelectable && (
              <th>
                <input type="checkbox" />
              </th>
            )}

            {columns.map((column) => (
              <th key={column.key}>{column.text}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {isSelectable && (
                <td>
                  <input type="checkbox" />
                </td>
              )}

              {columns.map((column) => (
                <td key={column.key}>
                  {!row[column.key] && actions ? actions : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
