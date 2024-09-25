import { useFetchGroups } from "@/hooks/useFetchGroups";

function GroupsPage() {
  const { data, isLoading, isError, error } = useFetchGroups();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  if (data)
    return (
      <>
        <h1>Groups Page</h1>
        <ul>
          {data.map((group) => (
            <li key={group.id}>{group.group_name}</li>
          ))}
        </ul>
      </>
    );
}

export default GroupsPage;
