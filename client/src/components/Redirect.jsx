import React from 'react';
import { Spinner } from 'flowbite-react';

export default function Redirect({ message }) {
  return (
    <section className='bg-gray-50 dark:bg-gray-900'>
      <div className='flex flex-col items-center justify-center space-y-3 px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <Spinner size='lg' color='success' />
        <span className='font-serif font-semibold'>{message}</span>
      </div>
    </section>
  );
}
