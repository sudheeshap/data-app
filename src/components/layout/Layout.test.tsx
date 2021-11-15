import React from 'react';

import { render } from '../../test-utils';
import Layout from './Layout';

describe('Layout component', () => {
  it('should render main tag', () => {
    const { getByTestId } = render(<Layout>Hi</Layout>);
    const main = getByTestId('app-main');

    expect(main).toBeInTheDocument();
  });
});
