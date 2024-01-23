'use client';
import { createClient } from '@/utils/supabase';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navigation from '@/components/navigation';

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
    <main className='flex flex-col items-center space-y-20 min-h-screen main-bg text-white'>
      <Navigation />
      <div className='flex items-center justify-center bg-primary w-[150px] h-[150px] rounded-xl rotate-45'>
        <div className='-rotate-45'>Jackpot</div>
      </div>
    </main>
  );
}
