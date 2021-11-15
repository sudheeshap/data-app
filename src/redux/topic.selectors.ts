import { RootState } from './store';

import { TopicStateInterface } from './topic.slice';

/**
 * Select topic state
 */
export const selectTopicState = (state: RootState): TopicStateInterface =>
  state.topic;
