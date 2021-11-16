import { createSlice } from '@reduxjs/toolkit';

import { PaginationInterface } from '../shared/pagination.interface';
import { updateTopics } from './topic.thunks';

export interface TableStateInterface {
  pagination: PaginationInterface;
}

export const initialState: TableStateInterface = {
  pagination: {
    perPage: 3,
    currentPage: 1,
    total: 0,
  },
};

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    updatePagination: (state, action) => {
      state.pagination = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateTopics.fulfilled, (state, action) => {
      state.pagination.total = action.payload ? action.payload.length : 0;
    });
  },
});

export const { updatePagination } = tableSlice.actions;

export default tableSlice.reducer;
