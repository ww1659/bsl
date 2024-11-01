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
import { Check, X } from "lucide-react";

function ListByItem({ date }: ListByItemProps) {
  const startDate = date?.from?.toISOString();
  const endDate = date?.to?.toISOString();

  const { data, isLoading, isError, error } = useFetchPickingListByItem(
    startDate || "",
    endDate || ""
  );

  console.log(data);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  if (data)
    return (
      <div className="grid gap-4 sm:grid-cols-1">
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
                <TableRow className="bg-0 hover:bg-0 text-xs">
                  <TableHead className="py-1 h-6">Item Name</TableHead>
                  <TableHead className="py-1 h-6">Picked Count</TableHead>
                  <TableHead className="py-1 h-6">Unpicked Count</TableHead>
                  <TableHead className="py-1 h-6">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.isArray(data) && data.length !== 0 ? (
                  data.map((item) => (
                    <TableRow className="bg-accent text-xs" key={item.item_id}>
                      <TableCell className="py-1">
                        <div className="font-medium">
                          {toTitleCase(item.item_name || "")}
                        </div>
                      </TableCell>
                      <TableCell className="py-1">
                        {item.picked_count}
                      </TableCell>
                      <TableCell className="py-1">
                        {item.unpicked_count}
                      </TableCell>
                      <TableCell className="py-1">
                        {item.unpicked_count > 0 ? (
                          <X className="h-5 w-5 text-destructive" />
                        ) : (
                          <Check className="h-5 w-5 text-success" />
                        )}
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
