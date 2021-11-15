import React from 'react';
import { cleanup } from '@testing-library/react';

import App from './App';
import { render } from './test-utils';

describe('App', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render a layout component', () => {
    const { getByTestId } = render(<App />);
    const appHeader = getByTestId('app-header');

    expect(appHeader).toBeInTheDocument();
  });

  it('should render a main element', () => {
    const { getByTestId } = render(<App />);
    const appMain = getByTestId('app-main');

    expect(appMain).toBeInTheDocument();
  });
});
