import { useMemo, useState } from 'react';
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
import { Input } from '@/components/ui/input';
import { CircleUserRoundIcon, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';

function OrderDetailPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: orderItems } = useFetchItemsByOrderId(orderId || '');

  const sortedItems = useMemo(() => {
    const itemsCamelCase = orderItems?.map((item) => ({
      id: item.id,
      name: item.items!.item_name,
      price: item.price,
      quantity: item.quantity,
    }));

    return sortCustomOrder(itemsCamelCase || []);
  }, [orderItems]);

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

  const handleEditDateClick = () => {
    console.log('Edit date clicked');
  };
  const handleEditNotesClick = () => {
    console.log('Edit Notes clicked');
  };
  const handleEditItemsClick = () => {
    console.log('Edit ORder clicked');
  };

  return (
    <div>
      <div className="flex flex-col gap-1">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-2 items-center">
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
            size="icon"
          >
            <Trash2 className="h4- w-4" />
          </Button>
        </div>
        <div className="flex flex-row items-center gap-1">
          <CircleUserRoundIcon />
          <h3>
            <span className="text-muted-foreground">
              {' '}
              {toTitleCase(orderData.customers!.customer_name!)}
            </span>
          </h3>
        </div>
      </div>

      <Separator className="mb-4" />

      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2">
          <h4>
            Delivery Date:
            <span className="text-muted-foreground">
              {' '}
              {format(new Date(orderData.delivery_date!), 'dd MMMM yyyy')}
            </span>
          </h4>
          <Button
            onClick={() => handleEditDateClick()}
            size="xs"
            variant="ghost"
          >
            <Edit />
          </Button>
        </div>
        {orderData.notes && (
          <div className="flex flex-row items-center gap-2">
            <h4>
              Notes: {''}
              <span className="text-muted-foreground">{orderData.notes}</span>
            </h4>
            <Button
              onClick={() => handleEditNotesClick()}
              size="xs"
              variant="ghost"
            >
              <Edit />
            </Button>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 my-4">
        <Card>
          <div className="flex flex-row items-center gap-2 py-4 px-8">
            <CardTitle>Order Items</CardTitle>
            <Button
              onClick={() => handleEditItemsClick()}
              size="xs"
              variant="ghost"
            >
              <Edit />
            </Button>
          </div>
          <CardContent>
            {sortedItems.length !== 0 ? (
              <Table>
                <TableHeader>
                  <TableRow className="text-xs md:text-md hover:bg-0">
                    <TableHead>Item Name</TableHead>
                    <TableHead className="hidden lg:table-cell">
                      <div className="flex flex-col">
                        <span>Customer Price (£)</span>
                        <span className="text-xs font-light">
                          {Math.max(
                            orderData.discount !== null ? orderData.discount : 0
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
                    <TableRow key={item.id} className="hover:bg-0">
                      <TableCell className="font-medium py-1">
                        {toTitleCase(item.name || '')}
                      </TableCell>
                      <TableCell className="py-1 hidden lg:table-cell">
                        {(
                          Number(item.price) *
                          ((100 - (orderData.discount || 0)) / 100)
                        ).toFixed(2)}
                      </TableCell>
                      <TableCell className="py-1 flex flex-row gap-1 items-center">
                        <Input
                          type="text"
                          className="w-1/5 py-0 focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1"
                          value={item.quantity!}
                          onChange={(e) =>
                            updateQuantity(item.id || 0, Number(e.target.value))
                          }
                          min={1}
                        />
                      </TableCell>
                      <TableCell className="py-1 text-right">
                        {(item.price! * item.quantity!).toFixed(2)}
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
                      £{orderData.total!.toFixed(2)}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            ) : (
              <div className="flex justify-center align-center">
                <p className="text-sm">
                  No items in order. Please select a standard order or add a new
                  item
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>DELETE ORDER. Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will remove{' '}
              <span className="font-bold">
                Order Number {orderData.number}{' '}
              </span>
              from current orders and change the status of this order to
              'archived'.
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
