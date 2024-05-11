import { getAge, getFormattedDate } from '@/app/utils/dates';
import { getPacientInfo, getPacientItemDetail } from '@/app/utils/pacient';
import GlobalLayout from '@/components/GlobalLayout/GlobalLayout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import NewItemForm from './components/NewItemForm';
import { cookies } from 'next/headers';

const USER_ID = '1';

export default async function Page({ params }: { params: { id: string; detailId: string } }) {
  const { id: pacientId, detailId } = params;
  const [pacientInfo, detailData] = await Promise.all([
    getPacientInfo(pacientId),
    getPacientItemDetail(pacientId, detailId),
  ]);

  const cookieStore = cookies();
  const isPatient = cookieStore.get('isPatient')?.value === 'true';

  const { genre, dni, bloodType, imageUrl, name, birthday } = pacientInfo;

  return (
    <GlobalLayout id={USER_ID}>
      <div
        className='gap-8 items-start pt-14'
        style={{ display: 'grid', gridTemplateColumns: 'auto 1fr 1fr', overflow: 'hidden' }}>
        <div>
          <Link href={`/paciente/${pacientId}`}>
            <ArrowLeft />
          </Link>
        </div>

        <div className='second-column overflow-auto max-h-[600px]'>
          <div className='bg-[#00A4F44D] p-5 rounded-2xl mb-[40px]'>
            <div className='flex justify-between mb-6'>
              <h2 className='text-lg font-medium'>{detailData.title}</h2>
              <h2 className='font-medium text-md'>{getFormattedDate(detailData.date)}</h2>
            </div>
            <h3 className='text-sm'>Observaciones</h3>
            <h4 className='mt-2'>{detailData.details}</h4>
          </div>

          {detailData.items.map((item, index) => {
            return (
              <div
                key={`ITEM_${index.toString()}`}
                className='bg-[#f6feff] p-5 rounded-2xl border-[#F2F2F2] border-solid border-2 mb-[12px]'>
                <div className='flex justify-between'>
                  <h2 className='text-lg font-medium'>{item.medic}</h2>
                  <h2>{getFormattedDate(item.date)}</h2>
                </div>
                <p className='bg-white p-3'>{item.text}</p>

                <div className='flex gap-2'>
                  {item.files.map((file, indexFile) => {
                    return (
                      <div key={`ITEM_FILE_${indexFile.toString()}`}>
                        <Button variant='outline' className='text-blue border-blue flex gap-2'>
                          {file.name}
                          <FileDown />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {!isPatient && (
          <div className='flex flex-col gap-4'>
            <div className='second-column flex justify-start items-center gap-6'>
              <Image width={114} height={114} src={imageUrl} alt='user image' className='rounded-full' />

              <div>
                <h2 className='text-3xl font-medium'>Paciente: {name}</h2>
                <h2 className='py-1 px-2 bg-white rounded-lg border border-[#E0E0E0] leading-5'>
                  {getAge(birthday)} Años | {dni} | {genre}
                </h2>
                <h2>Grupo Sanguineo: {bloodType}</h2>
              </div>
            </div>

            <h2 className='text-[20px] font-medium'>{detailData.title}</h2>
            <NewItemForm pacientId={pacientId} itemId={detailId} isPatient={isPatient} />
          </div>
        )}
      </div>
    </GlobalLayout>
  );
}
