type StandardOrderCard = {
  customerId: string | null;
};

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { toTitleCase } from "@/lib/utils";
import { useFetchStandardOrders } from "@/hooks/useFetchStandardOrder";
import { Plus } from "lucide-react";
import { useState } from "react";

function StandardOrderCard({ customerId }: StandardOrderCard) {
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);
  const { data, isLoading, isError, error } = useFetchStandardOrders(
    customerId || ""
  );

  let sortedItems: {
    id: number | undefined;
    item_name: string | null | undefined;
    quantity: number | undefined;
    price: number | null | undefined;
  }[] = [];
  let orderName;

  if (selectedOrder) {
    const selectedOrderData = data?.find((order) => order.id === selectedOrder);
    if (selectedOrderData) {
      sortedItems = selectedOrderData.order_items.sort((a, b) => {
        const nameA = a.item_name?.toLowerCase();
        const nameB = b.item_name?.toLowerCase();
        if (nameA && nameB && nameA < nameB) return -1;
        if (nameA && nameB && nameA > nameB) return 1;
        return 0;
      });
      orderName = selectedOrderData.order_name;
    }
  }

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  console.log(orderName, sortedItems);

  if (data)
    return (
      <Card className="flex flex-col justify-between">
        <div>
          <CardHeader className="flex flex-row justify-between gap-4">
            <div>
              <CardTitle>Standard Orders</CardTitle>
              <CardDescription>Update standard orders here</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            {data.map((order) => (
              <Button
                key={order.id}
                className="w-full"
                variant="outline"
                onClick={() => setSelectedOrder(order.id)}
              >
                {toTitleCase(order.order_name || "")}
              </Button>
            ))}
          </CardContent>
        </div>
      </Card>
    );
}

export default StandardOrderCard;

// {sortedItems?.map((item) => (
//   <div key={item.items?.id}>
//     <div className="flex flex-row align-center">
//       <p className="text-sm pr-1">
//         {toTitleCase(item.items?.item_name || "")}:
//       </p>
//       <p className="text-sm font-bold">{item.quantity}</p>
//     </div>
//   </div>
// ))}
