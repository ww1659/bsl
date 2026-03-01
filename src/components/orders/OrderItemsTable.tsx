type OrderItemsTableProps = {
  orderId: string;
  groupDiscount: number;
  customerDiscount: number;
};

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useFetchItemsByOrderId } from '@/hooks/item/useFetchItemsByOrderId'
import { toTitleCase } from '@/lib/utils'

import { Separator } from '../ui/separator'

function OrderItemsTable({
  orderId,
  groupDiscount,
  customerDiscount,
}: OrderItemsTableProps) {
  const { data, isLoading, isError, error } = useFetchItemsByOrderId(
    orderId || ''
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error?.message}</div>
  }

  const orderTotal =
    (data ?? []).reduce((total, item) => {
      const itemPrice = item.price || 0
      const quantity = item.quantity
      return total + itemPrice * (quantity || 0)
    }, 0) *
    ((100 - Math.max(customerDiscount || 0, groupDiscount)) / 100)

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data &&
            data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium py-1">
                  {toTitleCase(item.items?.item_name || '')}
                </TableCell>
                <TableCell className="py-1">{item.quantity}</TableCell>
                <TableCell className="text-right py-1">
                  £{item.price?.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Card className="flex flex-col justify-between border-none bg-0 shadow-none">
        <div>
          <CardHeader>
            <CardTitle className="text-right">Total</CardTitle>
          </CardHeader>
          <CardContent className="text-right border-0">
            <div className="flex flex-row gap-1 justify-end">
              <p className="text-base">Item Costs</p>
              <p className="text-base font-bold">£{orderTotal.toFixed(2)}</p>
            </div>
            <div className="flex flex-row gap-1 justify-end mb-2 text-muted-foreground text-xs">
              <p>Customer Discount</p>
              <p>{customerDiscount}%</p>
            </div>
            <div className="flex flex-row gap-1 justify-end">
              <p className="text-base">VAT</p>
              <p className="text-base font-bold">
                £{(orderTotal * 0.2).toFixed(2)}
              </p>
            </div>
            <div className="flex flex-row gap-1 justify-end mb-2 text-muted-foreground text-xs">
              <p>VAT charged at 20%</p>
            </div>
            <div className="flex flex-row gap-1 justify-end mb-2">
              <p className="text-base">Total inc VAT</p>
              <p className="text-base font-bold">
                £{(orderTotal * 1.2).toFixed(2)}
              </p>
            </div>
            <Separator />
          </CardContent>
        </div>
        <CardFooter className="justify-end pb-0">
          <div className="flex flex-col items-end">
            <p className="text-muted-foreground">Order Total</p>
            <h3>£{(orderTotal * 1.2).toFixed(2)}</h3>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default OrderItemsTable
