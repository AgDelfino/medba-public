'use client';

import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormEvent } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { postPacientItem } from './actions';

const FormSchema = z.object({
  text: z.string().min(10, {
    message: 'Mensaje tiene que tener al menos 10 caracteres.',
  }),
});

type Props = {
  isPatient: boolean;
  itemId: string;
  pacientId: string;
};

const NewItemForm = ({ isPatient, pacientId, itemId }: Props) => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      text: '',
    },
  });

  const {
    formState: { isValid },
  } = form;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await postPacientItem(pacientId, itemId, form.getValues().text);
    form.reset({ text: '' });
  };

  return (
    <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
      <FormProvider {...form}>
        <FormField
          control={form.control}
          name='text'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea className='bg-white h-48 resize-none' {...field} disabled={isPatient} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className='w-full border-dotted border-2 rounded-md p-4 bg-[#F0F0F080] text-black' disabled>
          Subir Archivo
        </Button>
        <Button className='ml-auto' disabled={!isValid} type='submit'>
          Guardar
        </Button>
      </FormProvider>
    </form>
  );
};

export default NewItemForm;
