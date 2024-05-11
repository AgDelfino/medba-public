'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { getOneUser } from './actions';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { User } from '@/interfaces';
import { ArrowLeft, Info } from 'lucide-react';

const SearchUser = () => {
  const [dni, setDNI] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;

    value = value.slice(0, 8);

    if (/^[0-9]*$/.test(value)) {
      setDNI(value);
    }
  };

  const handleSearch = () => {
    const response = getOneUser(Number(dni));

    response.then(res => {
      if (res === 'user not found') {
        setError(true);
      } else {
        setUser(res.user);
        setError(false);
      }
    });
  };

  function FakeDash() {
    return (
      <div className='flex w-10 justify-center items-center'>
        <div className='w-4 h-0.5 rounded-full bg-primary' />
      </div>
    );
  }

  const handleToken = () => {
    router.push(`/paciente/${user?.id}`);
  };

  return (
    <>
      {user ? (
        <div>
          <ArrowLeft onClick={() => setUser(null)} className='mb-4 cursor-pointer' />
          <h3 className='text-[24px] mb-6'>{user.name}</h3>
          <div className='flex items-center mb-2'>
            <h4 className='text-grey-dark font-semibold'>Ingresa Token de paciente</h4>
            <Info color='#888888' size={16} className='ml-2' />
          </div>

          <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} onComplete={() => handleToken()}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <FakeDash />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
      ) : (
        <div className='max-w-[400px] w-full'>
          <h1 className='text-[40px] mb-6 text-center'>¿A quién buscás?</h1>
          <div className='flex items-center justify-center'>
            <Input
              type='text'
              placeholder='Ingresá el DNI del Paciente'
              className='mr-2 max-w-[310px] w-full'
              value={dni}
              onKeyDown={e => (e.key === 'Enter' ? handleSearch() : null)} // Add this line
              onChange={e => {
                handleInputChange(e), setError(false);
              }}
            />
            <Button className='h-[60px]' onClick={handleSearch} disabled={dni.length < 8}>
              Buscar
            </Button>
          </div>
          {error && <p className='mt-2 ml-2'>Ningún usuario encontrado</p>}
        </div>
      )}
    </>
  );
};

export default SearchUser;
