//supabase queries
import { useSearchParams } from 'react-router-dom';

//components
import NewOrderButton from '@/components/orders/NewOrderButton';
//utils
import { OrdersTable } from '@/components/orders/OrdersTable';
import { ordersTableColumns } from '@/components/orders/OrdersTableColumns';
import { useFetchOrders } from '@/hooks/order/useFetchOrders';

function OrdersPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    data: currentOrders,
    isLoading: isCurrentOrdersLoading,
    isError: isCurrentOrdersError,
    error: currentOrdersError,
  } = useFetchOrders({
    status: ['pending', 'ready', 'sent', 'delivered', 'archived'],
    month: searchParams.get('month') ?? undefined,
  });

  return (
    <>
      <div className="flex flex-row gap-4 items-center justify-between">
        <h1>Orders</h1>
        <NewOrderButton />
      </div>

      <div className="grid gap-x-4 gap-y-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div className="container col-span-4 mt-4">
          {isCurrentOrdersLoading ? (
            <div>Orders Loading</div>
          ) : isCurrentOrdersError ? (
            <div>Error fetching Orders: {currentOrdersError.message}</div>
          ) : (
            currentOrders && (
              <OrdersTable
                columns={ordersTableColumns}
                data={currentOrders}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            )
          )}
        </div>
      </div>
    </>
  );
}

export default OrdersPage;
