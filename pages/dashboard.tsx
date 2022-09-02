import type { NextPage } from 'next';
import Dashboard from '../app/components/templates/Dashboard';
import { memo } from 'react';

const DashboardPage: NextPage = memo(() => {
  return <Dashboard />;
});

export default DashboardPage;
