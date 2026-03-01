type DeliveryDatePickerProps = {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  label?: string | undefined;
  disabled?: boolean;
};

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

import { Button } from '../ui/button';

function DeliveryDatePicker({
  date,
  setDate,
  label,
  disabled,
}: DeliveryDatePickerProps) {
  const DatePickerContent = () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant={'outline'}
          className={cn(
            'justify-start text-left font-normal w-1/4',
            !date && 'text-muted-foreground',
            disabled && 'bg-secondary'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>Delivery Date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );

  return label ? (
    <div className="my-2 flex flex-row items-center gap-4">
      <p className="text-xs">{label}</p>
      <DatePickerContent />
    </div>
  ) : (
    <DatePickerContent />
  );
}

export default DeliveryDatePicker;
