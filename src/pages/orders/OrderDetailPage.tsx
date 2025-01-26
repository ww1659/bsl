import { useState } from 'react';
import OrderItemsTable from '@/components/orders/OrderItemsTable';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useFetchOrderById } from '@/hooks/fetch/useFetchOrderById';
import { toTitleCase } from '@/lib/utils';
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

function OrderDetailPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const [dialogOpen, setDialogOpen] = useState(false);

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
          {toTitleCase(orderData.customers?.customer_name || '')}
        </p>
      )}

      <div className="mt-3">
        <h3 className="mb-2">Order Details</h3>
        <div className="border rounded-lg p-2">
          <OrderItemsTable
            orderId={orderId || ''}
            groupDiscount={orderData.groups?.standard_discount || 0}
            customerDiscount={orderData.customers?.discount || 0}
          />
        </div>
      </div>
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
