type DeliveryDatePickerProps = {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
};

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '../ui/button';

function DeliveryDatePicker({ date, setDate }: DeliveryDatePickerProps) {
  return (
    <div className="my-2 flex flex-row items-center gap-4 justify-end">
      <p className="text-xs">Please select a date for delivery</p>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'justify-start text-left font-normal w-1/4',
              !date && 'text-muted-foreground'
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
            // disabled={(date) =>
            //   date.getTime() < new Date().setHours(0, 0, 0, 0)
            // }
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DeliveryDatePicker;
