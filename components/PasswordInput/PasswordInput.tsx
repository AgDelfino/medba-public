'use client';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

type PasswordInputProps = {
  id: string;
  placeholder?: string;
};

const PasswordInput = ({ id, placeholder }: PasswordInputProps) => {
  const [showPassword, setShowpassword] = useState(false);
  return (
    <div className='relative'>
      <Input id={id} type={showPassword ? 'text' : 'password'} placeholder={placeholder || ''} autoComplete='off' />
      <div className='absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer'>
        {!showPassword ? (
          <EyeOff onClick={() => setShowpassword(!showPassword)} />
        ) : (
          <Eye onClick={() => setShowpassword(!showPassword)} />
        )}
      </div>
    </div>
  );
};

export default PasswordInput;
