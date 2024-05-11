'use client';

import { TableRow } from '@/components/ui/table';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {
  pacientId: string;
  itemId: string;
} & React.PropsWithChildren;

const Row = ({ children, pacientId, itemId }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/paciente/${pacientId}/consulta/${itemId}`);
  };

  return (
    <TableRow className='hover:bg-[#00A4F44D] hover:cursor-pointer' onClick={handleClick}>
      {children}
    </TableRow>
  );
};

export default Row;
