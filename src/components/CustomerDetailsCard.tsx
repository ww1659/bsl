type CustomerDetailsCard = {
  customerId: string | null;
};

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFetchCustomerById } from "@/hooks/useFetchCustomerById";
import { Button } from "./ui/button";

function CustomerDetailsCard({ customerId }: CustomerDetailsCard) {
  const { data, isLoading, isError, error } = useFetchCustomerById(
    customerId || ""
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  if (data)
    return (
      <Card className="relative">
        <CardHeader>
          <CardTitle>Customer Details</CardTitle>
          <CardDescription>Update or view here</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row align-center flex-wrap">
            <p className="pr-1">Customer Name:</p>
            <p className="font-bold">{data.customer_name}</p>
          </div>
          <div className="flex flex-row align-center flex-wrap">
            <p className="pr-1">House Number:</p>
            <p className="font-bold">{data.house_number}</p>
          </div>
          <div className="flex flex-row align-center flex-wrap">
            <p className="pr-1">Street:</p>
            <p className="font-bold">{data.street_name}</p>
          </div>
          <div className="flex flex-row align-center flex-wrap">
            <p className="pr-1">Postcode:</p>
            <p className="font-bold">{data.postcode}</p>
          </div>
          <div className="flex flex-row align-center flex-wrap">
            <p className="pr-1">Email:</p>
            <p className="font-bold">{data.email}</p>
          </div>
        </CardContent>
        <CardFooter className="absolute bottom-0 w-full">
          <Button className="w-full">Update Customer Details</Button>
        </CardFooter>
      </Card>
    );
}

export default CustomerDetailsCard;
