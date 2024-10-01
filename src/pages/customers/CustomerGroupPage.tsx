import { useParams } from "react-router-dom";
import { useFetchGroupedCustomers } from "@/hooks/useFetchCustomersByGroup";
import { removeDashes } from "@/lib/utils";
import { useAppSelector } from "@/redux/hooks";

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

  const groupId = useAppSelector((state) => state.group.groupId);

  const { data, isLoading, isError, error } = useFetchGroupedCustomers(
    groupId || ""
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  if (data)
    return (
      <div>
        <h1 className="py-2">Customers</h1>
        <Breadcrumb className="py-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/customers">customers</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{removeDashes(groupName || "")}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-2">
          {data.map((customer) => (
            <div className="grid" key={customer.id}>
              <CustomerCard
                groupName={groupName}
                customerName={customer.customer_name}
                customerId={customer.id}
              />
            </div>
          ))}
        </div>
      </div>
    );
}

export default CustomerGroupPage;
