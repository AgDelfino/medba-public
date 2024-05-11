'use client';

import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import PasswordInput from '../PasswordInput/PasswordInput';
import { createPatientCookie } from './actions';

const FormSchema = z.object({
  dni: z.string().min(8, {
    message: 'DNI tiene que tener 8 números.',
  }),
  password: z.string().optional(),
});

export function FormPatient() {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      dni: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const res = await createPatientCookie(data);

    if (res) {
      router.push(`/paciente/${data.dni}`);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
        <FormField
          control={form.control}
          name='dni'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='Número de Documento' autoComplete='off' {...field} type='number' />
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
