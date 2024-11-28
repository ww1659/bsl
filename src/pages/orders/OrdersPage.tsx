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
import { useFetchGroups } from "@/hooks/fetch/useFetchGroups";
import { OrdersTable } from "@/components/orders/OrdersTable";
import { ordersTableColumns } from "@/components/orders/OrdersTableColumns";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

function OrdersPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    data: groupsData,
    isLoading: isGroupsLoading,
    isError: isGroupsError,
  } = useFetchGroups();
  const {
    data: ordersData,
    isLoading: isOrdersLoading,
    isError: isOrdersError,
    error: ordersError,
  } = useFetchOrders({
    startDate: searchParams.get("startDate") || undefined,
    groupId: searchParams.get("groupId") || undefined,
    customerName: searchParams.get("customerName") || undefined,
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
      </div>
    </>
  );
}

export default OrdersPage;
