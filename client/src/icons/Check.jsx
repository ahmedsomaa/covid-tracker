import React from 'react';

export default function Check({ ...props }) {
  return (
    <svg
      {...props}
      fill='none'
      aria-hidden='true'
      stroke-width='1.5'
      viewBox='0 0 24 24'
      stroke='currentColor'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M4.5 12.75l6 6 9-13.5' stroke-linecap='round' stroke-linejoin='round'></path>
    </svg>
  );
}
