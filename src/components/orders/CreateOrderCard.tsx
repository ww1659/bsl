type CreateOrderCard = {
  customerId: string | null;
};

//utils
import { toTitleCase } from "@/lib/utils";

//supabase hooks
import { useFetchStandardOrder } from "@/hooks/useFetchStandardOrder";

//ui
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

function CreateOrderCard({ customerId }: CreateOrderCard) {
  const { data, isLoading, isError, error } = useFetchStandardOrder(
    customerId || ""
  );

  const [orderName, setOrderName] = useState("");

  const orderNames =
    data?.standard_order?.map((order) => order.order_name) || [];

  const orderItems =
    data?.standard_order?.find((order) => order.order_name === orderName)
      ?.order_items || [];

  const sortedItems = orderItems.sort((a, b) => {
    const nameA = a.items?.item_name?.toLowerCase();
    const nameB = b.items?.item_name?.toLowerCase();
    if (nameA && nameB && nameA < nameB) return -1;
    if (nameA && nameB && nameA > nameB) return 1;

    return 0;
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  if (data)
    return (
      <div>
        <div className="py-2">
          <Select onValueChange={setOrderName}>
            <SelectTrigger>
              <SelectValue placeholder="Select a repeat order" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Standard Orders</SelectLabel>
                {orderNames.map((name, index) => (
                  <SelectItem key={index} value={name || "default"}>
                    {toTitleCase(name || "default")}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Card className="flex flex-col justify-between">
          <div>
            <CardHeader>
              <CardTitle>Standard Orders</CardTitle>
              <CardDescription>
                Select or modify customer order here
              </CardDescription>
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
        </Card>
      </div>
    );
}

export default CreateOrderCard;
