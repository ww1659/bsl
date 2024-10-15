//supabase queries
import { useFetchOrders } from "@/hooks/useFetchOrders";

//components
import NewOrderButton from "@/components/orders/NewOrderButton";

//ui
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

//utils
import { getEndOfWeek, getStartOfWeek, toTitleCase } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import { useFetchWeeklyTotal } from "@/hooks/useFetchWeeklyTotal";

function OrdersPage() {
  const today = new Date().toISOString().split("T")[0];
  const startOfWeek = getStartOfWeek(today, true);
  const endOfWeek = getEndOfWeek(today, true);

  const {
    data: ordersData,
    isLoading: ordersLoading,
    isError: ordersError,
    error: ordersFetchError,
  } = useFetchOrders();

  // Fetching weekly total revenue
  const {
    data: weeklyTotalData,
    isLoading: weeklyTotalLoading,
    isError: weeklyTotalError,
    error: weeklyTotalFetchError,
  } = useFetchWeeklyTotal();

  if (ordersLoading || weeklyTotalLoading) return <p>Loading...</p>;
  if (ordersError || weeklyTotalError)
    return (
      <p>
        Error: {ordersFetchError?.message || weeklyTotalFetchError?.message}
      </p>
    );

  if (ordersData)
    return (
      <>
        <div className="flex flex-row gap-4 items-center">
          <h1>Orders Page</h1>
          <NewOrderButton />
        </div>

        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
          <Card className="md:col-span-1">
            <CardHeader className="pb-2">
              <CardDescription>
                This Week: {startOfWeek}-{endOfWeek}
              </CardDescription>
              <CardTitle className="text-4xl">£{weeklyTotalData}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-fo reground">
                +25% from last week
              </div>
            </CardContent>
            <CardFooter>
              <Progress value={25} aria-label="25% increase" />
            </CardFooter>
          </Card>
          <Card className="md:col-span-1">
            <CardHeader className="pb-2">
              <CardDescription>This Week</CardDescription>
              <CardTitle className="text-4xl">$1,329</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-fo reground">
                +25% from last week
              </div>
            </CardContent>
            <CardFooter>
              <Progress value={25} aria-label="25% increase" />
            </CardFooter>
          </Card>
          <Card className="md:col-span-1">
            <CardHeader className="pb-2">
              <CardDescription>This Week</CardDescription>
              <CardTitle className="text-4xl">$1,329</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                +25% from last week
              </div>
            </CardContent>
            <CardFooter>
              <Progress value={25} aria-label="25% increase" />
            </CardFooter>
          </Card>
          <Card className="md:col-span-3 xl:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle>Upcoming Orders</CardTitle>
              <CardDescription className="max-w-lg text-balance leading-relaxed">
                Your upcoming orders listed below.
              </CardDescription>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
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
                    {ordersData.map((order) => (
                      <TableRow className="bg-accent" key={order.id}>
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
                        <TableCell className="text-right">
                          £{order.total}
                        </TableCell>
                      </TableRow>
                    ))}
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
