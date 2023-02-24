import React from 'react';
import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

export default function Page404() {
  const navigate = useNavigate();

  return (
    <>
      <section className='flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100'>
        <div className='container flex flex-col items-center justify-center px-5 mx-auto my-8'>
          <h2 className='font-poppins mb-8 font-extrabold text-9xl dark:text-gray-600'>
            <span className='sr-only'>Error</span>404
          </h2>
          <p className='font-serif text-2xl font-semibold md:text-3xl'>Sorry, we couldn't find this page.</p>
          <p className='font-serif mt-4 mb-8 dark:text-gray-400'>
            But dont worry, you can find plenty of other things on our homepage.
          </p>
          <Button className='font-serif' onClick={() => navigate('/app/dashboard')}>
            Back to homepage
          </Button>
        </div>
      </section>
    </>
  );
}
