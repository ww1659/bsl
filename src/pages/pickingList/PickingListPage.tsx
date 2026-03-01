import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

//components
import ListByItem from '@/components/picking-list/ListByItem';
import ListByOrder from '@/components/picking-list/ListByOrder';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
//ui
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
//utils
import { cn, getFourWeekRange } from '@/lib/utils';

function PickingListPage() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: getFourWeekRange().dateFrom,
    to: getFourWeekRange().dateTo,
  });

  return (
    <>
      <h1>Picking List</h1>
      <Tabs defaultValue="order">
        <div className="flex flex-row justify-between xl:pr-2">
          <TabsList>
            <TabsTrigger value="order">Group by Order</TabsTrigger>
            <TabsTrigger value="item">Group by Items</TabsTrigger>
          </TabsList>
          <div className={cn('grid gap-2 justify-end')}>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={'outline'}
                  className={cn(
                    'justify-start text-left font-normal',
                    !date && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, 'LLL dd')} -{' '}
                        {format(date.to, 'LLL dd')}
                      </>
                    ) : (
                      format(date.from, 'LLL dd, y')
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={1}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <TabsContent value="order">
          <ListByOrder date={date} />
        </TabsContent>
        <TabsContent value="item">
          <ListByItem date={date} />
        </TabsContent>
      </Tabs>
    </>
  );
}

export default PickingListPage;
