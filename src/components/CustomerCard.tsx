type CustomerCardProps = {
  groupName: string | undefined;
  customerName: string | null;
  customerId: string | null;
};

import { Link } from "react-router-dom";
import { toTitleCase } from "@/lib/utils";
import { useAppDispatch } from "@/redux/hooks";
import { setCustomerId } from "@/redux/features/customers/customersSlice";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function CustomerCard({
  groupName,
  customerName,
  customerId,
}: CustomerCardProps) {
  const dispatch = useAppDispatch();
  const formattedCustomerName = customerName
    ?.toLowerCase()
    .replace(/\s+/g, "-");

  const handleClick = () => {
    dispatch(setCustomerId(customerId));
  };

  return (
    <Link
      to={`/customers/${groupName}/${formattedCustomerName}`}
      onClick={handleClick}
    >
      <Card>
        <CardHeader>
          <CardTitle>{toTitleCase(customerName || "")}</CardTitle>
          <CardDescription>Customer</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}

export default CustomerCard;
