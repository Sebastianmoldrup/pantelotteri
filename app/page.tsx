'use client';
import { createClient } from '@/utils/supabase';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [users, setUsers] = useState<Array>([]);
  const supabase = createClient();
  useEffect(() => {
    (async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from('users').select('*');
      if (error) {
        console.error('Error fetching data:', error);
        return;
      } else if (data) {
        console.log('data fetched');
        data.map((row) => console.log(row.email));
      } else {
        console.log('no data');
      }
    })();
  }, []);

  async function signOut() {
    const { error } = await supabase.auth.signOut();
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-center main-bg text-white gap-10'>
      <a
        href='/login'
        onClick={signOut}
        className='px-4 py-2 bg-primary shadow-xl rounded-md'
      >
        Signout
      </a>
      <a href='/login' className='px-4 py-2 bg-primary shadow-xl rounded-md'>
        Login
      </a>
      <a href='/signup' className='px-4 py-2 bg-primary shadow-xl rounded-md'>
        Signup
      </a>
    </main>
  );
}
