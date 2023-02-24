import React from 'react';
import useUser from '../hooks/useUser';
import NavBar from '../components/NavBar';
import { Outlet } from 'react-router-dom';
import Redirect from '../components/Redirect';
import { withAuthenticationRequired } from '@auth0/auth0-react';

function HomePage() {
  const { data } = useUser();

  return (
    <div className='flex h-screen bg-gray-50 dark:bg-gray-900'>
      <div className='flex- flex-col flex-1 w-full'>
        <NavBar user={data} />
        <main className='h-full overflow-y-auto'>
          <div className='container grid py-2 px-6 mx-auto'>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default withAuthenticationRequired(HomePage, {
  onRedirecting: () => <Redirect message="We're redictring you" />
});
