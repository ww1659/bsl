//router
import { useParams } from "react-router-dom";

//redux
import { useAppSelector } from "@/redux/hooks";

//components
import CustomerList from "@/components/customers/CustomerList";
import GroupDetailsCard from "@/components/customers/GroupDetailsCard";
import GroupOrdersCard from "@/components/customers/GroupOrdersCard";
import GroupPendingOrdersCard from "@/components/customers/GroupPendingOrdersCard";

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
import { removeDashes, toTitleCase } from "@/lib/utils";
import { useFetchGroupById } from "@/hooks/fetch/useFetchGroupById";

function CustomerGroupPage() {
  const { groupName } = useParams();
  const groupId = useAppSelector((state) => state.group.groupId);
  const { data, isLoading, isError, error } = useFetchGroupById(groupId || "");

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const formattedGroupName = toTitleCase(removeDashes(data?.group_name || ""));

  return (
    <div>
      <Breadcrumb className="py-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/customers">groups</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{removeDashes(groupName || "")}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="py-2">{formattedGroupName}</h1>

      <div className="space-y-4 my-2">
        <div
          className={`${
            groupId !== "null"
              ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
              : ""
          }`}
        >
          {groupId !== "null" && <GroupDetailsCard />}
          {groupId !== "null" && <GroupOrdersCard />}
          {groupId !== "null" && <GroupPendingOrdersCard />}
        </div>

        <CustomerList groupName={groupName} />
      </div>
    </div>
  );
}

export default CustomerGroupPage;
