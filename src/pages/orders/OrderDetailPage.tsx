import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useFetchOrderById } from '@/hooks/fetch/useFetchOrderById';
import { sortCustomOrder, toSentenceCase, toTitleCase } from '@/lib/utils';
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
import { Edit, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import DeliveryDatePicker from '@/components/orders/DeliveryDatePicker';
import { Textarea } from '@/components/ui/textarea';
import { OrderItem } from '@/types';
import AddItemsDropdown from '@/components/orders/AddItemsDropdown';
import { useUpdateOrder } from '@/hooks/update/useUpdateOrder';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

function OrderDetailPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState<Date | undefined>();
  const [orderNotes, setOrderNotes] = useState<string | undefined>();
  const [currentItems, setCurrentItems] = useState<OrderItem[]>([]);
  const [originalItems, setOriginalItems] = useState<OrderItem[]>([]);

  const { toast } = useToast();
  const { data: orderItems } = useFetchItemsByOrderId(orderId || '');
  const {
    data: orderData,
    isLoading,
    isError,
    error,
  } = useFetchOrderById(orderId || '');
  const updateOrder = useUpdateOrder();

  const sortedItems = useMemo(() => {
    const itemsCamelCase = orderItems?.map((item) => ({
      id: item.item_id,
      name: item.items!.item_name,
      price: item.price,
      quantity: item.quantity,
    }));

    return sortCustomOrder(itemsCamelCase || []);
  }, [orderItems]);

  const navigate = useNavigate();
  const updateOrderStatus = useUpdateOrderStatus();

  useEffect(() => {
    if (orderData) {
      setDeliveryDate(new Date(orderData.delivery_date!));
      setOrderNotes(orderData.notes || '');
    }
  }, [orderData]);

  useEffect(() => {
    if (sortedItems) {
      setOriginalItems(sortedItems);
      setCurrentItems(sortedItems);
    }
  }, [sortedItems]);

  const calculateTotal = (items: OrderItem[], discount: number = 0) => {
    return (
      items.reduce((sum, item) => {
        const itemTotal = item.price! * item.quantity!;
        return sum + itemTotal;
      }, 0) *
      ((100 - discount) / 100)
    );
  };

  const currentTotal = useMemo(() => {
    return calculateTotal(currentItems, orderData?.discount || 0);
  }, [currentItems, orderData?.discount]);

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

  const handleEditOrderClick = () => {
    setIsEditing((prev) => !prev);
  };

  const updateQuantity = (itemId: number, newQuantity: number) => {
    setCurrentItems((prevItems) =>
      prevItems.map((orderItem) =>
        orderItem.id === itemId
          ? { ...orderItem, quantity: newQuantity > 0 ? newQuantity : 1 }
          : orderItem
      )
    );
  };

  const removeItem = (itemId: number) => {
    setCurrentItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemId)
    );
  };

  const handleSave = () => {
    updateOrder.mutate(
      {
        orderId: orderId!,
        items: currentItems,
        notes: orderNotes,
        deliveryDate: deliveryDate,
      },
      {
        onSuccess: () => {
          toast({
            title: 'Success',
            description: `Order #${orderData.number} updated successfully`,
            duration: 5000,
          });
          setIsEditing(false);
        },
        onError: (error) => {
          toast({
            title: 'Error',
            description: 'Failed to update order: ' + error.message,
            duration: 5000,
          });
        },
      }
    );
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentItems(originalItems);
    setDeliveryDate(new Date(orderData.delivery_date!));
    setOrderNotes(orderData.notes || undefined);
  };

  return (
    <div>
      <div className="flex flex-col gap-1">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-2 items-center">
            <h1>Order #{orderData.number}</h1>
          </div>
          {isEditing ? (
            <div className="flex flex-row gap-2">
              <Button
                disabled={!isEditing}
                onClick={() => handleCancel()}
                variant="secondary"
              >
                Cancel
              </Button>
              <Button disabled={!isEditing} onClick={() => handleSave()}>
                Save Changes
              </Button>
            </div>
          ) : (
            <div className="flex flex-row gap-2">
              <Button
                disabled={orderData.status !== 'pending' || isEditing}
                onClick={() => handleEditOrderClick()}
                size="icon"
                variant="outline"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                disabled={orderData.status !== 'pending' || isEditing}
                onClick={() => handleOpenDialog()}
                size="icon"
                variant="outline"
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          )}
        </div>
        <div className="flex flex-row items-center gap-2">
          {orderData.status && (
            <Badge
              className="w-fit"
              variant={
                orderData.status === 'sent'
                  ? 'success'
                  : orderData.status === 'ready'
                  ? 'default'
                  : orderData.status === 'pending'
                  ? 'warning'
                  : orderData.status === 'archived'
                  ? 'destructive'
                  : 'secondary'
              }
            >
              {toSentenceCase(orderData.status!)}
            </Badge>
          )}
          <h3 className="text-muted-foreground">
            {toTitleCase(orderData.customers!.customer_name!)}
          </h3>
        </div>
      </div>

      <Separator className="mb-4 mt-2" />

      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row gap-2">
            <h3>Delivery Date:</h3>
            <h3 className={isEditing ? 'text-normal' : 'text-muted-foreground'}>
              {format(
                deliveryDate || new Date(orderData.delivery_date!),
                'd MMMM, yyyy'
              )}
            </h3>
          </div>

          <DeliveryDatePicker
            date={deliveryDate}
            setDate={setDeliveryDate}
            disabled={!isEditing}
          />
        </div>

        <div className="flex flex-row gap-2">
          <Textarea
            className={`${isEditing ? 'bg-card' : 'bg-secondary'}`}
            disabled={!isEditing}
            placeholder="Add additional notes here"
            value={orderNotes}
            onChange={(e) => setOrderNotes(e.target.value)}
          />
        </div>
        <Separator className="my-4" />
        <div className="flex flex row items-center gap-2 justify-between">
          <div className="flex flex-row items-center gap-2">
            <h3>Order Items</h3>
          </div>
        </div>

        <Card className={`bg-card ${!isEditing && 'bg-secondary'}`}>
          <div className="flex flex-row items-center gap-2 py-4 px-8 justify-between">
            <div>
              <AddItemsDropdown
                currentOrderItems={currentItems}
                setCurrentOrderItems={setCurrentItems}
                disabled={!isEditing}
              />
            </div>
          </div>
          <CardContent>
            {currentItems.length !== 0 ? (
              <Table>
                <TableHeader>
                  <TableRow className="text-xs md:text-md hover:bg-0">
                    <TableHead>Item Name</TableHead>
                    <TableHead className="hidden lg:table-cell">
                      <div className="flex flex-col">
                        <span>Customer Price (£)</span>
                        <span className="text-xs font-light">
                          {orderData.discount !== null ? orderData.discount : 0}
                          % discount
                        </span>
                      </div>
                    </TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="text-right">Total (£)</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-xs md:text-sm">
                  {currentItems?.map((item) => (
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
                        <Button
                          disabled={(item.quantity ?? 1) <= 1 || !isEditing}
                          variant="outline"
                          size="sm"
                          className="h-10"
                          onClick={() =>
                            updateQuantity(
                              item.id || 0,
                              (item.quantity ?? 1) - 1
                            )
                          }
                        >
                          -
                        </Button>
                        <Input
                          disabled={!isEditing}
                          type="text"
                          className="w-1/5 py-0 focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1"
                          value={item.quantity!}
                          onChange={(e) =>
                            updateQuantity(item.id || 0, Number(e.target.value))
                          }
                          min={1}
                        />
                        <Button
                          disabled={!isEditing}
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
                        {(item.price! * item.quantity!).toFixed(2)}
                      </TableCell>
                      <TableCell className="py-1 text-right">
                        <Button
                          disabled={!isEditing}
                          onClick={() => removeItem(item.id!)}
                          variant="ghost"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter
                  className={`${
                    isEditing ? 'bg-card' : 'bg-secondary'
                  } hover:bg-0`}
                >
                  <TableRow>
                    <TableCell colSpan={3} className="text-lg">
                      Total
                    </TableCell>
                    <TableCell colSpan={1} className="text-right text-lg">
                      £{currentTotal.toFixed(2) || orderData.total!.toFixed(2)}
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
