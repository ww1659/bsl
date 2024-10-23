import { DateRange } from "react-day-picker";

type ListByOrderProps = {
  date: DateRange | undefined;
};

//ui
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

//utils
import { format, parseISO } from "date-fns";
import { calculateOrderPickedStatus, toTitleCase } from "@/lib/utils";

//supabase hooks
import { useFetchPickingListByOrder } from "@/hooks/useFetchPickingListByOrder";
import { useState } from "react";
import ItemsSheet from "./ItemsSheet";
import { Badge } from "../ui/badge";
import { Check, X } from "lucide-react";

function ListByOrder({ date }: ListByOrderProps) {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const handleRowClick = (orderId: string) => {
    setSelectedOrder(orderId === selectedOrder ? null : orderId);
  };

  const startDate = date?.from?.toISOString();
  const endDate = date?.to?.toISOString();

  const { data, isLoading, isError, error } = useFetchPickingListByOrder(
    startDate || "",
    endDate || ""
  );

  let orderNumber = null;
  if (selectedOrder) {
    orderNumber = data?.filter((order) => order.id === selectedOrder)[0].number;
  }

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  if (data)
    return (
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        <Card className="md:col-span-4 xl:col-span-2">
          <CardHeader>
            <CardTitle>
              <div className="flex flex-row justify-between items-center">
                Picking List By Order
              </div>
            </CardTitle>
            <CardDescription className="max-w-lg text-balance leading-relaxed">
              Orders to be picked for the commencing week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="px-2">Customer</TableHead>
                  <TableHead className="hidden sm:table-cell px-2">
                    Order Number
                  </TableHead>
                  <TableHead className="px-2">Delivery Date</TableHead>
                  <TableHead className="px-2">Order Picked</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((order) => (
                  <TableRow
                    className={
                      order.id === selectedOrder ? "bg-secondary" : "bg-0"
                    }
                    key={order.id}
                    onClick={() => handleRowClick(order.id)}
                  >
                    <TableCell className="p-2">
                      <div className="font-medium">
                        {toTitleCase(order.groups?.group_name || "") ||
                          "Private"}
                      </div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {toTitleCase(order.customers?.customer_name || "")}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell p-2">
                      {order.number}
                    </TableCell>
                    <TableCell className="p-2">
                      {order.delivery_date
                        ? format(parseISO(order.delivery_date), "dd-MM-yyyy")
                        : "N/A"}
                    </TableCell>
                    <TableCell className="p-2">
                      {calculateOrderPickedStatus(order.order_items) ===
                      "picked" ? (
                        <Badge>Picked</Badge>
                      ) : calculateOrderPickedStatus(order.order_items) ===
                        "partial" ? (
                        <Badge>Partially Picked</Badge>
                      ) : (
                        <Badge variant="destructive">Not Picked</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="hidden xl:block xl:col-span-2">
          <CardHeader>
            <CardTitle>
              <div className="flex flex-row justify-between items-center">
                Items
              </div>
            </CardTitle>
            <CardDescription className="max-w-lg text-balance leading-relaxed">
              Items for Order Number {orderNumber}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-0 hover:bg-0">
                  <TableHead className="p-1">Item Name</TableHead>
                  <TableHead className="p-1">Quantity</TableHead>
                  <TableHead className="p-1">Picked</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedOrder ? (
                  data
                    .filter((order) => order.id === selectedOrder)
                    .flatMap((order) => order.order_items)
                    .map((item) => (
                      <TableRow
                        className="text-xs bg-0 hover:bg-0"
                        key={item.item_id}
                      >
                        <TableCell className="p-1">
                          {toTitleCase(item.items?.item_name || "")}
                        </TableCell>
                        <TableCell className="p-1"> {item.quantity}</TableCell>
                        <TableCell className="p-1">
                          {item.picked ? (
                            <Check className="h-4 w-4 text-green-800" />
                          ) : (
                            <X className="h-4 w-4 text-destructive" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">
                      No order selected
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <ItemsSheet
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
          orderNumber={orderNumber}
          orderData={data.filter((order) => order.id === selectedOrder)}
        />
      </div>
    );
}

export default ListByOrder;
