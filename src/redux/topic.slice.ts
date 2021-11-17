import {
  createEntityAdapter,
  createSlice,
  EntityState,
} from '@reduxjs/toolkit';

import { TopicInterface } from '../shared/topic.interface';

export interface TopicStateInterface extends EntityState<TopicInterface> {
  isUploadActive: boolean;
}

export const topicAdapter = createEntityAdapter<TopicInterface>();

export const initialState: TopicStateInterface = topicAdapter.getInitialState({
  isUploadActive: false,
});

export const topicSlice = createSlice({
  name: 'topic',
  initialState,
  reducers: {
    addTopic: topicAdapter.addOne,
    removeTopic: topicAdapter.removeOne,
    updateAll: topicAdapter.updateMany,
    setAll: topicAdapter.setAll,
    toggleUpload: (state, action) => {
      state.isUploadActive = action.payload;
    },
  },
});

export const { addTopic, removeTopic, updateAll, setAll, toggleUpload } =
  topicSlice.actions;

export default topicSlice.reducer;
