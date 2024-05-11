import { PacientDetail, PacientInfo, PacientItemDetail } from '../types/pacient';

export const getPacientDetail = async (pacientId: string) => {
  const response: { data: PacientDetail[] } = await fetch(`${process.env.API_URL}/paciente/${pacientId}/details`, {
    next: { tags: [`PACIENT_DETAIL_${pacientId}`] },
  }).then(res => res.json());

  return response.data;
};

export const getPacientInfo = async (id: string) => {
  const response: { data: PacientInfo } = await fetch(`${process.env.API_URL}/paciente/${id}/info`).then(res =>
    res.json()
  );

  return response.data;
};

export const getPacientItemDetail = async (pacientId: string, itemId: string) => {
  const response: { data: PacientItemDetail } = await fetch(
    `${process.env.API_URL}/paciente/${pacientId}/consulta/${itemId}`,
    { next: { tags: [`PACIENT_ITEM_DETAIL_${pacientId}_${itemId}`] } }
  ).then(res => res.json());

  return response.data;
};
