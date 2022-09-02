import type { NextPage } from 'next';
import Login from '../../app/components/templates/Login/Login';
import { memo } from 'react';

const Home: NextPage = memo(() => {
  return <Login />;
});

export default Home;
