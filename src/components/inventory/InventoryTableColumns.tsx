import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toTitleCase } from "@/lib/utils";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export type Item = {
  item_name: string | null;
  price: number | null;
  stock: number | null;
  loaned_out: number | null;
};

const handleItemUpdate = () => {
  console.log("Item updated");
};

export const inventoryTableColumns: ColumnDef<Item>[] = [
  {
    accessorKey: "item_name",
    header: ({ column }) => {
      return (
        <div className="flex flex-row items-center justify-start gap-1">
          <p>Item Name</p>
          <Button
            size="xs"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          {toTitleCase(row.getValue("item_name") || "")}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <div className="flex flex-row items-center justify-start gap-1">
          <p>List Price (£)</p>
          <Button
            size="xs"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          <p>{Number(row.getValue("price")).toFixed(2)}</p>
        </div>
      );
    },
  },
  // {
  //   accessorKey: "stock",
  //   header: () => <div>Stock</div>,
  //   cell: ({ row }) => {
  //     return (
  //       <div className="font-medium">
  //         <p>{row.getValue("stock")}</p>
  //       </div>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "loaned_out",
  //   header: () => <div>Loaned Out</div>,
  //   cell: ({ row }) => {
  //     return <div className="font-medium">{row.getValue("loaned_out")}</div>;
  //   },
  // },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Update Item</SheetTitle>
              <SheetDescription>
                Update the item details for{" "}
                {toTitleCase(row.original.item_name || "")}. Click Save when you
                are done.
              </SheetDescription>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="itemName" className="text-right">
                    Item Name
                  </Label>
                  <Input
                    id="itemName"
                    defaultValue={toTitleCase(row.original.item_name || "")}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                    Price (£)
                  </Label>
                  <Input
                    id="price"
                    defaultValue={row.original.price?.toString()}
                    className="col-span-3"
                  />
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit" onClick={() => handleItemUpdate()}>
                    Save changes
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      );
    },
  },
];
