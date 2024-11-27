import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

import { toTitleCase } from "@/lib/utils";
import UpdateItemDropdown from "./UpdateItemDropdown";

export type Item = {
  id: number;
  name: string | null;
  price: number | null;
  stock: number | null;
  loanedOut: number | null;
};

export const inventoryTableColumns: ColumnDef<Item>[] = [
  {
    accessorKey: "name",
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
          {toTitleCase(row.getValue("name") || "")}
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
  {
    id: "actions",
    cell: ({ row }) => {
      return <UpdateItemDropdown row={row.original} />;
    },
  },
];