import React from 'react';

import { render } from '../../test-utils';
import Header from './Header';

describe('Header component', () => {
  test('should render a logo', () => {
    const { getByTestId } = render(<Header />);
    const appLogo = getByTestId('app-logo');

    expect(appLogo).toBeInTheDocument();
  });
});
