//components
import GroupCard from "@/components/customers/GroupCard";

//ui
import { Plus } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";

//database hooks
import { useFetchGroups } from "@/hooks/fetch/useFetchGroups";

function GroupsPage() {
  const { data, isLoading, isError, error } = useFetchGroups();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  if (data)
    return (
      <>
        <h1 className="py-2">Customer Groups</h1>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-2">
          {data.map((group) => (
            <div className="grid" key={group.id}>
              <GroupCard groupName={group.group_name} groupId={group.id} />
            </div>
          ))}
          <div className="grid">
            <GroupCard groupName={"privates"} groupId="private" />
          </div>
        </div>
      </>
    );
}

export default GroupsPage;
