import {
  createEntityAdapter,
  createSlice,
  EntityState,
} from '@reduxjs/toolkit';
import { stat } from 'fs';

import { TopicInterface } from '../shared/topic.interface';
import { updateTopics } from './topic.thunks';

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
    removeTopic: topicAdapter.removeOne,
    updateAll: topicAdapter.updateMany,
    setAll: topicAdapter.setAll,
  },
});

export const { addTopic, removeTopic, updateAll, setAll } = topicSlice.actions;

export default topicSlice.reducer;
