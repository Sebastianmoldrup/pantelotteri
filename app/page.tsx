'use client';
import { createClient } from '@/utils/supabase';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/navigation';

export default function Home() {
  const [barcode, setBarcode] = useState('');
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const supabase = createClient();

      const { data, error } = await supabase.auth.getUser();
      // console.log(data);
      // console.log(error);

      async function loadSession() {
        const { data, error } = await supabase.auth.getSession();
        if (data) {
          setBarcode(data.session?.user.id ?? '');
        } else if (error) {
          console.error(error);
        }
      }
      loadSession();

      if (error) router.push('/login');
    })();
  }, [router, barcode]);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
  };

  return (
    <main className='flex flex-col items-center space-y-20 min-h-screen main-bg text-white'>
      <Navigation />
    </main>
  );
}
