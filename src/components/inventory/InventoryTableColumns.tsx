import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { toTitleCase } from '@/lib/utils';
import UpdateItemDropdown from './UpdateItemDropdown';
import { OrderItem } from '@/types';

export const inventoryTableColumns: ColumnDef<OrderItem>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <div className="flex flex-row items-center justify-start gap-1">
          <p>Item Name</p>
          <Button
            size="xs"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          {toTitleCase(row.getValue('name') || '')}
        </div>
      );
    },
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <div className="flex flex-row items-center justify-start gap-1">
          <div className="flex flex-col">
            <span>List Price (£)</span>
            <span className="text-xs font-light">VAT included</span>
          </div>
          <Button
            size="xs"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          <p>{Number(row.getValue('price')).toFixed(2)}</p>
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <UpdateItemDropdown row={row.original} />;
    },
  },
];
