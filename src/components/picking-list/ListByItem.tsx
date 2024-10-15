import { DateRange } from "react-day-picker";

type ListByItemProps = {
  date: DateRange | undefined;
};

//supabase hooks
import { useFetchPickingListByItem } from "@/hooks/useFetchPickingListByItems";

//utils
import { getEndOfWeek, getStartOfWeek, toTitleCase } from "@/lib/utils";

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
import { Badge } from "@/components/ui/badge";
import { format, parseISO } from "date-fns";

function ListByItem({ date }: ListByItemProps) {
  const startDate = date?.from?.toISOString().split("T")[0] || "";
  const endDate = date?.to?.toISOString().split("T")[0] || "";

  const { data, isLoading, isError, error } = useFetchPickingListByItem(
    startDate,
    endDate
  );

  const today = new Date().toISOString().split("T")[0];
  const startOfWeek = getStartOfWeek(today, true);
  const endOfWeek = getEndOfWeek(today, true);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  if (data)
    return (
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        <Card className="md:col-span-3 xl:col-span-4">
          <CardHeader>
            <CardTitle>
              <div className="flex flex-row justify-between">
                <span>Picking List By Item</span>
                <span className="text-base">
                  {startOfWeek} to {endOfWeek}
                </span>
              </div>
            </CardTitle>
            <CardDescription className="max-w-lg text-balance leading-relaxed">
              Items to be picked for the commencing week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item Name</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Order Nunber
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Required Date
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((list) => (
                  <TableRow className="bg-accent" key={list.id}>
                    <TableCell>
                      <div className="font-medium">
                        {toTitleCase(list.items?.item_name || "")}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {list.orders?.number}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge
                        className="text-xs"
                        variant={list.picked ? "outline" : "destructive"}
                      >
                        {list.picked ? "Picked" : "Not Picked"}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {list.orders?.delivery_date
                        ? format(
                            parseISO(list.orders.delivery_date),
                            "dd-MM-yyyy"
                          )
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

export default ListByItem;
