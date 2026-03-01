type ListByOrderProps = {
  date: DateRange | undefined;
};
//utils
import { format, parseISO } from 'date-fns';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

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
import { useUpdatePickedItem } from '@/hooks/item/useUpdatePickedItem';
//supabase hooks
import { useFetchPickingListByOrder } from '@/hooks/order/useFetchPickingListByOrder';
import { useUpdatePickedOrder } from '@/hooks/order/useUpdatePickedOrder';
import { calculateOrderPickedStatus, toTitleCase } from '@/lib/utils';

import { Badge } from '../ui/badge';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
//components
import ItemsSheet from './ItemsSheet';

function ListByOrder({ date }: ListByOrderProps) {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [selectedOrderNotes, setSelectedOrderNotes] = useState<string | null>(
    null
  );
  const { mutate: updatePickedItem } = useUpdatePickedItem();
  const { mutate: updatePickedOrder } = useUpdatePickedOrder();

  const handleRowClick = (orderId: string, orderNotes: string | null) => {
    setSelectedOrder(orderId === selectedOrder ? null : orderId);
    setSelectedOrderNotes(orderId === selectedOrder ? null : orderNotes);
  };

  const startDate = date?.from?.toISOString();
  const endDate = date?.to?.toISOString();

  const { data, isLoading, isError, error } = useFetchPickingListByOrder(
    startDate || '',
    endDate || ''
  );

  let orderNumber = null;
  if (selectedOrder) {
    orderNumber = data?.filter((order) => order.id === selectedOrder)[0].number;
  }

  const items = data
    ? data
        .filter((order) => order.id === selectedOrder)
        .flatMap((order) => order.orderItems)
    : [];

  const sortedItems = items.sort((a, b) => {
    const nameA = a?.name?.toLowerCase() || '';
    const nameB = b?.name?.toLowerCase() || '';
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });

  const orderPicked = calculateOrderPickedStatus(items);

  const handleIndividualPicked = (itemId: number | null, orderId: string) => {
    const currentItem = items.filter((item) => item.id === itemId)[0];
    const currentPickedStatus = currentItem.picked;
    if (itemId !== null) {
      updatePickedItem({
        itemId,
        orderId,
        currentPickedStatus: !!currentPickedStatus,
      });
    }
  };

  const handleAllPicked = (orderId: string) => {
    const currentPickedStatus = orderPicked === 'picked' ? true : false;
    updatePickedOrder({ orderId, currentPickedStatus });
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  if (data)
    return (
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-4">
        <Card className="md:col-span-4 2xl:col-span-2">
          <CardHeader>
            <CardTitle>
              <div className="flex flex-row justify-between items-center">
                Picking List By Order
              </div>
            </CardTitle>
            <CardDescription className="max-w-lg text-balance leading-relaxed">
              Orders to be picked for the commencing week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="px-2">Customer</TableHead>
                  <TableHead className="hidden sm:table-cell px-2">
                    Order Number
                  </TableHead>
                  <TableHead className="px-2">Delivery Date</TableHead>
                  <TableHead className="px-2">Order Picked</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((order) => (
                  <TableRow
                    className={
                      order.id === selectedOrder ? 'bg-secondary' : 'bg-0'
                    }
                    key={order.id}
                    onClick={() => handleRowClick(order.id, order.notes)}
                  >
                    <TableCell className="p-2">
                      <div className="font-medium">
                        {toTitleCase(order.customerName || '')}
                      </div>
                      {/* <div className="hidden text-sm text-muted-foreground md:inline">
                        {toTitleCase(order.groupName || '') || 'Private'}
                      </div> */}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell p-2">
                      {order.number}
                    </TableCell>
                    <TableCell className="p-2">
                      {order.deliveryDate
                        ? format(parseISO(order.deliveryDate), 'dd-MM-yyyy')
                        : 'N/A'}
                    </TableCell>
                    <TableCell className="p-2">
                      {calculateOrderPickedStatus(order.orderItems) ===
                      'picked' ? (
                        <Badge variant="success">Picked</Badge>
                      ) : calculateOrderPickedStatus(order.orderItems) ===
                        'partial' ? (
                        <Badge variant="warning">Partial</Badge>
                      ) : (
                        <Badge variant="destructive">TBP</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="hidden 2xl:block 2xl:col-span-2">
          <CardHeader className="flex flex-row justify-between">
            <div>
              <CardTitle>
                <div className="flex flex-row justify-between items-center">
                  Items
                </div>
              </CardTitle>
              <CardDescription className="max-w-lg text-balance leading-relaxed">
                Items for Order Number {orderNumber}
              </CardDescription>
            </div>
            {selectedOrder && (
              <div className="flex items-center space-x-2">
                <Switch
                  onCheckedChange={() =>
                    selectedOrder && handleAllPicked(selectedOrder)
                  }
                  checked={orderPicked === 'picked'}
                />
                <Label htmlFor="all-picked">
                  {orderPicked === 'picked'
                    ? 'Unpick All Items'
                    : 'Pick All Items'}
                </Label>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-0 hover:bg-0">
                  <TableHead className="p-1">Item Name</TableHead>
                  <TableHead className="p-1">Quantity</TableHead>
                  <TableHead className="p-1 text-center">Picked</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedOrder ? (
                  sortedItems.map((item) => (
                    <TableRow className="text-sm bg-0 hover:bg-0" key={item.id}>
                      <TableCell className="p-1">
                        {toTitleCase(item.name || '')}
                      </TableCell>
                      <TableCell className="p-1"> {item.quantity}</TableCell>
                      <TableCell className="p-1 text-center">
                        <Switch
                          onCheckedChange={() =>
                            handleIndividualPicked(item.id, selectedOrder)
                          }
                          checked={item.picked || false}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">
                      No order selected
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <ItemsSheet
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
          selectedOrderNotes={selectedOrderNotes}
          orderNumber={orderNumber}
          orderItems={items}
          onAllPicked={handleAllPicked}
          onIndividualPicked={handleIndividualPicked}
          orderPicked={orderPicked}
        />
      </div>
    );
}

export default ListByOrder;
