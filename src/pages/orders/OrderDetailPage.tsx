import OrderItemsTable from "@/components/orders/OrderItemsTable";
import { Separator } from "@/components/ui/separator";
import { useFetchOrderById } from "@/hooks/fetch/useFetchOrderById";
import { toTitleCase } from "@/lib/utils";
import { format } from "date-fns";
import { useParams } from "react-router-dom";

type OrderDetailPageProps = {};

function OrderDetailPage({}: OrderDetailPageProps) {
  const { orderId } = useParams<{ orderId: string }>();

  const {
    data: orderData,
    isLoading,
    isError,
    error,
  } = useFetchOrderById(orderId || "");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  if (!orderData) {
    return <div>No data found for this order</div>;
  }

  return (
    <div>
      <h1>Order Number {orderData.number}</h1>
      <Separator className="my-2" />
      <p>
        <span className="font-bold">Delivery Date: </span>
        {orderData.delivery_date
          ? format(new Date(orderData.delivery_date), "do MMMM yyyy")
          : "No delivery date"}
      </p>
      <p>
        <span className="font-bold">Customer: </span>
        {toTitleCase(orderData.customers?.customer_name || "")}
      </p>

      <div className="mt-3">
        <h3 className="mb-2">Order Details</h3>
        <div className="border rounded-lg p-2">
          <OrderItemsTable
            orderId={orderId || ""}
            groupDiscount={orderData.groups?.standard_discount || 0}
            customerDiscount={orderData.customers?.discount || 0}
          />
        </div>
      </div>
    </div>
  );
}

export default OrderDetailPage;
