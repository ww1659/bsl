import { OrderItem } from "@/types";
type OrderSummaryCard = {
  currentOrderItems: OrderItem[];
  date: Date | undefined;
  customerName: string | null;
  customerDiscount: number | null;
};

//redux

//supabase hooks

//ui
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";

//components

//utils
import { toTitleCase } from "@/lib/utils";
import { format } from "date-fns";
import { Separator } from "../ui/separator";

function OrderSummaryCard({
  currentOrderItems,
  date,
  customerName,
  customerDiscount,
}: OrderSummaryCard) {
  const formattedDate = format(date || "", "EEEE do MMMM");

  const orderTotal =
    currentOrderItems.reduce((total, item) => {
      const itemPrice = item.items?.price || 0;
      const quantity = item.quantity;
      return total + itemPrice * quantity;
    }, 0) *
    ((100 - (customerDiscount || 0)) / 100);

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      <Card className="flex flex-col justify-between">
        <div>
          <CardHeader>
            <div className="flex flex-row justify-between">
              <div>
                <CardTitle>Details</CardTitle>
                <CardDescription>View and Update</CardDescription>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => console.log("Boom")}
              >
                Edit
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-2">
              Customer Name:{" "}
              <span className="font-bold">
                {toTitleCase(customerName || "")}
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
              {currentOrderItems.map((item) => (
                <div key={item.items?.id} className="grid grid-cols-3">
                  <p className="text-sm">
                    {toTitleCase(item.items?.item_name || "")}
                  </p>
                  <p className="text-sm"> x{item.quantity}</p>
                  <p className="text-sm">
                    £{(Number(item.items?.price) * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </div>
      </Card>
      <Card className="flex flex-col justify-between border-none bg-muted/40">
        <div>
          <CardHeader>
            <CardTitle className="text-right">Total</CardTitle>
          </CardHeader>
          <CardContent className="text-right">
            <div className="flex flex-row gap-1 justify-end">
              <p className="text-base">Item Costs</p>
              <p className="text-base font-bold">£{orderTotal}</p>
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
        <CardFooter className="justify-end">
          <div className="flex flex-col items-end">
            <p className="text-muted-foreground">Order Total</p>
            <h3>£{(orderTotal * 1.2).toFixed(2)}</h3>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default OrderSummaryCard;
