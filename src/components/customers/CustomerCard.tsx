type CustomerCardProps = {
  groupName: string | undefined;
  customerName: string | null;
  customerId: string | null;
};

import { Link } from "react-router-dom"

import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { toTitleCase } from "@/lib/utils"
import { setCustomerId } from "@/redux/features/customers/customersSlice"
import { useAppDispatch } from "@/redux/hooks"

function CustomerCard({
  groupName,
  customerName,
  customerId,
}: CustomerCardProps) {
  const dispatch = useAppDispatch()
  const formattedCustomerName = customerName
    ?.toLowerCase()
    .replace(/\s+/g, "-")

  const handleClick = () => {
    dispatch(setCustomerId(customerId))
  }

  return (
    <div>
      <Link
        to={`/customers/${groupName}/${formattedCustomerName}`}
        onClick={handleClick}
      >
        <Card>
          <CardHeader className="p-4 hover:bg-accent">
            <CardTitle className="text-lg">
              {toTitleCase(customerName || "")}
            </CardTitle>
          </CardHeader>
        </Card>
      </Link>
    </div>
  )
}

export default CustomerCard
