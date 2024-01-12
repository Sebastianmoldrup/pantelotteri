'use client';
import { useState, useEffect } from 'react';
import createSupabaseServerClient from '../utils/supabase';
import Image from 'next/image';

export default function Home() {
  const supabase = createSupabaseServerClient();
  console.log(supabase);

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase.from('users').select();
      if (data) return console.log(data);
      else if (error) return console.log(error);
    };

    getData();
  });

  return (
    <main className='flex min-h-screen flex-col items-center justify-center main-bg'></main>
  );
}
