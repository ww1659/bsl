import { Link } from "react-router-dom";
import { Button } from "../ui/button";

function NewOrderButton() {
  return (
    <Link to="/orders/create">
      <Button>Create New Order</Button>
    </Link>
  );
}

export default NewOrderButton;
