'use server';

import { revalidateTag } from 'next/cache';

export async function postPacientConsulta(pacientId: string, title: string, text: string) {
  await fetch(`${process.env.API_URL}/paciente/${pacientId}/details`, {
    method: 'POST',
    body: JSON.stringify({ title, text }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  revalidateTag(`PACIENT_DETAIL_${pacientId}`);
}
