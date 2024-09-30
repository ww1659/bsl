import GroupCard from "@/components/GroupCard";
import { useFetchGroups } from "@/hooks/useFetchGroups";

function GroupsPage() {
  const { data, isLoading, isError, error } = useFetchGroups();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  if (data)
    return (
      <>
        <h1>Customer Groups</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((group) => (
            <div className="grid" key={group.id}>
              <GroupCard groupName={group.group_name} />
            </div>
          ))}
        </div>
      </>
    );
}

export default GroupsPage;
