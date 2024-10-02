type CustomerDetailsCard = {
  customerId: string | null;
};

//Redux
import { useAppDispatch } from "@/redux/hooks";
import { openDialog } from "@/redux/features/customers/updateCustomerSlice";

//Supabase Hooks
import { useFetchCustomerById } from "@/hooks/useFetchCustomerById";

//UI
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import UpdateCustomerDetailsDialog from "./UpdateCustomerDetailsDialog";
import { toTitleCase } from "@/lib/utils";

function CustomerDetailsCard({ customerId }: CustomerDetailsCard) {
  const dispatch = useAppDispatch();

  const { data, isLoading, isError, error } = useFetchCustomerById(
    customerId || ""
  );

  const handleClick = () => {
    dispatch(openDialog());
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  if (data)
    return (
      <>
        <Card className="flex flex-col justify-between">
          <div>
            <CardHeader>
              <CardTitle>Customer Details</CardTitle>
              <CardDescription>Update or view here</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-row align-center flex-wrap">
                <p className="pr-1">Customer Name:</p>
                <p className="font-bold">
                  {toTitleCase(data.customer_name || "")}
                </p>
              </div>
              <div className="flex flex-row align-center flex-wrap">
                <p className="pr-1">House Number:</p>
                <p className="font-bold">{data.house_number}</p>
              </div>
              <div className="flex flex-row align-center flex-wrap">
                <p className="pr-1">Street:</p>
                <p className="font-bold">
                  {toTitleCase(data?.street_name || "")}
                </p>
              </div>
              <div className="flex flex-row align-center flex-wrap">
                <p className="pr-1">Postcode:</p>
                <p className="font-bold">{data.postcode?.toUpperCase()}</p>
              </div>
              <div className="flex flex-row align-center flex-wrap">
                <p className="pr-1">Email:</p>
                <p className="font-bold">{data.email}</p>
              </div>
            </CardContent>
          </div>
          <CardFooter>
            <Button className="w-full" onClick={handleClick}>
              Update Customer Details
            </Button>
          </CardFooter>
        </Card>
        <UpdateCustomerDetailsDialog customerId={customerId} />
      </>
    );
}

export default CustomerDetailsCard;
