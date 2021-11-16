import { createAsyncThunk } from '@reduxjs/toolkit';
import { TopicInterface } from '../shared/topic.interface';
import { setAll } from './topic.slice';

/**
 * Add topics
 */
export const updateTopics = createAsyncThunk(
  'topic/updateTopics',
  (topics: TopicInterface[], { dispatch }) => {
    dispatch(setAll(topics));

    return topics;
  },
);
