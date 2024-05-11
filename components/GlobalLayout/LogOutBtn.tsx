'use client';

import { logOut } from './actions';
import { useRouter } from 'next/navigation';

const LogOutBtn = () => {
  const router = useRouter();
  return (
    <div
      className='font-normal text-xs leading-4 underline cursor-pointer'
      onClick={() => {
        logOut().then(() => router.push('/login'));
      }}>
      Cerrar Sesión
    </div>
  );
};

export default LogOutBtn;
