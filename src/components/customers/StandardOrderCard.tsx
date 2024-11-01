type StandardOrderCard = {
  customerId: string | null;
};

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { toTitleCase } from "@/lib/utils";
import { useFetchStandardOrder } from "@/hooks/useFetchStandardOrder";
import { OrderItem } from "@/types";

function StandardOrderCard({ customerId }: StandardOrderCard) {
  const { data, isLoading, isError, error } = useFetchStandardOrder(
    customerId || ""
  );

  let sortedItems: OrderItem[] = [];
  let orderName;

  if (data && data.standard_order.length !== 0) {
    orderName = data.standard_order[0].order_name;
    sortedItems = data?.standard_order[0].standard_order_items.sort((a, b) => {
      const nameA = a.items?.item_name?.toLowerCase();
      const nameB = b.items?.item_name?.toLowerCase();
      if (nameA && nameB && nameA < nameB) return -1;
      if (nameA && nameB && nameA > nameB) return 1;
      return 0;
    });
  }

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  if (data)
    return (
      <Card className="flex flex-col justify-between">
        <div>
          <CardHeader>
            <CardTitle>Standard Orders</CardTitle>
            <CardDescription>Create new standard orders here</CardDescription>
          </CardHeader>
          <CardContent>
            {sortedItems?.map((item) => (
              <div key={item.items?.id}>
                <div className="flex flex-row align-center">
                  <p className="text-sm pr-1">
                    {toTitleCase(item.items?.item_name || "")}:
                  </p>
                  <p className="text-sm font-bold">{item.quantity}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </div>
        <CardFooter className="flex justify-end align-end">
          <Button className="w-full">Update "{orderName}" Order</Button>
        </CardFooter>
      </Card>
    );
}

export default StandardOrderCard;
