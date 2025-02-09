import { DateRange } from 'react-day-picker';

type ListByItemProps = {
  date: DateRange | undefined;
};

//supabase hooks
import { useFetchPickingListByItem } from '@/hooks/fetch/useFetchPickingListByItems';
import { useState } from 'react';

//utils
import { toTitleCase } from '@/lib/utils';

//ui
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { Check, ChevronDown, ChevronUp, X } from 'lucide-react';
import { Button } from '../ui/button';
import { format } from 'date-fns';

function ListByItem({ date }: ListByItemProps) {
  const [activeRow, setActiveRow] = useState<number | null>(null);

  const startDate = date?.from?.toISOString();
  const endDate = date?.to?.toISOString();

  const { data, isLoading, isError, error } = useFetchPickingListByItem(
    startDate || '',
    endDate || ''
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (!data) return null;

  if (data)
    return (
      <div className="grid gap-4 sm:grid-cols-1">
        <Card className="md:col-span-4 xl:col-span-2">
          <CardHeader>
            <CardTitle>
              <div className="flex flex-row justify-between">
                <span>Picking List By Item</span>
              </div>
            </CardTitle>
            <CardDescription className="max-w-lg text-balance leading-relaxed">
              Items to be picked for the selected date range
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-0 hover:bg-0 text-sm">
                  <TableHead className="py-1 h-6 text-left">Status</TableHead>
                  <TableHead className="py-1 h-6">Item Name</TableHead>
                  <TableHead className="py-1 h-6 text-center">Total</TableHead>
                  <TableHead className="py-1 h-6 text-center">
                    Unpicked Remaining
                  </TableHead>
                  <TableHead className="py-1 h-6 text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.isArray(data) && data.length !== 0 ? (
                  data.map((item) => (
                    <TableRow key={item.id} className="bg-0 hover:bg-0 text-sm">
                      <TableCell className="py-1 text-left">
                        {item.ordersUnpicked.length > 0 ? (
                          <X className="h-5 w-5 text-destructive" />
                        ) : (
                          <Check className="h-5 w-5 text-success" />
                        )}
                      </TableCell>
                      <TableCell className="py-1">
                        <div className="font-medium">
                          {toTitleCase(item.name || '')}
                        </div>
                      </TableCell>
                      <TableCell className="py-1 font-bold text-center">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="py-1 font-bold text-center">
                        {item.ordersUnpicked.reduce(
                          (sum, order) => sum + order.totalUnpicked,
                          0
                        )}
                      </TableCell>
                      <TableCell className=" py-1 text-right">
                        <Popover
                          open={item.id === activeRow}
                          onOpenChange={(open) =>
                            setActiveRow(open ? item.id : null)
                          }
                        >
                          <PopoverTrigger asChild>
                            <Button
                              disabled={item.ordersUnpicked.length === 0}
                              variant="ghost"
                              onClick={() =>
                                setActiveRow(
                                  activeRow === item.id ? null : item.id
                                )
                              }
                              className="focus:outline-none py-0"
                            >
                              {activeRow === item.id ? (
                                <ChevronUp className="h-5 w-5" />
                              ) : (
                                <ChevronDown className="h-5 w-5" />
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="p-0">
                            <Command>
                              <CommandInput placeholder="Search orders..." />
                              <CommandList>
                                <CommandEmpty>No order found.</CommandEmpty>
                                <CommandGroup>
                                  {item.ordersUnpicked &&
                                    item.ordersUnpicked.map((order) => (
                                      <CommandItem key={order.orderId}>
                                        <div className="flex flex-row w-full items-center justify-between">
                                          <div className="flex flex-col">
                                            <p>
                                              {toTitleCase(
                                                order.customerName || ''
                                              )}
                                            </p>
                                            <div className="text-xs text-muted-foreground">
                                              Order Number: {order.orderNumber}
                                            </div>
                                          </div>
                                          <h4 className="font-bold">
                                            <span className="font-normal text-base">
                                              x{' '}
                                            </span>
                                            {order.totalUnpicked}
                                          </h4>
                                        </div>
                                      </CommandItem>
                                    ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="bg-accent" key="1">
                    <TableCell colSpan={5} className="hidden sm:table-cell">
                      <div className="grid grid rows-2 justify-start gap-2">
                        No Items to be picked for the selected date range:{' '}
                        <span className="font-bold">
                          {startDate
                            ? format(new Date(startDate), 'EEE dd MMM')
                            : ''}{' '}
                          -{' '}
                          {endDate
                            ? format(new Date(endDate), 'EEE dd MMM')
                            : ''}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
}

export default ListByItem;
