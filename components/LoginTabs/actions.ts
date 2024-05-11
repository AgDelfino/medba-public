'use server';

import { cookies } from 'next/headers';

export async function createPatientCookie(data: { dni: string; password?: string | undefined }) {
  cookies().set('user_id', data.dni);
  cookies().set('isPatient', 'true');

  return true;
}

export async function createMedicCookie(data: { licencia: string; password?: string | undefined }) {
  cookies().set('user_id', data.licencia);
  cookies().set('isPatient', 'false');

  return true;
}
