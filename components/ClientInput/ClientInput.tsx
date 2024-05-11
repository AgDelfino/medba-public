'use client';

import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

type InputProps = {
  label?: string;
  placeholder?: string;
  id: string;
  labelClass?: string;
  inputClass?: string;
  textAreaClass?: string;
  type?: string;
  isTextArea?: boolean;
};

const ClientInput = ({
  label,
  placeholder,
  id,
  labelClass,
  inputClass,
  type,
  isTextArea,
  textAreaClass,
  ...props
}: InputProps) => {
  return (
    <div className={`w-full flex flex-col gap-2`}>
      {label && <Label className={labelClass}>{label}</Label>}
      {isTextArea ? (
        <Textarea
          id={id}
          placeholder={placeholder}
          className={`resize-none bg-[#FFF] h-[260px] ${textAreaClass}`}
          {...props}
        />
      ) : (
        <Input id={id} placeholder={placeholder} className={inputClass} type={type} {...props} />
      )}
    </div>
  );
};

export default ClientInput;
