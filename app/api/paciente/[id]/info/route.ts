import { PacientInfo } from '@/app/types/pacient';

const PATIENT_INFO: PacientInfo = {
  imageUrl: 'https://github.com/shadcn.png',
  name: 'Hernán Aguirre',
  birthday: '02/16/1980',
  genre: 'Masculino',
  dni: '12345678',
  bloodType: 'A+',
};

export async function GET() {
  return Response.json({ data: PATIENT_INFO });
}
