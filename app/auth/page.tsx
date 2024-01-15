'use client';
import { useState } from 'react';

export default function Auth() {
  const [num, setNum] = useState(0);
  return (
    <div className='w-full h-screen flex flex-col justify-center gap-y-4 items-center'>
      <div>{num}</div>
      <button
        className='bg-primary text-white text-sm px-4 py-2 rounded-md'
        onClick={() => setNum(num + 1)}
      >
        Click me
      </button>
    </div>
  );
}
