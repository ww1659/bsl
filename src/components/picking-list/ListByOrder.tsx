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
import { toTitleCase } from "@/lib/utils";

//supabase hooks
import { useFetchPickingListByOrder } from "@/hooks/useFetchPickingListByOrder";

function ListByOrder({ date }: ListByOrderProps) {
  const startDate = date?.from?.toISOString();
  const endDate = date?.to?.toISOString();

  const { data, isLoading, isError, error } = useFetchPickingListByOrder(
    startDate || "",
    endDate || ""
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  if (data)
    return (
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        <Card className="md:col-span-4 xl:col-span-2">
          <CardHeader>
            <CardTitle>
              <div className="flex flex-row justify-between items-center">
                <div>
                  <span>Picking List By Order</span>
                </div>
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((order) => (
                  <TableRow className="bg-accent" key={order.id}>
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
}

export default ListByOrder;
