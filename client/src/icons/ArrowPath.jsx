import React from 'react';

export default function ArrowPath({ ...props }) {
  return (
    <svg
      {...props}
      fill='none'
      aria-hidden='true'
      stroke='currentColor'
      strokeWidth='1.5'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99'
        strokeLinecap='round'
        strokeLinejoin='round'
      ></path>
    </svg>
  );
}
