'use client';

import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import PasswordInput from '../PasswordInput/PasswordInput';
import { createMedicCookie } from './actions';

const FormSchema = z.object({
  licencia: z.string().min(8, {
    message: 'Licencia tiene que tener 8 números.',
  }),
  password: z.string().optional(),
});

export function FormMedics() {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      licencia: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const res = await createMedicCookie(data);

    if (res) {
      router.push(`/`);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
        <FormField
          control={form.control}
          name='licencia'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='Matrícula de Profesional' autoComplete='off' {...field} type='text' />
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
              <FormControl>
                <PasswordInput id='password' placeholder='Contraseña' {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type='submit'>Enviar</Button>
      </form>
    </Form>
  );
}
