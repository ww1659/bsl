import { DateRange } from "react-day-picker";
import { useState } from "react";

//ui
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";

//components
import ListByItem from "@/components/picking-list/ListByItem";
import ListByOrder from "@/components/picking-list/ListByOrder";

//utils
import { cn, getWeekRange } from "@/lib/utils";
import { format } from "date-fns";

function PickingListPage() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: getWeekRange().dateFrom,
    to: getWeekRange().dateTo,
  });

  return (
    <>
      <h1>Picking List</h1>
      <Tabs defaultValue="order">
        <div className="flex flex-row justify-between">
          <TabsList>
            <TabsTrigger value="order">Group by Order</TabsTrigger>
            <TabsTrigger value="item">Group by Items</TabsTrigger>
          </TabsList>
          <div className={cn("grid gap-2")}>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
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
