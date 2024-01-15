'use client';
import { createClient } from '@/utils/supabase';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [users, setUsers] = useState<Array>([]);
  useEffect(() => {
    (async () => {
      const supabase = createClient();
      console.log(supabase);
      const { data, error } = await supabase.from('users').select('*');
      if (error) {
        console.error('Error fetching data:', error);
        return;
      } else if (data) {
        console.log('data exists:', data);
        data.map((row) => console.log(row.username));
      }
    })();
  }, []);

  return (
    <main className='flex min-h-screen flex-col items-center justify-center main-bg text-white'></main>
  );
}
