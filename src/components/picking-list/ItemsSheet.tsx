type Items = {
  items: {
    id: number;
    item_name: string | null;
    price: number | null;
  } | null;
  picked: boolean | null;
  item_id: number | null;
  quantity: number | null;
};

type ItemsSheetProps = {
  selectedOrder: string | null;
  setSelectedOrder: (orderId: string | null) => void;
  orderNumber: number | null | undefined;
  orderData: {
    id: string;
    number: number;
    delivery_date: string | null;
    status: "pending" | "paid" | "sent" | "overdue" | null;
    notes: string | null;
    group_id: string | null;
    customers: {
      customer_name: string | null;
    } | null;
    groups: {
      group_name: string | null;
    } | null;
    order_items: Items[];
  }[];
};

import { useEffect, useState } from "react";

//conponents
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";

//utils
import { calculateOrderPickedStatus, toTitleCase } from "@/lib/utils";
import { useUpdatePickedOrder } from "@/hooks/update/useUpdatePickedOrder";
import { Check, X } from "lucide-react";

function ItemsSheet({
  selectedOrder,
  setSelectedOrder,
  orderNumber,
  orderData,
}: ItemsSheetProps) {
  const { mutate: updatePickedOrder } = useUpdatePickedOrder();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1280);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (isSmallScreen && selectedOrder !== null) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [isSmallScreen, selectedOrder]);

  const items = orderData
    .filter((order) => order.id === selectedOrder)
    .flatMap((order) => order.order_items);

  const handleSheetOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setSelectedOrder(null);
    }
  };

  const orderPicked = calculateOrderPickedStatus(items);

  const handlePicked = () => {
    const orderId = orderData[0].id;
    const currentPickedStatus = orderPicked === "picked" ? true : false;
    updatePickedOrder({ orderId, currentPickedStatus });
  };

  return (
    <div>
      <Sheet open={open} onOpenChange={handleSheetOpenChange}>
        <SheetContent className="block xl:hidden" aria-description="Items List">
          <SheetHeader>
            <SheetTitle>Order Number: {orderNumber}</SheetTitle>
          </SheetHeader>
          <SheetDescription>
            Items to be picked for this order shown below. Click{" "}
            <span className="font-bold">Picked</span> when you have prepared the
            order
          </SheetDescription>
          <Table className="my-4">
            <TableHeader>
              <TableRow className="bg-0 hover:bg-0 text-xs">
                <TableHead className="p-1 h-6">Item Name</TableHead>
                <TableHead className="p-1 h-6">Quantity</TableHead>
                <TableHead className="p-1 h-6">Picked</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow
                  className="text-xs bg-0 hover:bg-0"
                  key={item.item_id}
                >
                  <TableCell className="p-1">
                    {toTitleCase(item.items?.item_name || "")}
                  </TableCell>
                  <TableCell className="p-1"> {item.quantity}</TableCell>
                  <TableCell className="p-1">
                    {item.picked ? (
                      <Check className="h-4 w-4 text-green-800" />
                    ) : (
                      <X className="h-4 w-4 text-destructive" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <SheetFooter>
            <div className="flex flex-col gap-2 w-full">
              <Button size="sm" onClick={() => handlePicked()}>
                Picked
              </Button>
              <p className="text-xs text-center">
                Click here when you are done
              </p>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default ItemsSheet;
