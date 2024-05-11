import { PacientItemDetail } from '@/app/types/pacient';
import { NextRequest } from 'next/server';

const ITEMS = [
  {
    id: '1',
    medic: 'Dr. Javier Martinez',
    date: '02/16/2019',
    text: "Yes, our journey has been validated by clinicans and healthcare industry experts to be the most effective at both weight loss and sustainalbity of weight loss, even after the GLP-1's are discountinued.",
    files: [{ name: 'Tomografía.pdf' }, { name: 'Radiografía.pdf' }],
  },
  {
    id: '2',
    medic: 'Dr. Javier Martinez',
    date: '02/16/2019',
    text: "Yes, our journey has been validated by clinicans and healthcare industry experts to be the most effective at both weight loss and sustainalbity of weight loss, even after the GLP-1's are discountinued.",
    files: [{ name: 'Tomografía.pdf' }, { name: 'Radiografía.pdf' }],
  },
];

const DETAIL_DATA: PacientItemDetail = {
  id: '1',
  title: 'Fractura de Rodilla',
  date: '02/10/2020',
  details:
    'Paciente: Hernán Aguirre, masculino, 45 años, residente en Calle Ficticia 123, Buenos Aires, Argentina. Historia Clínica No. HC123456, creada el 1 de mayo de 2021. Antecedentes personales: hipertensión, diabetes tipo 2, alergia a la penicilina. Juan es fumador y realiza actividad física de manera regular. Está vacunado contra la hepatitis B, tétanos y COVID-19.',
  items: ITEMS,
};

export async function GET() {
  return Response.json({ data: DETAIL_DATA });
}

export async function POST(request: NextRequest) {
  const { text } = (await request.json()) as { text: string };

  ITEMS.unshift({
    id: String(ITEMS.length + 1),
    medic: 'Dr. Javier Martinez',
    date: '11/05/2024',
    text,
    files: [],
  });

  return Response.json({ message: 'success' });
}
