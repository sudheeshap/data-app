import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';
import { selectPagination } from './table.selectors';

import { topicAdapter, TopicStateInterface } from './topic.slice';

/**
 * Select topic state
 */
export const selectTopicState = (state: RootState): TopicStateInterface =>
  state.topic;

/**
 * Entity selectors
 */
export const { selectAll: selectAllTopics, selectTotal: selectTopicCount } =
  topicAdapter.getSelectors<RootState>((state) => state.topic);

/**
 * Select the records per page
 */
export const selectTopicsPerPage = createSelector(
  selectAllTopics,
  selectPagination,
  (topics, pagination) => {
    const endIndex = pagination.currentPage * pagination.perPage;
    const startIndex = endIndex - pagination.perPage;

    // return topics.slice(startIndex, endIndex).map((row) => ({ ...row }));
    return topics.slice(startIndex, endIndex);
  },
);
