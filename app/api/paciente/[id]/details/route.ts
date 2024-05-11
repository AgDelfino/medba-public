import { PacientDetail } from '@/app/types/pacient';
import { NextRequest } from 'next/server';

const USER_DATA: PacientDetail[] = [
  {
    id: '1',
    title: 'Fractura',
    startDate: '10/10/2021',
    endDate: '10/10/2024',
    status: 'Completada',
    medic: 'Nicolás Lukestik',
  },
  {
    id: '2',
    title: 'Fractura',
    startDate: '10/10/2021',
    endDate: '10/10/2024',
    status: 'En Proceso',
    medic: 'Nicolás Lukestik',
  },
  {
    id: '3',
    title: 'Fractura',
    startDate: '10/10/2021',
    endDate: '10/10/2024',
    status: 'Completada',
    medic: 'Nicolás Lukestik',
  },
  {
    id: '4',
    title: 'Fractura',
    startDate: '10/10/2021',
    endDate: '10/10/2024',
    status: 'Rechazada',
    medic: 'Nicolás Lukestik',
  },
  {
    id: '5',
    title: 'Fractura',
    startDate: '10/10/2021',
    endDate: '10/10/2024',
    status: 'En Proceso',
    medic: 'Nicolás Lukestik',
  },
  {
    id: '6',
    title: 'Fractura',
    startDate: '10/10/2021',
    endDate: '10/10/2024',
    status: 'En Proceso',
    medic: 'Nicolás Lukestik',
  },
];

export async function GET() {
  return Response.json({ data: USER_DATA });
}

export async function POST(request: NextRequest) {
  const { title } = (await request.json()) as { text: string; title: string };

  USER_DATA.unshift({
    id: String(USER_DATA.length + 1),
    title,
    startDate: '05/11/2024',
    endDate: '05/11/2024',
    status: 'En Proceso',
    medic: 'Nicolás Lukestik',
  });

  return Response.json({ message: 'success' });
}
