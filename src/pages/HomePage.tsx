import { Button } from "@/components/ui/button";
import UpdateCustomerDetailsDialog from "@/components/UpdateCustomerDetailsDialog";
import { openDialog } from "@/redux/features/customers/updateCustomerSlice";
import { useAppDispatch } from "@/redux/hooks";

function HomePage() {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(openDialog());
  };

  return (
    <>
      <h1>Home Page</h1>
      <Button onClick={handleClick}>Hello</Button>
      <UpdateCustomerDetailsDialog customerId={"hello"} />
    </>
  );
}

export default HomePage;
