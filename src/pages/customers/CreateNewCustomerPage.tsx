import NewCustomerForm from "@/components/customers/NewCustomerForm";

function CreateNewCustomerPage() {
  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <h1 className="py-2">Add New Customer</h1>
      </div>
      <NewCustomerForm />
    </>
  );
}

export default CreateNewCustomerPage;
