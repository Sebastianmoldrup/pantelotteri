'use client';
import { createClient } from '@/utils/supabase';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/navigation';
import JsBarcode from 'jsbarcode';

export default function Home() {
  const supabase = createClient();
  const router = useRouter();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
  };

  return (
    <main className='flex flex-col items-center space-y-20 min-h-screen main-bg text-white'>
      <Navigation />
    </main>
  );
}
