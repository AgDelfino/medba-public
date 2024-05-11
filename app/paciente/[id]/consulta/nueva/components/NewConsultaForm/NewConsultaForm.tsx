'use client';

import ClientInput from '@/components/ClientInput/ClientInput';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { CloudDownload } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import { postPacientConsulta } from './actions';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { getFormattedDate } from '@/app/utils/dates';

const FormSchema = z.object({
  title: z.string().min(10, {
    message: 'Titulo tiene que tener al menos 10 caracteres.',
  }),
  text: z.string().min(10, {
    message: 'Descripcion tiene que tener al menos 10 caracteres.',
  }),
});

type Props = {
  pacientId: string;
} & React.PropsWithChildren;

const NewConsultaForm = ({ children, pacientId }: Props) => {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      title: '',
      text: '',
      nextSteps: '',
    },
    resolver: zodResolver(FormSchema),
  });

  const {
    formState: { isValid },
  } = form;

  return (
    <FormProvider {...form}>
      <div className='w-full h-full pt-8 flex'>
        <div className='w-1/2 bg-[#FFFFFF80] rounded-2xl h-full p-5'>
          {children}
          <div>
            <div className='mt-6 flex flex-col gap-4'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ClientInput
                        id='motive'
                        placeholder='Ingrese el motivo de su consulta'
                        label='Motivo de consulta'
                        inputClass='rounded-2xl'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='text'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ClientInput
                        id='comements'
                        label='Comentarios'
                        isTextArea
                        placeholder='Descripción breve'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <div className='w-1/2 h-full p-5 bg-[#FFFFFF80] ml-8 rounded-2xl max-h-[363px]'>
          <FormField
            control={form.control}
            name='nextSteps'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ClientInput
                    id='nextSteps'
                    label='Próximos pasos'
                    placeholder='Ingrese motivo de consulta'
                    isTextArea
                    textAreaClass='h-[132px] rounded-2xl'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <button className='flex justify-center items-center w-full mt-4 border border-dashed bg-[#F0F0F080] py-9 rounded-2xl gap-2'>
            Subir archivo <CloudDownload className='w-5 h-5' />
          </button>

          <Button
            disabled={!isValid}
            className='bg-black text-white mt-4'
            variant='outline'
            onClick={async () => {
              const { title, text } = form.getValues();
              await postPacientConsulta(pacientId, title, text);

              form.reset({
                title: '',
                text: '',
                nextSteps: '',
              });

              toast('Consulta Creada', {
                description: getFormattedDate('05/11/2024'),
                action: {
                  label: 'Ocultar',
                  onClick: () => toast.dismiss(),
                },
              });

              router.push(`/paciente/${pacientId}`);
            }}>
            Guardar
          </Button>
        </div>
      </div>
    </FormProvider>
  );
};

export default NewConsultaForm;
