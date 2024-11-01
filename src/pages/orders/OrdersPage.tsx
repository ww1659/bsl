import { useState } from "react";

//supabase queries
import { useFetchOrders } from "@/hooks/useFetchOrders";

//components
import NewOrderButton from "@/components/orders/NewOrderButton";

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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

//utils
import { toTitleCase } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { useFetchGroups } from "@/hooks/useFetchGroups";

function OrdersPage() {
  const [filters, setFilters] = useState({
    startDate: new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString(),
    groupId: "",
    orderId: "",
    status: "",
  });

  const { data, isLoading, isError, error } = useFetchOrders(filters);
  const {
    data: groupsData,
    isLoading: isGroupsLoading,
    isError: isGroupsError,
    error: groupsError,
  } = useFetchGroups();

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  if (isLoading || isGroupsLoading) return <p>Loading...</p>;
  if (isError || isGroupsError)
    return <p>Error: {error?.message || groupsError?.message}</p>;

  return (
    <>
      <div className="flex flex-row gap-4 items-center justify-between">
        <h1>Orders</h1>
        <NewOrderButton />
      </div>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="justify-start">
            <Button variant="outline">Filter by Group Name</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Groups</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {groupsData?.map((group) => (
              <DropdownMenuCheckboxItem
                key={group.id}
                checked={filters.groupId === group.id}
                onCheckedChange={() =>
                  handleFilterChange({
                    target: {
                      name: "groupId",
                      value: filters.groupId === group.id ? "" : group.id,
                    },
                  } as React.ChangeEvent<HTMLInputElement>)
                }
              >
                {toTitleCase(group.group_name || "")}
              </DropdownMenuCheckboxItem>
            ))}
            <DropdownMenuCheckboxItem
              key="private"
              checked={filters.groupId === "private"}
              onCheckedChange={() =>
                handleFilterChange({
                  target: {
                    name: "groupId",
                    value: filters.groupId === "private" ? "" : "private",
                  },
                } as React.ChangeEvent<HTMLInputElement>)
              }
            >
              Private Property
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex flex-row gap-2 col-span-4">
          {Object.entries(filters).map(([key, value]) => {
            if (value) {
              if (key === "startDate") {
                return (
                  <Badge key={key} variant="outline">
                    Start Date: {format(parseISO(value), "dd-MM-yyyy")}
                  </Badge>
                );
              }
              if (key === "groupId") {
                const groupName =
                  groupsData?.find((group) => group.id === value)?.group_name ||
                  "Private Property";
                return (
                  <Badge key={key} variant="outline">
                    Group: {toTitleCase(groupName)}
                  </Badge>
                );
              }
              return (
                <Badge key={key} variant="outline">
                  {toTitleCase(key)}: {toTitleCase(value)}
                </Badge>
              );
            }
            return null;
          })}
        </div>

        <Card className="col-span-4">
          <CardHeader className="pb-3">
            <CardTitle>All Orders</CardTitle>
            <CardDescription className="max-w-lg text-balance leading-relaxed">
              Filter or search for orders here
            </CardDescription>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-0 hover:bg-0">
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Order Number
                    </TableHead>
                    <TableHead className="hidden sm:table-cell">
                      Status
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Delivery Date
                    </TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data && data.length !== 0 ? (
                    data.map((order) => (
                      <TableRow className="bg-0 hover:bg-accent" key={order.id}>
                        <TableCell>
                          <div className="font-medium">
                            {toTitleCase(order.groups?.group_name || "") ||
                              "Private"}
                          </div>
                          <div className="hidden text-sm text-muted-foreground md:inline">
                            {toTitleCase(order.customers?.customer_name || "")}
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {order.number}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge className="text-xs" variant="outline">
                            {toTitleCase(order.status || "")}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {order.delivery_date
                            ? format(
                                parseISO(order.delivery_date),
                                "dd-MM-yyyy"
                              )
                            : "N/A"}
                        </TableCell>
                        <TableCell className="text-right font-bold">
                          £{order.total?.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5}>
                        Sorry, no orders can be found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </>
  );
}

export default OrdersPage;
