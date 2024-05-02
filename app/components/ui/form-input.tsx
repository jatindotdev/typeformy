import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import { ArrowRight, Check, TriangleAlert, XIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useValidate } from '~/hooks/use-validation';
import { cn } from '~/lib/utils';
import { Button } from './button';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from './command';
import { DatePicker } from './date-picker';
import { Input } from './input';
import { PhoneInput } from './phone-input';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

export interface Question {
  id: string;
  text: string;
  required: boolean;
  type: 'text' | 'email' | 'date' | 'tel' | 'url' | 'dropdown';
  metadata?: Record<string, unknown>;
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
  question: { text: label, type, required, metadata },
}) => {
  const { validate, value, error, onChange } = useValidate({
    type,
  });

  const handleSubmit = () => {
    if (!required || validate()) {
      onSubmit(value);
    }
  };

  useEffect(() => {
    console.log(type, value);
  }, [type, value]);

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
          <div className="mb-3 w-full">
            <DynamicFormInput
              onChange={onChange}
              value={value}
              type={type}
              metadata={metadata}
            />
          </div>
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
              <Button
                className="gap-1 p-5 text-lg font-semibold"
                onClick={handleSubmit}
              >
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
  metadata: Question['metadata'];
}

const DynamicFormInput: React.FC<DyanmicFormInputProps> = ({
  onChange,
  value,
  type,
  metadata,
}) => {
  if (type === 'date') {
    return (
      <DatePicker
        value={value ? new Date(value) : undefined}
        onChange={date => onChange(date?.toISOString() ?? '')}
      />
    );
  }

  if (type === 'tel') {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      inputRef.current?.focus();
    }, []);

    return (
      <PhoneInput
        // @ts-expect-error ref is defined
        ref={inputRef}
        placeholder="Enter your phone number..."
        value={value}
        onChange={onChange}
        className="w-full"
        international
        defaultCountry="IN"
      />
    );
  }

  if (type === 'dropdown') {
    const inputRef = useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState(false);

    const multiple = (metadata?.multiple || false) as boolean;

    const [selected, setSelected] = useState(
      value
        .split(',')
        .filter(Boolean)
        .map(v => v.trim())
    );

    useEffect(() => {
      inputRef.current?.focus();
    }, []);

    const onSelect = (value: string) => {
      let newSelected: string[] = [];

      if (multiple) {
        if (selected.includes(value)) {
          newSelected = selected.filter(v => v !== value);
        } else {
          newSelected = [...selected, value];
        }
      } else {
        newSelected = [value];
      }

      setSelected(newSelected);
      onChange(newSelected.join(', '));
      if (!multiple) {
        setOpen(false);
      }
    };

    const options = ((metadata?.options || []) as string[]).map(option => ({
      label: option,
      value: option.toLowerCase().replaceAll(' ', '-'),
    }));

    const selectedValue = selected
      .map(value => options.find(option => option.value === value)?.label)
      .filter(Boolean)
      .join(', ');

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="flex w-full justify-center items-center focus-visible:outline-none">
          <Input
            ref={inputRef}
            placeholder="Select an option..."
            className="w-full pr-8"
            value={selectedValue}
            readOnly
          />
          {selectedValue ? (
            <XIcon
              onClick={() => {
                setSelected([]);
                onChange('');
              }}
              className="-ml-5 size-6 shrink-0 opacity-50"
            />
          ) : (
            <CaretSortIcon className="-ml-5 size-6 shrink-0 opacity-50" />
          )}
        </PopoverTrigger>
        <PopoverContent asChild className="p-0" align="start">
          <Command>
            <CommandInput placeholder="Enter your answer..." />
            <CommandList className="w-full p-0">
              <CommandEmpty>No results found.</CommandEmpty>
              {options
                .sort(
                  (a, b) =>
                    Number(selected.includes(b.value)) -
                    Number(selected.includes(a.value))
                )
                .map(option => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={onSelect}
                    className="w-full"
                  >
                    {option.label}
                    <CheckIcon
                      className={cn(
                        'ml-auto h-4 w-4',
                        selected.includes(option.value)
                          ? 'opacity-100'
                          : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Input
      ref={inputRef}
      type={type}
      placeholder={
        {
          text: 'Type your answer here...',
          email: 'name@example.com',
          url: 'https://',
        }[type]
      }
      className="w-full"
      onChange={e => onChange(e.target.value)}
      value={value}
    />
  );
};