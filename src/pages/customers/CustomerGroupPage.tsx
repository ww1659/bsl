import { useParams } from "react-router-dom";
import { removeDashes, toTitleCase } from "@/lib/utils";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import CustomerList from "@/components/CustomerList";
import GroupDetailsCard from "@/components/GroupDetailsCard";
import { useAppSelector } from "@/redux/hooks";

function CustomerGroupPage() {
  const { groupName } = useParams();
  const groupId = useAppSelector((state) => state.group.groupId);
  const formattedGroupName = toTitleCase(removeDashes(groupName || ""));

  return (
    <div>
      <h1 className="py-2">{formattedGroupName}</h1>
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

      <div
        className={`${
          groupId !== "null"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 my-2"
            : "grid grid-cols-1 gap-4 my-2"
        }`}
      >
        {groupId !== "null" && (
          <div className="grid">
            <GroupDetailsCard />
          </div>
        )}

        <div className="grid">
          <CustomerList groupName={groupName} />
        </div>
      </div>
    </div>
  );
}

export default CustomerGroupPage;
