import React, { FC } from 'react';

import Layout from './components/layout/Layout';
import DataManagement from './components/data-management/DataManagement';
import Sidebar from './components/sidebar/Sidebar';

const App: FC = () => {
  return (
    <Layout>
      <Sidebar />
      <DataManagement />
    </Layout>
  );
};

export default App;
