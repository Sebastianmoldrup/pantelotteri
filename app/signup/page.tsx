'use client';
// Supabase
import { createClient } from '@/utils/supabase';

// Nextjs
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// UUID
import { v4 as uuidv4 } from 'uuid';

// Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

// Zod / form
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export default function Login() {
  // Form value validation
  const formSchema = z.object({
    email: z.string().email({ message: 'Ugyldig email' }).min(2, {
      message: 'Ugyldig email.',
    }),
    password: z.string().min(6, {
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

  // Create supabase client variable
  const supabase = createClient();

  // Router
  const router = useRouter();

  // Handle signup request
  async function signUpNewUser(values: z.infer<typeof formSchema>) {
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    });
    console.log('data:', data);

    if (error) {
      console.error('Error signing up:', error);
    } else if (data) {
      const userid = uuidv4();
      const { data, error } = await supabase.from('users').insert([
        {
          email: values.email,
          password: values.password,
          user_id: userid,
        },
      ]);
      router.push('/login');
    }
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-center space-y-6 main-bg'>
      <h1 className='font-bold text-white text-2xl'>Registrering</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(signUpNewUser)} className='space-y-8'>
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
              <Link href='/login'>Tilbake</Link>
            </Button>
            <Button type='submit'>Registrer</Button>
          </div>
        </form>
      </Form>
    </main>
  );
}
