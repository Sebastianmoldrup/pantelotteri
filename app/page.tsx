'use client';
import { createClient } from '@/utils/supabase';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navigation from '@/components/navigation';
import QRCode from 'qrcode';

export default function Home() {
  const [qrCode, setQrCode] = useState('');
  const supabase = createClient();

  useEffect(() => {
    (async () => {
      const supabase = createClient();

      const session = supabase.auth.session();

      const { data, error } = await supabase.auth.getUser();
      console.log(data);
      console.log(error);
    })();
  }, []);

  async function signOut() {
    const { error } = await supabase.auth.signOut();
  }

  const generateQR = async (text) => {
    try {
      console.log(await QRCode.toDataURL(text));
    } catch (err) {
      console.error(err);
    }
  };
  generateQR('33kd35e');

  return (
    <main className='flex flex-col items-center space-y-20 min-h-screen main-bg text-white'>
      <Navigation />
    </main>
  );
}
