import NewOrderButton from "@/components/orders/NewOrderButton";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <h1>Home Page</h1>
      <div className="flex flex-row flex-wrap gap-5">
        <Button>
          <Link to="customers">Customers</Link>
        </Button>
        <NewOrderButton />
      </div>
    </>
  );
}

export default HomePage;
