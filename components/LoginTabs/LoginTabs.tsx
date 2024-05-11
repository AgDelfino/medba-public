import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FormPatient } from './FormPatient';
import { FormMedics } from './FormMedics';

export function LoginTabs() {
  return (
    <Tabs defaultValue='patient' className='w-[400px]'>
      <TabsList className='grid w-full grid-cols-2 border-2 bg-background border-primary mb-11'>
        <TabsTrigger value='patient'>Paciente</TabsTrigger>
        <TabsTrigger value='profetional'>Profesional de la salud</TabsTrigger>
      </TabsList>
      <TabsContent value='patient' className='flex flex-col gap-6 m-0'>
        <FormPatient />
      </TabsContent>
      <TabsContent value='profetional' className='flex flex-col gap-6 m-0'>
        <FormMedics />
      </TabsContent>
    </Tabs>
  );
}
