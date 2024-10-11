//supabase hooks
import { useFetchOrders } from "@/hooks/useFetchOrders";

function PickingListPage() {
  const { data, isLoading, isError, error } = useFetchOrders();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  if (data)
    return (
      <div>
        <h1>Picking List</h1>
        {data.map((order) => (
          <div className="grid" key={order.id}>
            <p>{order.delivery_date}</p>
          </div>
        ))}
      </div>
    );
}

export default PickingListPage;
