import { UserInfo } from '../types/user';

export const getUserInfo = async (id: string, isPatient: string) => {
  const response: { data: UserInfo } = await fetch(`${process.env.API_URL}/users/${id}?isPatient=${isPatient}`).then(
    res => res.json()
  );

  return response.data;
};
