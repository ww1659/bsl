import NewOrderButton from "@/components/orders/newOrderButton";
import { useFetchOrders } from "@/hooks/useFetchOrders";

function OrdersPage() {
  const { data, isLoading, isError, error } = useFetchOrders();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  if (data)
    return (
      <>
        <div className="flex flex-row gap-6 items-center">
          <h1>Orders Page</h1>
          <NewOrderButton />
        </div>
        <div className="border-card">
          {data.map((order) => (
            <div className="grid" key={order.id}>
              <h1>{order.number}</h1>
            </div>
          ))}
        </div>
      </>
    );
}

export default OrdersPage;
