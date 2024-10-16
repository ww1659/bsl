type CustomerListProps = {
  groupName: string | undefined;
};

import { useAppSelector } from "@/redux/hooks";
import { useFetchGroupedCustomers } from "@/hooks/useFetchCustomersByGroup";
import CustomerCard from "./CustomerCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function CustomerList({ groupName }: CustomerListProps) {
  const groupId = useAppSelector((state) => state.group.groupId);

  const { data, isLoading, isError, error } = useFetchGroupedCustomers(
    groupId || ""
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  if (data)
    return (
      <Card>
        <CardHeader>
          <CardTitle>Customers</CardTitle>
          <CardDescription>
            Select or search for a customer here.
          </CardDescription>
          <CardContent className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 pt-4">
            {data.map((customer) => (
              <CustomerCard
                key={customer.id}
                customerId={customer.id}
                customerName={customer.customer_name}
                groupName={groupName}
              />
            ))}
          </CardContent>
        </CardHeader>
      </Card>
    );
}

export default CustomerList;
