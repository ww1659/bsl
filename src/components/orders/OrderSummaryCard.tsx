import type { OrderItem, OrderStatus } from '@/schemas';
type OrderSummaryCard = {
  currentOrderItems: OrderItem[];
  date: Date | undefined;
  customerName: string | null;
  customerDiscount: number | null;
  customerId: string | null;
  groupId: string | null;
  orderNotes: string | '';
};

//supabase hooks
import { format } from 'date-fns';
import { useMemo } from 'react';

//ui
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useFetchGroupById } from '@/hooks/group/useFetchGroupById';
import { useCreateOrder } from '@/hooks/order/useCreateOrder';
//utils
import { sortCustomOrder, toTitleCase } from '@/lib/utils';

import LoadingWheel from '../LoadingWheel';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

function OrderSummaryCard({
  currentOrderItems,
  date,
  customerName,
  customerDiscount,
  customerId,
  groupId,
  orderNotes,
}: OrderSummaryCard) {
  const { mutate: createOrder } = useCreateOrder();
  const { data, isLoading } = useFetchGroupById(groupId || '');

  const groupDiscount = data?.standardDiscount || 0;
  const formattedDate = format(date || '', 'EEEE do MMMM');

  const orderTotal =
    currentOrderItems.reduce((total, item) => {
      const itemPrice = item.price || 0;
      const quantity = item.quantity;
      return total + itemPrice * quantity!;
    }, 0) *
    ((100 - Math.max(customerDiscount || 0, groupDiscount)) / 100);

  const handleOrderConfirmation = (
    currentOrderItems: OrderItem[],
    customerDiscount: number | null,
    date: Date | undefined,
    customerId: string | null,
    groupId: string | null
  ) => {
    const orderData = {
      total: orderTotal,
      delivery_date: date?.toISOString(),
      status: 'pending' as OrderStatus,
      customer_id: customerId,
      discount: customerDiscount,
      notes: orderNotes,
      group_id: groupId,
    };
    const orderItems = currentOrderItems.map((item) => {
      return {
        item_id: item.id,
        quantity: item.quantity,
        price: item.price,
      };
    });

    createOrder({ orderData, orderItems });
  };

  const sortedItems = useMemo(
    () => sortCustomOrder(currentOrderItems),
    [currentOrderItems]
  );

  if (isLoading) return <LoadingWheel text="Order Summary Loading" />;

  return (
    <div className="grid lg:grid-cols-2 gap-1">
      <Card className="flex flex-col justify-between">
        <div>
          <CardHeader>
            <div className="flex flex-row justify-between">
              <div>
                <CardTitle>Confirm Order</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-2">
              Customer Name:{' '}
              <span className="font-bold">
                {toTitleCase(customerName || '')}
              </span>
            </p>
            <p className="text-sm mb-4">
              Delivery Date: <span className="font-bold">{formattedDate}</span>
            </p>
            <div className="border rounded-md p-2">
              <div className="grid grid-cols-3 mb-1">
                <p className="text-sm font-bold">Item</p>
                <p className="text-sm font-bold">Quantity</p>
                <p className="text-sm font-bold">Price</p>
              </div>
              {sortedItems.map((item) => (
                <div key={item.id} className="grid grid-cols-3 gap-2">
                  <p className="text-sm">{toTitleCase(item.name || '')}</p>
                  <p className="text-sm"> x{item.quantity}</p>
                  <p className="text-sm">
                    {(
                      Number(item.price) *
                      item.quantity! *
                      ((100 - Math.max(customerDiscount || 0, groupDiscount)) /
                        100)
                    ).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </div>
      </Card>
      <Card className="flex flex-col justify-between border-none bg-muted/40">
        <div className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-right">Total</CardTitle>
          </CardHeader>
          <CardContent className="text-right">
            <div className="flex flex-row gap-1 justify-end">
              <p className="text-base">Item Costs:</p>
              <p className="text-base font-bold">
                £{((orderTotal * 5) / 6).toFixed(2)}
              </p>
            </div>
            <div className="flex flex-row gap-1 justify-end mb-2 text-muted-foreground text-xs">
              <p>Customer Discount</p>
              <p>{customerDiscount}%</p>
            </div>
            <div className="flex flex-row gap-1 justify-end">
              <p className="text-base">VAT:</p>
              <p className="text-base font-bold">
                £{(orderTotal / 6).toFixed(2)}
              </p>
            </div>
            <div className="flex flex-row gap-1 justify-end mb-2 text-muted-foreground text-xs">
              <p>VAT charged at 20%</p>
            </div>
            <div className="flex flex-row gap-1 justify-end mb-2">
              <p className="text-base">Total inc VAT:</p>
              <p className="text-base font-bold">£{orderTotal.toFixed(2)}</p>
            </div>
            <Separator />
            <div className="mt-2">
              <p className="font-bold">Additional Notes</p>
              <p className="italic text-muted-foreground text-sm">
                {orderNotes}
              </p>
            </div>
          </CardContent>
        </div>

        <div className="flex flex-col gap-2">
          <CardFooter className="justify-end pb-0">
            <div className="flex flex-col items-end">
              <h3 className="text-muted-foreground">Order Total</h3>
              <h3>£{orderTotal.toFixed(2)}</h3>
            </div>
          </CardFooter>
          <Button
            className="mx-6"
            onClick={() =>
              handleOrderConfirmation(
                currentOrderItems,
                customerDiscount,
                date,
                customerId,
                groupId
              )
            }
          >
            Confirm Order
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default OrderSummaryCard;
