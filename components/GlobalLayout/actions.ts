'use server';

import { cookies } from 'next/headers';

export async function logOut() {
  cookies().delete('user_id');
  cookies().delete('isPatient');
}
