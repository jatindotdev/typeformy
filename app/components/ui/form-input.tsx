import { ArrowRight, Check, TriangleAlert } from 'lucide-react';
import { Button } from './button';
import { Input } from './input';
import { motion } from 'framer-motion';
import { cn } from '~/lib/utils';
import { useValidate } from '~/hooks/use-validation';
import { DatePicker } from './date-picker';
import { PhoneInput } from './phone-input';

export interface Question {
  id: string;
  text: string;
  required: boolean;
  type: 'text' | 'email' | 'date' | 'tel' | 'url';
  // TODO: add more field types like radio, checkbox, etc.
}

interface FormInputProps {
  question: Question;
  index: number;
  className?: string;
  onSubmit: (value: string) => void;
}

export const FormInput: React.FC<FormInputProps> = ({
  index,
  className,
  onSubmit,
  question: { text: label, type, required },
}) => {
  const { validate, value, error, onChange } = useValidate({
    type,
  });

  const handleSubmit = () => {
    if (!required || validate()) {
      onSubmit(value);
    }
  };

  return (
    <motion.div
      variants={{
        hidden: { y: 200, opacity: 0 },
        visible: { y: 0, opacity: 1 },
      }}
      transition={{
        type: 'spring',
        duration: 0.5,
        stiffness: 120,
        damping: 16,
      }}
      initial="hidden"
      animate="visible"
      className={cn(
        'h-screen w-screen flex items-center justify-center snap-start p-4',
        className
      )}
    >
      <div className="flex gap-3 items-start justify-start md:-mt-32 w-full max-w-xl">
        <div className="flex justify-center items-center font-light text-blue-800 pt-1">
          <span className="text-base">{index}</span>
          <ArrowRight className="size-5" strokeWidth={1.8} />
        </div>
        <div className="w-full">
          <h1 className="text-2xl mb-6">
            {label}
            {required && <span className="text-red-500">*</span>}
          </h1>
          <DynamicFormInput onChange={onChange} value={value} type={type} />
          {error ? (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="w-max py-1 px-2 bg-red-100 rounded text-red-700 text-sm flex items-center gap-1"
            >
              <TriangleAlert className="fill-red-700 stroke-red-100 size-[18px]" />
              {error}
            </motion.div>
          ) : (
            <div className="flex items-center gap-2">
              <Button className="gap-1" onClick={handleSubmit}>
                OK
                <Check className="size-5" strokeWidth={2.5} />
              </Button>
              <span className="text-xs">
                press <strong>Enter</strong> ↵
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

interface DyanmicFormInputProps {
  onChange: (value: string) => void;
  value: string;
  type: Question['type'];
}

const DynamicFormInput: React.FC<DyanmicFormInputProps> = ({
  onChange,
  value,
  type,
}) => {
  switch (type) {
    case 'date':
      return (
        <DatePicker
          value={value ? new Date(value) : undefined}
          onChange={date => onChange(date?.toISOString() ?? '')}
          className="mb-3"
        />
      );

    case 'tel':
      return (
        <PhoneInput
          placeholder="Enter your phone number..."
          value={value}
          onChange={onChange}
          className="mb-3 w-full"
        />
      );
    default:
      return (
        <Input
          type={type}
          placeholder={
            {
              text: 'Type your answer here...',
              email: 'name@example.com',
              url: 'https://',
            }[type]
          }
          className="mb-3 w-full"
          onChange={e => onChange(e.target.value)}
          value={value}
        />
      );
  }
};
