//components
import GroupCard from "@/components/customers/GroupCard";

//ui
import { Plus } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";

//database hooks
import { useFetchGroups } from "@/hooks/group/useFetchGroups";
import LoadingWheel from "@/components/LoadingWheel";

function GroupsPage() {
  const { data, isLoading, isError, error } = useFetchGroups();

  return (
    <>
      <h1>Customer Groups</h1>
      <div className="flex flex-row gap-2">
        <ButtonLink
          to="/customers/create-group"
          variant="outline"
          className="gap-1"
        >
          <Plus className="h-4 w-4" />
          Create New Group
        </ButtonLink>
        <ButtonLink
          to={`/customers/create-customer`}
          variant="outline"
          className="gap-1"
        >
          <Plus className="h-4 w-4" />
          Add New Customer
        </ButtonLink>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <LoadingWheel text="Loading Groups..." />
        </div>
      ) : isError ? (
        <p>Error Fetching Groups: {error.message}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 my-2">
          {data &&
            data.map((group) => (
              <div className="grid" key={group.id}>
                <GroupCard groupName={group.group_name} groupId={group.id} />
              </div>
            ))}
          <div className="grid">
            <GroupCard groupName={"privates"} groupId="private" />
          </div>
        </div>
      )}
    </>
  );
}

export default GroupsPage;
