type CustomerCardProps = {
  groupName: string | undefined;
  customerName: string | null;
};
import { Link } from "react-router-dom";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function CustomerCard({ groupName, customerName }: CustomerCardProps) {
  const formattedCustomerName = customerName
    ?.toLowerCase()
    .replace(/\s+/g, "-");

  return (
    <Link to={`/customers/${groupName}/${formattedCustomerName}`}>
      <Card>
        <CardHeader>
          <CardTitle>{customerName}</CardTitle>
          <CardDescription>Customer</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}

export default CustomerCard;
