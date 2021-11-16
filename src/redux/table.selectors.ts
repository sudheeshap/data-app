import { createSelector } from '@reduxjs/toolkit';

import { RootState } from './store';
import { TableStateInterface } from './table.slice';

/**
 * Select table state
 */
export const selectTableState = (state: RootState): TableStateInterface =>
  state.table;

/**
 * Select pagination
 */
export const selectPagination = createSelector(
  [selectTableState],
  (state) => state.pagination,
);
