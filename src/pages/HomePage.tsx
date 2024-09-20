import { PostsList } from "@/components/postsList";
import { Button } from "@/components/ui/button";
import { useFetchCustomers } from "@/hooks/useFetchCustomers";

function HomePage() {
  const { data, isLoading, isError, error } = useFetchCustomers();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <>
      <h1>Vite + React</h1>
      <Button>Click Me</Button>
      <PostsList />
      <div>
        <h1>Customers</h1>
        <ul>
          {data.map((customer) => (
            <li key={customer.id}>{customer.customer_name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default HomePage;
