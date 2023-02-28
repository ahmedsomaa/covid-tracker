import React from 'react';
import Check from '../icons/Check';
import XMark from '../icons/XMark';

export default function ToastResult({ success = true, message = '' }) {
  const iconClasses = 'h-5 w-5';
  const toastClasses = success
    ? 'bg-blue-100 text-blue-500 dark:bg-blue-800 dark:text-blue-200'
    : 'bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200';

  return (
    <>
      <div className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${toastClasses}`}>
        {success ? <Check className={iconClasses} /> : <XMark className={iconClasses} />}
      </div>
      <div className='ml-3 text-sm font-normal'>
        <span className='mb-1 text-sm font-semibold text-gray-900 dark:text-white'>Check Results</span>
        {message && <div className='mb-2 text-sm font-normal'>{message}</div>}
      </div>
    </>
  );
}
