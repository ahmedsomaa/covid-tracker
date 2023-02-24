import React from 'react';
import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <div className='flex flex-col h-screen items-center justify-center'>
      <h1 className='text-xl font-bold'>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className='text-gray-600'>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
