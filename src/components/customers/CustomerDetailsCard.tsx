type CustomerDetailsCard = {
  customerId: string | null;
  groupId: string | null;
};

//redux
//ui
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
//supabase hooks
import { useFetchCustomerById } from "@/hooks/customer/useFetchCustomerById"
import { useFetchGroupById } from "@/hooks/group/useFetchGroupById"
//components
//utils
import { toTitleCase } from "@/lib/utils"
import { openDialog } from "@/redux/features/customers/updateCustomerSlice"
import { useAppDispatch } from "@/redux/hooks"

import { Button } from "../ui/button"

function CustomerDetailsCard({ customerId, groupId }: CustomerDetailsCard) {
  const dispatch = useAppDispatch()

  const {
    data: customerData,
    isLoading: isCustomerLoading,
    isError: isCustomerError,
    error: customerError,
  } = useFetchCustomerById(customerId || "")

  const { data, isLoading, isError, error } = useFetchGroupById(groupId || "")

  let groupData = null
  let isGroupLoading = false
  let isGroupError = false
  let groupError = null

  if (groupId !== "null") {
    groupData = data
    isGroupLoading = isLoading
    isGroupError = isError
    groupError = error
  }

  const handleClick = () => {
    dispatch(openDialog())
  }

  if (isCustomerLoading) return <p>Loading...</p>
  if (isCustomerError) return <p>Error: {customerError.message}</p>

  if (isGroupLoading) return <p>Loading...</p>
  if (groupId && groupError) {
    if (isGroupError) return <p>Error: {groupError.message}</p>
  }

  if (customerData)
    return (
      <>
        <Card className="flex flex-col justify-between">
          <div>
            <CardHeader>
              <div className="flex flex-row justify-between">
                <div>
                  <CardTitle className="text-3xl">Customer Details</CardTitle>
                  <CardDescription>Update or view here</CardDescription>
                </div>
                <Button size="sm" onClick={handleClick}>
                  Edit
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="pb-2">
                <div className="flex flex-row">
                  <p className="underline">Address</p>
                </div>
                <div className="flex flex-row align-center flex-wrap">
                  <p className="pr-1 text-sm">House Number:</p>
                  <p className="font-bold text-sm">
                    {customerData.houseNumber}
                  </p>
                </div>
                <div className="flex flex-row align-center flex-wrap">
                  <p className="pr-1 text-sm">Street:</p>
                  <p className="font-bold text-sm">
                    {toTitleCase(customerData?.streetName || "")}
                  </p>
                </div>

                <div className="flex flex-row align-center flex-wrap">
                  <p className="pr-1 text-sm">Postcode:</p>
                  <p className="font-bold text-sm">
                    {customerData.postcode?.toUpperCase()}
                  </p>
                </div>
                <div className="flex flex-row align-center flex-wrap">
                  <p className="pr-1 text-sm">Email:</p>
                  <p className="font-bold text-sm">{customerData.email}</p>
                </div>
              </div>

              <div className="pb-2">
                <div className="flex flex-row">
                  <p className="underline">Group</p>
                </div>
                <div className="flex flex-row align-center flex-wrap">
                  <p className="pr-1 text-sm">Name:</p>
                  <p className="font-bold text-sm">
                    {groupData
                      ? toTitleCase(groupData.groupName)
                      : "Private Customer"}
                  </p>
                </div>
                <div className="flex flex-row align-center flex-wrap">
                  <p className="pr-1 text-sm">Email:</p>
                  <p className="font-bold text-sm">
                    {groupData ? groupData.email?.toLowerCase() : ""}
                  </p>
                </div>
              </div>

              <div className="p-0">
                <div className="flex flex-row">
                  <p className="underline">Invoice Info</p>
                </div>
                <div className="flex flex-row align-center flex-wrap">
                  <p className="pr-1 text-sm">Reference:</p>
                  <p className="pr-1 text-sm font-bold">
                    {toTitleCase(customerData.reference || "")}
                  </p>
                </div>
                <div className="flex flex-row align-center flex-wrap">
                  <p className="pr-1 text-sm">Discount:</p>
                  <p className="font-bold text-sm">{customerData.discount}%</p>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
        {/* <UpdateCustomerDetailsDialog customerId={customerId} /> */}
      </>
    )
}

export default CustomerDetailsCard
