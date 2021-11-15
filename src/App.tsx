import React, { FC } from 'react';

import Layout from './components/layout/Layout';

const App: FC = () => {
  return (
    <Layout>
      <div className="sidebar">Sidebar</div>
      <div className="content">Hello world</div>
    </Layout>
  );
};

export default App;
