type AnalyticsCardProps = { customerId: string | null };

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";

function AnalyticsCard({ customerId }: AnalyticsCardProps) {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>Analytics</CardTitle>
        <CardDescription>{customerId}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-end align-end">
        <Button className="w-full" variant="outline">
          Update Order
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AnalyticsCard;
