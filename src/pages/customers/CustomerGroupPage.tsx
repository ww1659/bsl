import { useParams } from "react-router-dom";
import { useFetchGroupedCustomers } from "@/hooks/useFetchCustomersByGroup";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import CustomerCard from "@/components/CustomerCard";

function CustomerGroupPage() {
  const { groupName } = useParams();

  const formatGroupName = (name: string) => {
    return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const { data, isLoading, isError, error } = useFetchGroupedCustomers(
    formatGroupName(groupName || "")
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  if (data)
    return (
      <div>
        <h1>Customers</h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/customers">customers</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{groupName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {data.map((customer) => (
            <div className="grid" key={customer.id}>
              <CustomerCard
                groupName={groupName}
                customerName={customer.customer_name}
              />
            </div>
          ))}{" "}
        </div>
      </div>
    );
}

export default CustomerGroupPage;
