//supabase queries
import { useFetchOrders } from "@/hooks/fetch/useFetchOrders";

//components
import NewOrderButton from "@/components/orders/NewOrderButton";

//ui
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
import { Button } from "@/components/ui/button";
import { useFetchGroups } from "@/hooks/fetch/useFetchGroups";
import { OrdersTable } from "@/components/orders/OrdersTable";
import { ordersTableColumns } from "@/components/orders/OrdersTableColumns";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useCallback, useEffect, useState } from "react";
import debounce from "lodash.debounce";

function OrdersPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const {
    data: groupsData,
    isLoading: isGroupsLoading,
    isError: isGroupsError,
    error: groupsError,
  } = useFetchGroups();
  const {
    data: ordersData,
    isLoading: isOrdersLoading,
    isError: isOrdersError,
    error: ordersError,
  } = useFetchOrders({
    startDate: searchParams.get("startDate") || undefined,
    groupId: searchParams.get("groupId") || undefined,
    customerName: debouncedSearchTerm,
  });

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (value) {
      searchParams.set(name, value);
    } else {
      searchParams.delete(name);
    }
    setSearchParams(searchParams);
  };

  const debouncedSetSearchTerm = useCallback((value: string) => {
    debounce(() => setDebouncedSearchTerm(value), 300)();
  }, []);

  useEffect(() => {
    debouncedSetSearchTerm(searchParams.get("customerName") || "");
  }, [searchParams, debouncedSetSearchTerm]);

  return (
    <>
      <div className="flex flex-row gap-4 items-center justify-between">
        <h1>Orders</h1>
        <NewOrderButton />
      </div>

      <div className="grid gap-x-4 gap-y-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="justify-start">
            <Button variant="outline">
              {toTitleCase(
                searchParams.get("groupId")
                  ? groupsData?.find(
                      (group) => group.id === searchParams.get("groupId")
                    )?.group_name || "Private Property"
                  : "Select Group"
              )}
            </Button>
          </DropdownMenuTrigger>
          {groupsData && !isGroupsLoading && !isGroupsError && (
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Groups</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {groupsData.map((group) => (
                <DropdownMenuCheckboxItem
                  key={group.id}
                  checked={searchParams.get("groupId") === group.id}
                  onCheckedChange={() =>
                    handleFilterChange({
                      target: {
                        name: "groupId",
                        value:
                          searchParams.get("groupId") === group.id
                            ? ""
                            : group.id,
                      },
                    } as React.ChangeEvent<HTMLInputElement>)
                  }
                >
                  {toTitleCase(group.group_name || "")}
                </DropdownMenuCheckboxItem>
              ))}
              <DropdownMenuCheckboxItem
                key="private"
                checked={searchParams.get("groupId") === "private"}
                onCheckedChange={() =>
                  handleFilterChange({
                    target: {
                      name: "groupId",
                      value:
                        searchParams.get("groupId") === "private"
                          ? ""
                          : "private",
                    },
                  } as React.ChangeEvent<HTMLInputElement>)
                }
              >
                Private Property
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          )}
        </DropdownMenu>

        <Input
          placeholder="Customer Name"
          name="customerName"
          value={searchParams.get("customerName") || ""}
          onChange={handleFilterChange}
        />
        {/* <div className="flex flex-row gap-2 col-span-4">
          {Array.from(searchParams.entries()).map(([key, value]) => {
            if (!value) return null;
            let displayValue = value;
            if (key === "startDate") {
              displayValue = format(parseISO(value), "dd-MM-yyyy");
            } else if (key === "groupId") {
              displayValue =
                groupsData?.find((group) => group.id === value)?.group_name ||
                "Private Property";
            }

            return (
              <Badge key={key} variant="outline">
                {toTitleCase(key)}: {toTitleCase(displayValue)}
              </Badge>
            );
          })}
        </div> */}

        <div className="container col-span-4">
          {isOrdersLoading ? (
            <div>Orders Loading</div>
          ) : isOrdersError ? (
            <div>Error fetching Orders: {ordersError.message}</div>
          ) : (
            ordersData && (
              <OrdersTable columns={ordersTableColumns} data={ordersData} />
            )
          )}
        </div>
        {/* <Card className="col-span-4">
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
        </Card> */}
      </div>
    </>
  );
}

export default OrdersPage;
