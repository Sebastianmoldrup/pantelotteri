'use client';
import { createClient } from '@/utils/supabase';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Navigation from '@/components/navigation';
import QRCode from 'qrcode';

export default function Home() {
  const [qrCode, setQrCode] = useState('');
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const supabase = createClient();

      const { data, error } = await supabase.auth.getUser();
      // console.log(data);
      // console.log(error);

      if (error) router.push('/login');
    })();
  }, [router]);

  async function loadSession() {
    const { data, error } = await supabase.auth.getSession();
    if (data) {
      generateQR(data.session?.user.id ?? '');
    } else if (error) {
      console.error(error);
    }
  }
  loadSession();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
  };

  const generateQR = async (text: string) => {
    try {
      const qrimage = await QRCode.toDataURL(text);
      if (qrimage) setQrCode(qrimage);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className='flex flex-col items-center space-y-20 min-h-screen main-bg text-white'>
      <Navigation />
      <Image src={qrCode} alt='qr code' width={100} height={100} />
    </main>
  );
}
