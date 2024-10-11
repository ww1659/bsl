import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { toTitleCase } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import { Badge } from "../ui/badge";

type OrderCardProps = {
  orderId: string | null;
  orderNumber: number | null;
  deliveryDate: string | null;
  orderStatus: string | null;
  orderTotal: number | null;
  customerName: string | null | undefined;
  groupName: string | null | undefined;
};

function OrderCard({
  orderId,
  orderNumber,
  deliveryDate,
  orderStatus,
  orderTotal,
  customerName,
  groupName,
}: OrderCardProps) {
  const date = parseISO(deliveryDate || "");
  const formattedDate = format(date, "eeee MMMM d");
  return (
    <div>
      <Link to={`/orders/${orderId}`}>
        <Card>
          <CardHeader className="p-4">
            <div className="flex flex-row justify-between">
              <CardTitle>{toTitleCase(customerName || "")}</CardTitle>
              <Badge variant="outline">{toTitleCase(orderStatus || "")}</Badge>
            </div>

            <CardDescription>Order Number: {orderNumber} </CardDescription>
          </CardHeader>{" "}
          <CardContent className="grid gap-1">
            <div className="flex flex-row gap-2 text-sm">
              <p>Date:</p>
              <p className="font-bold">{formattedDate}</p>
            </div>

            <div className="flex flex-row gap-2 text-sm">
              <p>Total:</p>
              <p className="font-bold">£{orderTotal}</p>
            </div>
          </CardContent>
          <CardFooter>
            <Badge>
              {" "}
              {groupName ? toTitleCase(groupName || "") : "Private Owner"}
            </Badge>
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
}

export default OrderCard;
