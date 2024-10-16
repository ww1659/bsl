import { DateRange } from "react-day-picker";

type ListByItemProps = {
  date: DateRange | undefined;
};

//supabase hooks
import { useFetchPickingListByItem } from "@/hooks/useFetchPickingListByItems";

//utils
import { toTitleCase } from "@/lib/utils";

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

function ListByItem({ date }: ListByItemProps) {
  const startDate = date?.from?.toISOString();
  const endDate = date?.to?.toISOString();

  const { data, isLoading, isError, error } = useFetchPickingListByItem(
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
              <div className="flex flex-row justify-between">
                <span>Picking List By Item</span>
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
                  <TableHead className="px-2">Item Name</TableHead>
                  <TableHead className="hidden sm:table-cell px-2">
                    Number of Items
                  </TableHead>
                  <TableHead className="hidden sm:table-cell px-2">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.isArray(data) && data.length !== 0 ? (
                  data.map((item) => (
                    <TableRow className="bg-accent" key={item.item_id}>
                      <TableCell className="p-2">
                        <div className="font-medium">
                          {toTitleCase(item.item_name || "")}
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell p-2">
                        {item.item_count}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell p-2">
                        <Badge
                          className="text-xs"
                          variant={item.picked ? "outline" : "destructive"}
                        >
                          {item.picked ? "Picked" : "Not Picked"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="bg-accent" key="1">
                    <TableCell colSpan={3} className="hidden sm:table-cell">
                      No Items to be picked for the selected date range:{" "}
                      <span className="font-bold">
                        {startDate} to {endDate}
                      </span>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
}

export default ListByItem;
