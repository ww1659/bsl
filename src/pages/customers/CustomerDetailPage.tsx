//router
import { Link, useParams } from "react-router-dom";

//redux
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setGroupId } from "@/redux/features/groups/groupSlice";

//components
import AnalyticsCard from "@/components/customers/AnalyticsCard";
import StandardOrderCard from "@/components/customers/StandardOrderCard";
import CustomerDetailsCard from "@/components/customers/CustomerDetailsCard";

//ui
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

//utils
import { formatName } from "@/lib/utils";

function CustomerDetailPage() {
  const { groupName, customerName } = useParams();
  const customerId = useAppSelector((state) => state.customer.customerId);
  const groupId = useAppSelector((state) => state.group.groupId);

  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setGroupId(groupId));
  };

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
        <div className="grid sm:col-span-2 lg:col-span-3">
          <CustomerDetailsCard customerId={customerId} groupId={groupId} />
        </div>

        <div className="grid">
          <StandardOrderCard customerId={customerId} />
        </div>

        <div className="grid">
          <AnalyticsCard customerId={customerId} />
        </div>

        <div className="grid">
          <AnalyticsCard customerId={customerId} />
        </div>
      </div>
    </div>
  );
}

export default CustomerDetailPage;
