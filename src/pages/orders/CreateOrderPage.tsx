import { useState } from "react";

type OrderItem = {
  quantity: number;
  items: {
    id: number;
    item_name: string | null;
    price: number | null;
  } | null;
};

//components
import CreateOrderCard from "@/components/orders/CreateOrderCard";

//ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

//supabase hooks
import { useFetchCustomers } from "@/hooks/useFetchCustomers";

//utils
import { toTitleCase } from "@/lib/utils";
import DeliveryDatePicker from "@/components/orders/DeliveryDatePicker";

type CreateOrderPageProps = {};

function CreateOrderPage({}: CreateOrderPageProps) {
  const { data, isLoading, isError, error } = useFetchCustomers();

  const [currentStep, setCurrentStep] = useState(1);
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState<string | null>(null);
  const [date, setDate] = useState<Date | undefined>();
  const [currentOrderItems, setCurrentOrderItems] = useState<OrderItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  console.log(currentOrderItems);

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleCustomerSelection = (id: string, customerName: string) => {
    setCustomerId(id);
    setCustomerName(customerName);
    handleNextStep();
  };

  const handleOrderCustomization = (details: any) => {
    setCurrentOrderItems(details);
    handleNextStep();
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredCustomers = data?.filter((customer) =>
    (customer.customer_name || "").toLowerCase().includes(searchTerm)
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  if (data)
    return (
      <div>
        <h1>Generate a new Order</h1>
        {currentStep === 1 && (
          <div>
            <h3 className="pt-10">Step 1: New or Existing Customer</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-5">
              <Button
                variant="select"
                className="p-20"
                onClick={() => handleCustomerSelection("existing")}
              >
                <p className="text-lg">Existing Customer</p>
              </Button>
              <Button
                variant="select"
                className="p-20"
                onClick={() => handleNextStep()}
              >
                <p className="text-lg">New Customer</p>
              </Button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h3 className="pt-10">Step 2: Select Customer</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-2">
              <Input
                placeholder="Search for an existing customer"
                className="mt-2 mb-4"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-2">
              {filteredCustomers?.map((customer) => (
                <Button
                  key={customer.id}
                  onClick={() =>
                    handleCustomerSelection(
                      customer.id,
                      customer.customer_name || ""
                    )
                  }
                  variant="select"
                  className="p-10"
                >
                  {toTitleCase(customer.customer_name || "")}
                </Button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 3 && customerId && (
          <div>
            <h3 className="py-2">Step 3: Customise Order</h3>
            <DeliveryDatePicker date={date} setDate={setDate} />
            <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6 my-2">
              <CreateOrderCard
                customerId={customerId}
                customerName={customerName}
                currentOrderItems={currentOrderItems}
                setCurrentOrderItems={setCurrentOrderItems}
              />
            </div>
            <Button onClick={() => handleOrderCustomization({})}>
              Save Custom Order
            </Button>
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <h3 className="pt-10">Step 4: Summary and Confirmation</h3>
            <p>Order summary here...</p>
            <Button onClick={() => console.log("Order confirmed!")}>
              Confirm Order
            </Button>
          </div>
        )}
      </div>
    );
}

export default CreateOrderPage;
