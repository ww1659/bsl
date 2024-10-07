import NewOrderButton from "@/components/orders/newOrderButton";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <h1>Home Page</h1>
      <div className="flex flex-row flex-wrap gap-5">
        <div className="border rounded-lg py-1 px-3 bg-primary text-primary-foreground hover:bg-primary/90">
          <Link to="customers">
            <p>Customer Page</p>
          </Link>
        </div>
        <NewOrderButton />
      </div>
    </>
  );
}

export default HomePage;
