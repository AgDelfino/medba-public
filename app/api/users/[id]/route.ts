import { UserInfo } from '@/app/types/user';
import { NextRequest } from 'next/server';

const USER_INFO_DR: UserInfo = {
  imageUrl: 'https://i.pravatar.cc/300',
  name: 'Nicolás Lukestik',
  birthday: '02/16/1980',
  genre: 'Masculino',
  dni: '37337075',
  plate: '12343',
};

const USER_INFO_PATIENT: UserInfo = {
  imageUrl: 'https://i.pravatar.cc/300',
  name: 'Hernán Aguirre',
  birthday: '02/16/1980',
  genre: 'Masculino',
  dni: '37337075',
  plate: '12343',
};

export async function GET(request: NextRequest) {
  const data = request.nextUrl.searchParams.get('isPatient') === 'true' ? USER_INFO_PATIENT : USER_INFO_DR;
  return Response.json({ data });
}
