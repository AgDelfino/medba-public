'use server';

import { revalidateTag } from 'next/cache';

export async function postPacientItem(pacientId: string, detailId: string, text: string) {
  await fetch(`${process.env.API_URL}/paciente/${pacientId}/consulta/${detailId}`, {
    method: 'POST',
    body: JSON.stringify({ text }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  revalidateTag(`PACIENT_ITEM_DETAIL_${pacientId}_${detailId}`);
}
