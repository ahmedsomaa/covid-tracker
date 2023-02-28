import React from 'react';
import config from '../config';
import Cookies from 'universal-cookie';
import { getCurrentUser } from '../api';
import NavBar from '../components/NavBar';
import { Outlet } from 'react-router-dom';
import Redirect from '../components/Redirect';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';

// ------ cookies object
const cookies = new Cookies();

function HomePage() {
  const { user, getAccessTokenSilently } = useAuth0();
  const [event, updateEvent] = React.useReducer((prev, next) => ({ ...prev, ...next }), {
    error: '',
    isLoading: false
  });

  // ------ hooks
  React.useEffect(() => {
    async function readUser() {
      try {
        updateEvent({ isLoading: true });
        const token = await getAccessTokenSilently({
          authorizationParams: { audience: config.audience, scope: config.scope.read }
        });
        cookies.set('jwt', token);
        const metadata = await getCurrentUser(token, user.sub);
        localStorage.setItem('metadata', JSON.stringify(metadata));
        updateEvent({ isLoading: false });
      } catch (error) {
        updateEvent({ isLoading: false, error: error.message });
      }
    }
    readUser();
  }, []);

  // ------ handle error state
  if (event.error) {
    return (
      <div className='flex flex-col h-screen items-center justify-center'>
        <h1 className='text-xl font-bold'>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p className='text-gray-600'>
          <i>{event.error}</i>
        </p>
      </div>
    );
  }

  // ------ handle loading state
  if (event.isLoading) {
    return <Redirect message='Loading user profile...' />;
  }

  // ------ handle normal state
  return (
    <div className='flex h-screen bg-gray-50 dark:bg-gray-900'>
      <div className='flex- flex-col flex-1 w-full'>
        <NavBar />
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
  onRedirecting: () => <Redirect message="We're redirecting you to authentication" />
});
