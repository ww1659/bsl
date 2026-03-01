import { MoveLeftIcon } from 'lucide-react'
import { useState } from 'react'

import LoadingWheel from '@/components/LoadingWheel'
import CreateOrderCard from '@/components/orders/CreateOrderCard'
import DeliveryDatePicker from '@/components/orders/DeliveryDatePicker'
import OrderSummaryCard from '@/components/orders/OrderSummaryCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useFetchCustomers } from '@/hooks/customer/useFetchCustomers'
import { toTitleCase } from '@/lib/utils'
import type { Customer, OrderItem } from '@/schemas'

function CreateOrderPage() {
  const { data, isLoading, isError, error } = useFetchCustomers()

  const [currentStep, setCurrentStep] = useState(1)
  const [customerId, setCustomerId] = useState<string | null>(null)
  const [groupId, setGroupId] = useState<string | null>(null)
  const [customerName, setCustomerName] = useState<string | null>(null)
  const [customerDiscount, setCustomerDiscount] = useState<number | null>(0)
  const [date, setDate] = useState<Date | undefined>()
  const [currentOrderItems, setCurrentOrderItems] = useState<OrderItem[]>([])
  const [orderNotes, setOrderNotes] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1)
  }

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1)
  }

  const handleCustomerSelection = (
    id: string,
    customerName: string,
    customerDiscount: number | null,
    groupId: string
  ) => {
    setCustomerId(id)
    setCustomerName(customerName)
    setCustomerDiscount(customerDiscount)
    setGroupId(groupId)
    handleNextStep()
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase())
  }

  const sortedCustomers = data?.sort((a, b) =>
    (a.customerName || '').localeCompare(b.customerName || '')
  )

  const filteredCustomers = sortedCustomers?.filter((customer) =>
    (customer.customerName || '').toLowerCase().includes(searchTerm)
  )

  return (
    <div>
      <h1>Generate a new Order</h1>
      {currentStep === 3 || currentStep === 4 ? (
        <h4 className="pb-5">{toTitleCase(customerName || '')}</h4>
      ) : (
        <h4 className="invisible">Null</h4>
      )}
      {currentStep === 1 && (
        <div>
          <h3>Step 1: New or Existing Customer</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-5">
            <Button
              variant="select"
              className="p-20"
              onClick={() => handleNextStep()}
            >
              <p className="text-2xl">Existing Customer</p>
            </Button>
            <Button
              variant="select"
              disabled={true}
              className="p-20"
              onClick={() => handleNextStep()}
            >
              <p className="text-2xl">New Customer</p>
            </Button>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div>
          <div className="flex flex-row gap-2 items-center">
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
            {isLoading ? (
              <LoadingWheel text="Loading Customers..." />
            ) : isError ? (
              <p>Error fetching customers: {error.message}</p>
            ) : (
              filteredCustomers?.map((customer: Customer) => (
                <Button
                  key={customer.id}
                  onClick={() =>
                    handleCustomerSelection(
                      customer.id,
                      customer.customerName || '',
                      customer.discount ?? null,
                      customer.groupId || ''
                    )
                  }
                  variant="select"
                  className="p-10"
                >
                  <p className="text-lg">
                    {toTitleCase(customer.customerName || '')}
                  </p>
                </Button>
              ))
            )}
          </div>
        </div>
      )}

      {currentStep === 3 && customerId && (
        <div>
          <div className="flex flex-row gap-2 items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePrevStep()}
            >
              <MoveLeftIcon className="h-4 w-4" />
            </Button>
            <h3>Step 3: Customise Order</h3>
          </div>

          <DeliveryDatePicker
            date={date}
            setDate={setDate}
            label="Select a date for delivery"
          />
          <div className="grid grid-cols-1 gap-6 my-2">
            <CreateOrderCard
              customerId={customerId}
              customerName={customerName}
              currentOrderItems={currentOrderItems}
              setCurrentOrderItems={setCurrentOrderItems}
              customerDiscount={customerDiscount}
              groupId={groupId}
              setOrderNotes={setOrderNotes}
            />
          </div>
          <div className="flex flex-col justify-end items-center gap-4">
            <Button
              className="w-full"
              disabled={currentOrderItems.length === 0 || !date}
              onClick={() => handleNextStep()}
            >
              Confirm Order
            </Button>
            <p className="text-xs">
              This will take you to the Order Summary page
            </p>
          </div>
        </div>
      )}

      {currentStep === 4 && (
        <div>
          <div className="flex flex-row gap-2 items-center">
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
              orderNotes={orderNotes}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default CreateOrderPage
