import { useFetchCustomers } from "@/hooks/useFetchCustomers";
import { Link } from "react-router-dom";

function CustomersPage() {
  const { data, isLoading, isError, error } = useFetchCustomers();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  if (data)
    return (
      <>
        <h1>Customers Page</h1>
        <div>
          <h1>Customers</h1>
          <ul>
            {data.map((customer) => (
              <li key={customer.id}>
                {customer.customer_name ? (
                  <Link
                    to={`/customers/${customer.customer_name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {customer.customer_name}
                  </Link>
                ) : (
                  <span>Unnamed Customer</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </>
    );
}

export default CustomersPage;
