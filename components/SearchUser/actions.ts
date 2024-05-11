'use server';

export async function getOneUser(dni: number) {
  const response = await fetch(`${process.env.API_URL}/users`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Error al obtener los usuarios. Código de estado');
  }

  const users = await response.json();

  const user = users && users.find((user: any) => user.dni === dni);

  if (!user) {
    return 'user not found';
  }

  return { user };
}
