import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import topicReducer from './topic.slice';

export const store = configureStore({
  reducer: {
    topic: topicReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
