import React from 'react';
import { Button } from 'flowbite-react';
import { useAuth0 } from '@auth0/auth0-react';

export default function LandingPage() {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => await loginWithRedirect({ appState: { returnTo: '/app/dashboard' } });

  return (
    <>
      <section className='bg-gray-50 dark:bg-gray-900'>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
          <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray700'>
            <div className='p-6 space-y-2 md:space-y-2 sm:p-8'>
              {/* Logo */}
              <div className='flex flex-col space-y-2 items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'>
                <img alt='Covid Icon' className='w-20 h-20 mr-2' src='/logo.png' />
                <p className='text-xl leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white font-poppins font-black'>
                  Covid Tracker
                </p>
                <p className='font-serif text-sm'>A great tool for tracking covid patients</p>
              </div>
              {/* Login button */}
              <Button pill fullSized color='success' className='font-serif text-lg' onClick={handleLogin}>
                Login
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
