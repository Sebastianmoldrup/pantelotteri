'use client';
import supabase from '@/utils/supabase';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from('users').select('*');
      console.log(data);
      if (error) {
        console.error('Error fetching data:', error);
        return;
      }
      if (data) {
        console.log('data');
        data.map((row) => console.log(row.username));
      }
    })();
  }, []);

  return (
    <main className='flex min-h-screen flex-col items-center justify-center main-bg'></main>
  );
}
