'use client';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '~/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import { cn } from '~/lib/utils';
import { Input } from './input';

interface DatePickerProps {
  value?: Date;
  onChange: (date?: Date) => void;
  className?: string;
}

export function DatePicker({
  value: date,
  onChange,
  className,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger
        className="focus-visible:outline-none flex gap-4 justify-center items-center"
        tabIndex={-1}
      >
        <CalendarIcon className="size-7 text-blue-600 my-auto" />
        <Input
          value={date ? format(date, 'PPP') : ''}
          className={cn('w-full cursor-pointer', className)}
          readOnly
          placeholder="Select a date"
        />
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 peer" align="end">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onChange}
          initialFocus
          disabled={date => date > new Date() || date < new Date('1900-01-01')}
        />
      </PopoverContent>
    </Popover>
  );
}