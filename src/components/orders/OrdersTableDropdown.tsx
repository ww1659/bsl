type OrdersTableDropdownProps = {
  orderId: string;
  orderStatus: 'pending' | 'ready' | 'sent' | 'delivered' | 'archived' | null;
};

import { ListOrderedIcon, MoreHorizontal, SquareCheckBig } from 'lucide-react';
import { Link } from 'react-router-dom';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUpdateOrderStatus } from '@/hooks/order/useUpdateOrderStatus';

import { Button } from '../ui/button';

function OrdersTableDropdown({
  orderId,
  orderStatus,
}: OrdersTableDropdownProps) {
  const updateOrderStatus = useUpdateOrderStatus();
  const handleSentClick = () => {
    updateOrderStatus.mutate({ orderId, newStatus: 'sent' });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to={`/orders/${orderId}`}>
            <div className="flex flex-row items-center gap-2">
              <ListOrderedIcon className="h-4 w-4" />
              <p>View Order</p>
            </div>
          </Link>
        </DropdownMenuItem>
        {/* <DropdownMenuItem>
          <div className="flex flex-row items-center gap-2">
            <NotebookTabs className="h-4 w-4" />
            <p>View Notes</p>
          </div>
        </DropdownMenuItem> */}
        <DropdownMenuItem
          disabled={
            orderStatus === 'archived' ||
            orderStatus === 'sent' ||
            orderStatus === 'pending'
          }
          onClick={() => handleSentClick()}
        >
          <div className="flex flex-row items-center gap-2">
            <SquareCheckBig className="h-4 w-4" />
            {orderStatus === 'sent' ? <p>Sent!</p> : <p>Mark as Sent</p>}
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default OrdersTableDropdown;
