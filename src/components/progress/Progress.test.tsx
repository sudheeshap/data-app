import React from 'react';

import { render } from '../../test-utils';
import Progress from './Progress';

describe('Progress component', () => {
  it('should show progress percentage', () => {
    const { getByTestId } = render(<Progress percentage={50} />);
    const progress = getByTestId('progress');

    expect(progress.clientWidth).toEqual(50);
  });
});
