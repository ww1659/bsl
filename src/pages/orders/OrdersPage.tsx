import NewOrderButton from "@/components/orders/NewOrderButton";
import OrderCard from "@/components/orders/OrderCard";
import { useFetchOrders } from "@/hooks/useFetchOrders";

function OrdersPage() {
  const { data, isLoading, isError, error } = useFetchOrders();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  if (data)
    return (
      <>
        <div className="flex flex-row justify-between gap-6 items-center">
          <h1>Orders Page</h1>
          <NewOrderButton />
        </div>
        <div className="">
          <h2>Recent Orders</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 my-2">
            {data.map((order) => (
              <div className="grid" key={order.id}>
                <OrderCard
                  orderId={order.id}
                  orderNumber={order.number}
                  deliveryDate={order.delivery_date}
                  orderStatus={order.status}
                  orderTotal={order.total}
                  customerName={order.customers?.customer_name}
                  groupName={order.groups?.group_name}
                />
              </div>
            ))}
          </div>
        </div>
      </>
    );
}

export default OrdersPage;
