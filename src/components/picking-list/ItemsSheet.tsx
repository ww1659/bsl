type OrderItem = {
  id: number | null;
  itemName: string | null;
  price: number | null;
  quantity: number | null;
  picked: boolean | null;
};

type ItemsSheetProps = {
  selectedOrder: string | null;
  setSelectedOrder: (orderId: string | null) => void;
  orderNumber: number | null | undefined;
  orderItems: OrderItem[];
  onIndividualPicked: (itemId: number | null, orderId: string) => void;
  onAllPicked: (orderId: string) => void;
  orderPicked: string | null;
};

import { useEffect, useState } from "react";

//components
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

//utils
import { toTitleCase } from "@/lib/utils";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

function ItemsSheet({
  selectedOrder,
  setSelectedOrder,
  orderNumber,
  orderItems,
  onAllPicked,
  onIndividualPicked,
  orderPicked,
}: ItemsSheetProps) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1536);
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

  const sortedItems = orderItems.sort((a, b) => {
    const nameA = a?.itemName?.toLowerCase() || "";
    const nameB = b?.itemName?.toLowerCase() || "";
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });

  const handleSheetOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setSelectedOrder(null);
    }
  };

  return (
    <div>
      <Sheet open={open} onOpenChange={handleSheetOpenChange}>
        <SheetContent
          className="block 2xl:hidden"
          aria-description="Items List"
        >
          <SheetHeader>
            <SheetTitle>Order Number: {orderNumber}</SheetTitle>
          </SheetHeader>
          <SheetDescription>
            Items to be picked for this order shown below. Click
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
              {sortedItems.map((item) => (
                <TableRow className="text-xs bg-0 hover:bg-0" key={item.id}>
                  <TableCell className="p-1">
                    {toTitleCase(item.itemName || "")}
                  </TableCell>
                  <TableCell className="p-1"> {item.quantity}</TableCell>
                  <TableCell className="p-1">
                    <Switch
                      onCheckedChange={() =>
                        selectedOrder &&
                        onIndividualPicked(item.id, selectedOrder)
                      }
                      checked={item.picked || false}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <SheetFooter>
            <div className="flex flex-col gap-2 w-full items-center mt-5">
              <div className="flex items-center gap-2">
                <Label htmlFor="all-picked">
                  {orderPicked === "picked"
                    ? "Unpick All Items"
                    : "Pick All Items"}
                </Label>
                <Switch
                  onCheckedChange={() =>
                    selectedOrder && onAllPicked(selectedOrder)
                  }
                  checked={orderPicked === "picked"}
                />
              </div>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default ItemsSheet;
