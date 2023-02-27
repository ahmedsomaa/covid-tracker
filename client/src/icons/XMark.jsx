import React from 'react';

export default function XMark({ ...props }) {
  return (
    <svg
      {...props}
      fill='none'
      aria-hidden='true'
      strokeWidth='1.5'
      viewBox='0 0 24 24'
      stroke='currentColor'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M6 18L18 6M6 6l12 12' strokeLinecap='round' strokeLinejoin='round'></path>
    </svg>
  );
}
