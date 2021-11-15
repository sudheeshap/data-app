import topicReducer from './topic.slice';

describe('Topic slice', () => {
  test('should return the initial state', () => {
    const topicState = topicReducer(undefined, { type: '' });

    expect(topicState).toEqual({
      entities: {},
      ids: [],
    });
  });
});
