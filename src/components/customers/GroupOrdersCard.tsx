import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useFetchOrderStatsByGroup } from "@/hooks/fetch/useFetchOrderStatsByGroup";
import { useAppSelector } from "@/redux/hooks";
import { Progress } from "../ui/progress";

function GroupOrdersCard() {
  const groupId = useAppSelector((state) => state.group.groupId);

  const { data, isLoading, isError, error } = useFetchOrderStatsByGroup(
    groupId || ""
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const percentageChange =
    data &&
    data.monthOrders &&
    data.previousMonthOrders &&
    data.previousMonthOrders !== 0
      ? ((data.monthOrders - data.previousMonthOrders) /
          data.previousMonthOrders) *
        100
      : 0;

  if (data)
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row items-center flex-wrap py-1 gap-3">
            <p className="text-5xl">{data.monthOrders}</p>
            <p className="text-sm text-muted-foreground">Orders this month</p>
          </div>

          <div className="flex flex-col gap-2">
            <Progress value={percentageChange} />
            <p className="text-xs">
              {percentageChange}%{" "}
              {percentageChange >= 0 ? "increase" : "decrease"} on previous
              month
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground">
            {data.monthOrders} Orders all time
          </p>
        </CardFooter>
      </Card>
    );
}

export default GroupOrdersCard;
