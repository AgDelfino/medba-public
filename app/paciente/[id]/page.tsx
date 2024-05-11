import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { EllipsisVertical, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getAge, getFormattedDate } from '@/app/utils/dates';
import Link from 'next/link';
import Row from './componets/Row';
import GlobalLayout from '@/components/GlobalLayout/GlobalLayout';
import { getPacientDetail, getPacientInfo, getPacientItemDetail } from '@/app/utils/pacient';
import { cookies } from 'next/headers';

const USER_ID = '1';

export default async function Page({ params }: { params: { id: string } }) {
  const { id: pacientId } = params;
  const cookieStore = cookies();
  const isPatient = cookieStore.get('isPatient')?.value;

  const [pacientDetail, pacientInfo] = await Promise.all([getPacientDetail(pacientId), getPacientInfo(pacientId)]);
  const { date, title, details } = await getPacientItemDetail(pacientId, '1');

  const { birthday, name, imageUrl, genre, bloodType } = pacientInfo;
  console.log('🚀 ~ Page ~ pacientInfo:', pacientInfo);

  return (
    <GlobalLayout id={USER_ID}>
      <div className={`flex flex-col items-${isPatient === 'true' ? 'center' : 'start'} justify-center gap-4 pt-14`}>
        {isPatient === 'true' ? (
          <div className='flex gap-14 justify-center items-center'>
            <h1 className='flex flex-col text-[50px] leading-[57.5px] w-[495px]'>
              Hola {name.split(' ')[0]}, <span>¿Cómo te sentís hoy?</span>
            </h1>
            <div className='second-column overflow-auto max-h-[600px] max-w-[680px]'>
              <div className='bg-[#00A4F44D] p-5 rounded-2xl'>
                <div className='flex justify-between mb-6'>
                  <h2 className='text-lg font-medium'>{title}</h2>
                  <h2 className='font-medium text-md'>{getFormattedDate(date)}</h2>
                </div>
                <h3 className='text-sm'>Observaciones</h3>
                <h4 className='mt-2'>{details}</h4>
              </div>
            </div>
          </div>
        ) : (
          <div className='flex gap-6 items-center'>
            <Avatar className='w-[84px] h-[84px]'>
              <AvatarImage src={imageUrl} />
              <AvatarFallback>FA</AvatarFallback>
            </Avatar>

            <div>
              <h4 className='text-xl font-medium'>Paciente: {name}</h4>
              <h4 className='py-1 px-2 bg-white rounded-lg border border-[#E0E0E0] leading-5'>
                {getAge(birthday)} Años | {birthday.replaceAll('/', '.')} | {genre}
              </h4>
              <h4>Grupo Sanguineo: {bloodType}</h4>
            </div>
          </div>
        )}

        <div className='flex justify-between w-full'>
          <h2 className='text-xl'>Historial de Consultas</h2>
          {isPatient !== 'true' && (
            <Link href={`/paciente/${pacientId}/consulta/nueva`}>
              <Button>
                <Plus />
                Nueva Consulta
              </Button>
            </Link>
          )}
        </div>

        <Table>
          <TableHeader>
            <TableRow className='p-6'>
              <TableHead className='text-sm'>Consulta</TableHead>
              <TableHead className='text-sm'>Fecha Consulta</TableHead>
              <TableHead className='text-sm'>Fecha cierre</TableHead>
              <TableHead className='text-sm'>Estado</TableHead>
              <TableHead className='text-sm text-right'>Médico</TableHead>
              <TableHead className='w-0' />
            </TableRow>
          </TableHeader>
          <TableBody>
            {pacientDetail.map((item, index) => (
              <Row pacientId={pacientId} itemId={item.id} key={`${item.title}_${index.toString()}`}>
                <TableCell className='font-medium'>{item.title}</TableCell>
                <TableCell>{item.startDate}</TableCell>
                <TableCell>{item.endDate}</TableCell>
                <TableCell>
                  <Badge variant={item.status}>{item.status}</Badge>
                </TableCell>
                <TableCell className='text-right'>{item.medic}</TableCell>
                <TableCell className='text-right'>
                  <EllipsisVertical />
                </TableCell>
              </Row>
            ))}
          </TableBody>
        </Table>
      </div>
    </GlobalLayout>
  );
}
