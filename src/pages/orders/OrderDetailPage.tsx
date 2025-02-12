import { useMemo, useState } from 'react';
import OrderItemsTable from '@/components/orders/OrderItemsTable';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useFetchOrderById } from '@/hooks/fetch/useFetchOrderById';
import { sortCustomOrder, toTitleCase } from '@/lib/utils';
import { format } from 'date-fns';
import { useParams, useNavigate } from 'react-router-dom';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useUpdateOrderStatus } from '@/hooks/update/useUpdateOrderStatus';
import { Badge } from '@/components/ui/badge';

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useFetchItemsByOrderId } from '@/hooks/fetch/useFetchItemsByOrderId';

function OrderDetailPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: orderItems } = useFetchItemsByOrderId(orderId || '');

  const navigate = useNavigate();
  const updateOrderStatus = useUpdateOrderStatus();

  const {
    data: orderData,
    isLoading,
    isError,
    error,
  } = useFetchOrderById(orderId || '');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  if (!orderData) {
    return <div>No data found for this order</div>;
  }

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleDeleteOrderClick = () => {
    updateOrderStatus.mutate(
      {
        orderId: orderId || '',
        newStatus: 'archived',
      },
      {
        onSuccess: () => {
          setDialogOpen(false);
          navigate('/orders');
        },
        onError: (error) => {
          console.error('Failed to archive order:', error);
        },
      }
    );
  };

  const sortedItems = useMemo(
    () => sortCustomOrder(orderItems || []),
    [orderItems]
  );
  return (
    <div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-4 items-center">
          <h1>Order Number {orderData.number}</h1>
          {orderData.status === 'archived' && (
            <Badge className="w-fit" variant="destructive">
              Archived
            </Badge>
          )}
        </div>
        <Button
          disabled={orderData.status !== 'pending'}
          onClick={() => handleOpenDialog()}
        >
          Delete Order
        </Button>
      </div>
      <Separator className="my-2" />

      <p>
        <span className="font-bold">Delivery Date: </span>
        {orderData.delivery_date
          ? format(new Date(orderData.delivery_date), 'do MMMM yyyy')
          : 'No delivery date'}
      </p>
      <p>
        <span className="font-bold">Customer: </span>
        {toTitleCase(orderData.customers?.customer_name || '')}
      </p>
      {orderData.notes && (
        <p>
          <span className="font-bold">Notes: </span>
          {toTitleCase(orderData.notes || '')}
        </p>
      )}

      {sortedItems.length !== 0 ? (
        <Table>
          <TableHeader>
            <TableRow className="text-xs md:text-md">
              <TableHead>Item Name</TableHead>
              <TableHead className="hidden lg:table-cell">
                <div className="flex flex-col">
                  <span>Customer Price (£)</span>
                  <span className="text-xs font-light">
                    {Math.max(
                      customerDiscount !== null ? customerDiscount : 0,
                      groupDiscount || 0
                    )}
                    % discount
                  </span>
                </div>
              </TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead className="text-right">Total (£)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-xs md:text-sm">
            {sortedItems?.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium py-1">
                  {toTitleCase(item.name || '')}
                </TableCell>
                <TableCell className="py-1 hidden lg:table-cell">
                  {item.price
                    ? (
                        Number(item.price) *
                        ((100 -
                          Math.max(customerDiscount || 0, groupDiscount)) /
                          100)
                      ).toFixed(2)
                    : item.price?.toFixed(2)}
                </TableCell>
                <TableCell className="py-1 flex flex-row gap-1 items-center">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-10"
                    onClick={() =>
                      updateQuantity(item.id || 0, (item.quantity ?? 1) - 1)
                    }
                    disabled={(item.quantity ?? 1) <= 1}
                  >
                    -
                  </Button>
                  <Input
                    type="text"
                    className="w-1/5 py-0 focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1"
                    value={item.quantity!}
                    onChange={(e) =>
                      updateQuantity(item.id || 0, Number(e.target.value))
                    }
                    min={1}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-10"
                    onClick={() =>
                      updateQuantity(item.id || 0, item.quantity! + 1)
                    }
                  >
                    +
                  </Button>
                </TableCell>
                <TableCell className="py-1 text-right">
                  {item.price
                    ? (
                        item.quantity! *
                        item.price *
                        ((100 -
                          Math.max(customerDiscount || 0, groupDiscount)) /
                          100)
                      ).toFixed(2)
                    : ''}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow className="bg-secondary">
              <TableCell colSpan={3} className="text-lg">
                Total
              </TableCell>
              <TableCell colSpan={1} className="text-right text-lg">
                £{orderTotal.toFixed(2)}
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      ) : (
        <div className="flex justify-center align-center">
          <p className="text-sm">
            No items in order. Please select a standard order or add a new item
          </p>
        </div>
      )}

      {/* <div className="mt-3">
        <h3 className="mb-2">Order Details</h3>
        <div className="border rounded-lg p-2">
          <OrderItemsTable
            orderId={orderId || ''}
            groupDiscount={orderData.groups?.standard_discount || 0}
            customerDiscount={orderData.customers?.discount || 0}
          />
        </div>
      </div> */}
      <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will remove{' '}
              <span className="font-bold">
                Order Number {orderData.number}{' '}
              </span>
              from current orders and place it in archived orders.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-row justify-between">
            <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleDeleteOrderClick} variant="destructive">
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default OrderDetailPage;
