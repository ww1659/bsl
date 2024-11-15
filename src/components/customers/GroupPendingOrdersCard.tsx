import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFetchOrders } from "@/hooks/fetch/useFetchOrders";
import { toTitleCase } from "@/lib/utils";
import { useAppSelector } from "@/redux/hooks";
import { format } from "date-fns";

function GroupPendingOrdersCard() {
  const groupId = useAppSelector((state) => state.group.groupId);
  const startDate = new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString();

  const { data, isLoading, isError, error } = useFetchOrders({
    startDate,
    groupId: groupId ?? undefined,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const sortedData = data
    ?.sort((a, b) => {
      const dateA = a.delivery_date ? new Date(a.delivery_date).getTime() : 0;
      const dateB = b.delivery_date ? new Date(b.delivery_date).getTime() : 0;
      return dateA - dateB;
    })
    .slice(0, 3);

  return (
    <Card className="w-full col-span-1 sm:col-span-2 xl:col-span-1">
      <CardHeader>
        <CardTitle>Pending Orders</CardTitle>
      </CardHeader>
      {sortedData && sortedData.length > 0 ? (
        sortedData.map((order) => (
          <CardContent className="grid gap-2 p-0" key={order.id}>
            <Card className="rounded-lg mx-2 hover:bg-accent hover:cursor-pointer">
              <CardContent className="px-4 py-2 flex flex-row gap-4">
                <p className="font-bold">#{order.number}</p>
                <div className="flex flex-col">
                  <p className="text-xs text-muted-foreground">
                    Delivery Date:{" "}
                    <span className="font-bold text-primary">
                      {format(
                        new Date(order.delivery_date ?? new Date()),
                        "MMM d, yyyy"
                      )}
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Customer:{" "}
                    <span className="font-bold text-primary">
                      {toTitleCase(order.customers?.customer_name || "")}
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        ))
      ) : (
        <div className="flex justify-center items-center">
          <p>No pending orders</p>
        </div>
      )}
      <CardFooter />
    </Card>
  );
}

export default GroupPendingOrdersCard;
