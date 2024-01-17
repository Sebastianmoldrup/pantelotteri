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

  return (
    <main className='flex min-h-screen flex-col items-center justify-center main-bg text-white'></main>
  );
}
