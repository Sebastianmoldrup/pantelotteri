'use client';
// Supabase
import { createClient } from '@/utils/supabase';

// React
import { useState } from 'react';

// Nextjs
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Components
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// Zod / form
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export default function Login() {
  // Form schema
  const formSchema = z.object({
    email: z.string().min(2, {
      message: 'Ugyldig email.',
    }),
    password: z.string().min(2, {
      message: 'Ugyldig passord.',
    }),
  });

  // Create supabase client variable
  const supabase = createClient();

  // Form values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Router
  const router = useRouter();

  // State
  const [loginError, setLoginError] = useState<string>('');

  // Submit handler
  async function signInUser(values: z.infer<typeof formSchema>) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        throw error;
      } else if (data && data.user.aud === 'authenticated') {
        console.log(data);
        router.push('/');
      } else {
        console.log('Feil ved login');
      }
    } catch (error) {
      if (error instanceof Error) {
        setLoginError(error.message);
      } else {
        setLoginError('Ukjent feil');
      }
    }
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-center space-y-6 main-bg'>
      <h1 className='font-bold text-white text-2xl'>Logg inn</h1>
      {loginError !== '' ? (
        <div className='text-lg text-white'>{loginError}</div>
      ) : (
        ''
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(signInUser)} className='space-y-8'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='Email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passord</FormLabel>
                <FormControl>
                  <Input placeholder='Passord' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex justify-between'>
            <Button asChild>
              <Link href='/signup'>Ny bruker</Link>
            </Button>
            <Button type='submit'>Logg inn</Button>
          </div>
        </form>
      </Form>
    </main>
  );
}
