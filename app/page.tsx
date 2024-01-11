import { useState, useEffect } from 'react';
import { createSupabaseFrontEndClient } from '../utils/supabase';
import Image from 'next/image';

export default function Home() {
  const supabase = createSupabaseFrontEndClient();
  console.log(supabase);

  return (
    <main className='flex min-h-screen flex-col items-center justify-center main-bg'></main>
  );
}
