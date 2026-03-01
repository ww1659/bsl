import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { toTitleCase } from '@/lib/utils';
import type { Order, OrderItem } from '@/schemas';

import { Badge } from '../ui/badge';
import OrdersTableDropdown from './OrdersTableDropdown';

export type { Order, OrderItem };

export const ordersTableColumns: ColumnDef<Order>[] = [
  {
    accessorKey: 'number',
    header: () => {
      return <p>Order Number</p>;
    },
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue('number')}</div>;
    },
  },
  {
    accessorKey: 'customerName',
    header: () => {
      return <p>Customer Name</p>;
    },
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          <p>{toTitleCase(row.getValue('customerName') || '')}</p>
        </div>
      );
    },
  },

  {
    accessorKey: 'groupName',
    header: ({ column }) => {
      return (
        <div className="flex flex-row items-center justify-start gap-1">
          <p>Group</p>
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
          {toTitleCase(row.getValue('groupName') || 'Private Customer')}
        </div>
      );
    },
  },
  {
    accessorKey: 'deliveryDate',
    header: ({ column }) => {
      return (
        <div className="flex flex-row items-center justify-start gap-1">
          <p>Delivery Date</p>
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
          {format(new Date(row.getValue('deliveryDate')), 'MMM d, yyyy')}
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <div className="flex flex-row items-center justify-start gap-1">
          <p>Status</p>
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
      const status = row.getValue('status');
      return (
        <div className="font-medium">
          <Badge
            variant={
              status === 'sent'
                ? 'success'
                : status === 'ready'
                ? 'default'
                : status === 'pending'
                ? 'warning'
                : status === 'archived'
                ? 'destructive'
                : 'secondary'
            }
          >
            {row.getValue('status') === 'archived'
              ? 'Cancelled'
              : toTitleCase(row.getValue('status') || '')}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: 'total',
    header: ({ column }) => {
      return (
        <div className="flex flex-row items-center justify-start gap-1">
          <p>Total (£)</p>
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
          £{(row.getValue('total') as number).toFixed(2)}
        </div>
      );
    },
  },

  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <OrdersTableDropdown
          orderId={row.original.id}
          orderStatus={row.original.status}
        />
      );
    },
  },
];
