import { getPacientInfo } from '@/app/utils/pacient';
import GlobalLayout from '@/components/GlobalLayout/GlobalLayout';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import NewConsultaForm from './components/NewConsultaForm';

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const patientInfo = await getPacientInfo(id);

  return (
    <GlobalLayout id={id}>
      <div style={{ height: 'calc(100% - 152px)' }} className='w-full flex px-[52px] relative pt-12'>
        <Link href={`/paciente/${id}`} className='absolute top-12 left-0'>
          <ArrowLeft className='w-6 h-6' />
        </Link>
        <div className='w-full'>
          <h3>Nueva Consulta</h3>
          <NewConsultaForm pacientId={id}>
            <div className='flex items-center gap-6'>
              <div className='rounded-full h-[114px] w-[114px] overflow-auto'>
                <Image
                  src={patientInfo.imageUrl}
                  alt='profile-picture'
                  width={114}
                  height={114}
                  className='w-auto h-auto object-cover'
                />
              </div>
              <div>
                <h2 className='text-3xl font-semibold leading-10'>{patientInfo.name}</h2>
                <p className='py-1 px-2 bg-background rounded-lg border border-[#E0E0E0] leading-5'>
                  {patientInfo.birthday} años | {patientInfo.dni} | {patientInfo.genre}
                </p>
                <p className='leading-5 px-2 mt-1'>Grupo Sanguíneo: {patientInfo.bloodType}</p>
              </div>
            </div>
          </NewConsultaForm>
        </div>
      </div>
    </GlobalLayout>
  );
}
