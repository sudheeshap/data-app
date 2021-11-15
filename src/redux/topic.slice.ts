import {
  createEntityAdapter,
  createSlice,
  EntityState,
} from '@reduxjs/toolkit';

import { TopicInterface } from '../shared/topic.interface';

export interface TopicStateInterface extends EntityState<TopicInterface> {}

export const topicAdapter = createEntityAdapter<TopicInterface>();

export const initialState: TopicStateInterface = topicAdapter.getInitialState(
  {},
);

export const topicSlice = createSlice({
  name: 'topic',
  initialState,
  reducers: {
    addTopic: topicAdapter.addOne,
  },
});

export const { addTopic } = topicSlice.actions;

export default topicSlice.reducer;
