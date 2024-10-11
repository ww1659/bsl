import { useState } from "react";
import { OrderItem } from "@/types";

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
import { MoveLeftIcon } from "lucide-react";
import OrderSummaryCard from "@/components/orders/OrderSummaryCard";

function CreateOrderPage() {
  const { data, isLoading, isError, error } = useFetchCustomers();

  const [currentStep, setCurrentStep] = useState(1);
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [groupId, setGroupId] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState<string | null>(null);
  const [customerDiscount, setCustomerDiscount] = useState<number | null>(0);
  const [date, setDate] = useState<Date | undefined>();
  const [currentOrderItems, setCurrentOrderItems] = useState<OrderItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleCustomerSelection = (
    id: string,
    customerName: string,
    customerDiscount: number | null,
    groupId: string
  ) => {
    setCustomerId(id);
    setCustomerName(customerName);
    setCustomerDiscount(customerDiscount);
    setGroupId(groupId);
    handleNextStep();
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const sortedCustomers = data?.sort((a, b) =>
    (a.customer_name || "").localeCompare(b.customer_name || "")
  );

  const filteredCustomers = sortedCustomers?.filter((customer) =>
    (customer.customer_name || "").toLowerCase().includes(searchTerm)
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  if (data)
    return (
      <div>
        <h1>Generate a new Order</h1>
        {currentStep === 3 || currentStep === 4 ? (
          <h4>{toTitleCase(customerName || "")}</h4>
        ) : (
          <h4 className="invisible">Null</h4>
        )}
        {currentStep === 1 && (
          <div>
            <h3 className="pt-10">Step 1: New or Existing Customer</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-5">
              <Button
                variant="select"
                className="p-20"
                onClick={() => handleNextStep()}
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
            <div className="flex flex-row gap-2 items-center pt-10">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePrevStep()}
              >
                <MoveLeftIcon className="h-4 w-4" />
              </Button>
              <h3>Step 2: Select Customer</h3>
            </div>

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
                      customer.customer_name || "",
                      customer.discount,
                      customer.group_id || ""
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
            <div className="flex flex-row gap-2 items-center pt-10">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePrevStep()}
              >
                <MoveLeftIcon className="h-4 w-4" />
              </Button>
              <h3>Step 3: Customise Order</h3>
            </div>

            <DeliveryDatePicker date={date} setDate={setDate} />
            <div className="grid grid-cols-1 gap-6 my-2">
              <CreateOrderCard
                customerId={customerId}
                customerName={customerName}
                currentOrderItems={currentOrderItems}
                setCurrentOrderItems={setCurrentOrderItems}
                customerDiscount={customerDiscount}
              />
            </div>
            <div className="flex flex-row justify-end items-center gap-2">
              <p className="text-xs">
                This will take you to the Order Summary page
              </p>
              <Button
                disabled={currentOrderItems.length === 0 || !date}
                onClick={() => handleNextStep()}
              >
                Confirm Order
              </Button>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <div className="flex flex-row gap-2 items-center pt-10">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePrevStep()}
              >
                <MoveLeftIcon className="h-4 w-4" />
              </Button>
              <h3>Step 4: Order Summary</h3>
            </div>

            <div className="my-2">
              <OrderSummaryCard
                currentOrderItems={currentOrderItems}
                date={date}
                customerName={customerName}
                customerDiscount={customerDiscount}
                customerId={customerId}
                groupId={groupId ? groupId : null}
              />
            </div>
          </div>
        )}
      </div>
    );
}

export default CreateOrderPage;
