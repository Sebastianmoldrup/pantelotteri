'use client';
// React
import { useEffect, useState } from 'react';
// Nextjs
import Link from 'next/link';
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
// Database
import supabase from '@/utils/supabase';
// Zod / form
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export default function Login() {
  // States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Form schema
  const formSchema = z.object({
    email: z.string().min(2, {
      message: 'Ugyldig email.',
    }),
    password: z.string().min(2, {
      message: 'Ugyldig passord.',
    }),
  });

  // Form values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Submit handler
  async function handleLogIn(values: z.infer<typeof formSchema>) {
    console.log(values);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
    if (data) {
      console.log(data);
    } else if (error) {
      console.log(error);
    } else return;
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-center space-y-6 main-bg'>
      <h1 className='font-bold text-white text-2xl'>Logg inn</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogIn)} className='space-y-8'>
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
            <Button type='submit'>Logg inn</Button>
            <Button asChild>
              <Link href='/signup'>Ny bruker</Link>
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
}
