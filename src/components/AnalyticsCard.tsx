type AnalyticsCardProps = { customerId: string | null };

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function AnalyticsCard({ customerId }: AnalyticsCardProps) {
  console.log(customerId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics</CardTitle>
        <CardDescription>Customer</CardDescription>
      </CardHeader>
    </Card>
  );
}

export default AnalyticsCard;
