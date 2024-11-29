import { DateRange } from "react-day-picker";

type ListByItemProps = {
  date: DateRange | undefined;
};

//supabase hooks
import { useFetchPickingListByItem } from "@/hooks/fetch/useFetchPickingListByItems";
import { useState } from "react";

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, ChevronDown, ChevronUp, X } from "lucide-react";
import { Button } from "../ui/button";
import { format } from "date-fns";

function ListByItem({ date }: ListByItemProps) {
  const [activeRow, setActiveRow] = useState<number | null>(null);

  const startDate = date?.from?.toISOString();
  const endDate = date?.to?.toISOString();

  const { data, isLoading, isError, error } = useFetchPickingListByItem(
    startDate || "",
    endDate || ""
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  if (!data) return null;

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
                <TableRow className="bg-0 hover:bg-0 text-sm">
                  <TableHead className="py-1 h-6">Item Name</TableHead>
                  <TableHead className="py-1 h-6 text-center">Total</TableHead>
                  <TableHead className="py-1 h-6 text-center">
                    Unpicked Count
                  </TableHead>
                  <TableHead className="py-1 h-6">Status</TableHead>
                  <TableHead className="py-1 h-6 text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.isArray(data) && data.length !== 0 ? (
                  data.map((item) => (
                    <TableRow
                      key={item.itemId}
                      className="bg-0 hover:bg-0 text-sm"
                    >
                      <TableCell className="py-2">
                        <div className="font-medium">
                          {toTitleCase(item.itemName || "")}
                        </div>
                      </TableCell>
                      <TableCell className="py-2 font-bold text-center">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="py-2 font-bold text-center">
                        {item.ordersPicked.length}
                      </TableCell>
                      <TableCell className="py-2">
                        {item.ordersUnpicked.length > 0 ? (
                          <X className="h-5 w-5 text-destructive" />
                        ) : (
                          <Check className="h-5 w-5 text-success" />
                        )}
                      </TableCell>
                      <TableCell className=" py-2 text-right">
                        <DropdownMenu
                          open={item.itemId === activeRow}
                          onOpenChange={(open) =>
                            setActiveRow(open ? item.itemId : null)
                          }
                        >
                          <DropdownMenuTrigger asChild>
                            <Button
                              disabled={item.ordersUnpicked.length === 0}
                              variant="ghost"
                              onClick={() =>
                                setActiveRow(
                                  activeRow === item.itemId ? null : item.itemId
                                )
                              }
                              className="focus:outline-none py-0"
                            >
                              {activeRow === item.itemId ? (
                                <ChevronUp className="h-5 w-5" />
                              ) : (
                                <ChevronDown className="h-5 w-5" />
                              )}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>
                              Unpicked {toTitleCase(item.itemName || "")}
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {item.ordersUnpicked &&
                              item.ordersUnpicked.map((order) => (
                                <DropdownMenuItem key={order.orderId}>
                                  <div className="flex flex-col w-full">
                                    <div className="flex flex-row justify-between">
                                      <p>
                                        {toTitleCase(order.customerName || "")}
                                      </p>
                                      <p className="font-bold">
                                        <span className="font-normal">x</span>
                                        {order.totalUnpicked}
                                      </p>
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                      Order Number: {order.orderNumber}
                                    </div>
                                  </div>
                                </DropdownMenuItem>
                              ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="bg-accent" key="1">
                    <TableCell colSpan={5} className="hidden sm:table-cell">
                      <div className="grid grid rows-2 justify-start gap-2">
                        No Items to be picked for the selected date range:{" "}
                        <span className="font-bold">
                          {startDate
                            ? format(new Date(startDate), "EEE dd MMM")
                            : ""}{" "}
                          -{" "}
                          {endDate
                            ? format(new Date(endDate), "EEE dd MMM")
                            : ""}
                        </span>
                      </div>
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
