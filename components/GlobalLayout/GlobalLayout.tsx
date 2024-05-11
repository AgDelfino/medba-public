import React from 'react';
import Image from 'next/image';
import { cookies } from 'next/headers';
import { getUserInfo } from '@/app/utils/user';
import LogOutBtn from './LogOutBtn';
import LogoLottie from './LogoLottie';

type Props = {
  children?: React.ReactNode;
  id: string;
};

const GlobalLayout = async ({ children, id }: Props) => {
  const cookieStore = cookies();
  const isPatient = cookieStore.get('isPatient')?.value === 'true';

  const userInfo = await getUserInfo(id, cookieStore.get('isPatient')?.value || '');
  const { imageUrl, name } = userInfo;

  return (
    <section className='px-12 py-6 bg-background w-full h-[100vh] overflow-auto'>
      <header className='w-full flex justify-between bg-white rounded-2xl px-7 h-20 items-center'>
        <LogoLottie />

        <div className='flex items-center gap-4'>
          <div className='w-[67px] h-[67px] rounded-full overflow-hidden flex'>
            <Image src={imageUrl} alt='profile-image' width={100} height={100} className='w-full object-cover' />
          </div>
          <div className='flex flex-col gap-2 justify-center'>
            <h2 className='font-bold leading-5'>
              {!isPatient && 'Dr '}
              {name}
            </h2>
            <LogOutBtn />
          </div>
        </div>
      </header>
      {children}
    </section>
  );
};

export default GlobalLayout;
