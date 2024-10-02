import { useParams } from "react-router-dom";
import { useFetchStandardOrder } from "@/hooks/useFetchStandardOrder";
import { formatName } from "@/lib/utils";
import CustomerDetailsCard from "@/components/CustomerDetailsCard";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setGroupId } from "@/redux/features/groups/groupSlice";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import StandardOrderCard from "@/components/StandardOrderCard";
import { Link } from "react-router-dom";
import AnalyticsCard from "@/components/AnalyticsCard";

function CustomerDetailPage() {
  const { groupName, customerName } = useParams();
  const customerId = useAppSelector((state) => state.customer.customerId);
  const groupId = useAppSelector((state) => state.group.groupId);

  const dispatch = useAppDispatch();

  const { data, isLoading, isError, error } = useFetchStandardOrder(
    customerId || ""
  );

  const handleClick = () => {
    dispatch(setGroupId(groupId));
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  if (data)
    return (
      <div>
        <h1 className="py-2">{formatName(customerName || "")}</h1>
        <Breadcrumb className="py-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/customers">groups</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link to={`/customers/${groupName}`} onClick={handleClick}>
                {groupName}
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{customerName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-2">
          <div className="grid">
            <CustomerDetailsCard customerId={customerId} />
          </div>

          <div className="grid">
            <StandardOrderCard orderData={data} />
          </div>

          <div className="grid">
            <AnalyticsCard customerId={customerId} />
          </div>
        </div>
      </div>
    );
}

export default CustomerDetailPage;
