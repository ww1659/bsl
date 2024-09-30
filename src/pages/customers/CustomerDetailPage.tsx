import { useParams } from "react-router-dom";
import { useFetchStandardOrder } from "@/hooks/useFetchStandardOrder";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function CustomerDetailPage() {
  const { groupName, customerName } = useParams();

  const formatCustomerName = (name: string) => {
    return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const { data, isLoading, isError, error } = useFetchStandardOrder(
    formatCustomerName(customerName || "")
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  if (data)
    return (
      <div>
        <h1>{customerName}</h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/customers">customers</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/customers/${groupName}`}>
                {groupName}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{customerName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {data.map((standardOrder) => (
            <div className="grid" key={standardOrder.id}>
              <h2>{standardOrder.id}</h2>
              <h3>{standardOrder.order_name}</h3>
            </div>
          ))}
        </div>
      </div>
    );
}

export default CustomerDetailPage;
