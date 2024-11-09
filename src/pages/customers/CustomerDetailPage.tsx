import { useState } from "react";

//router
import { Link, useParams } from "react-router-dom";

//redux
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setGroupId } from "@/redux/features/groups/groupSlice";

//components
import AnalyticsCard from "@/components/customers/AnalyticsCard";
import StandardOrderCard from "@/components/customers/StandardOrderCard";
import UpdateCustomerForm from "@/components/customers/UpdateCustomerForm";

//ui
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

//utils
import { toTitleCase } from "@/lib/utils";

//supabase hooks
import { useFetchCustomerById } from "@/hooks/useFetchCustomerById";
import { useFetchGroupById } from "@/hooks/useFetchGroupById";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Ellipsis } from "lucide-react";

function CustomerDetailPage() {
  const [isOpen, setIsOpen] = useState(false);
  const { groupName, customerName } = useParams();
  const customerId = useAppSelector((state) => state.customer.customerId);
  const groupId = useAppSelector((state) => state.group.groupId);

  const {
    data: customerData,
    isLoading: isCustomerLoading,
    isError: isCustomerError,
    error: customerError,
  } = useFetchCustomerById(customerId || "");

  const {
    data: groupData,
    isLoading: isGroupLoading,
    isError: isGroupError,
    error: groupError,
  } = useFetchGroupById(groupId || "");

  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setGroupId(groupId));
  };

  if (isCustomerLoading || isGroupLoading) return <p>Loading...</p>;
  if (isCustomerError || isGroupError)
    return <p>Error: {customerError?.message || groupError?.message}</p>;

  return (
    <div>
      <Breadcrumb className="py-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/customers">groups</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link to={`/customers/${groupName}`} onClick={handleClick}>
              {groupName}
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{customerName}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-row justify-between">
        <div>
          <div className="flex flex-row items-center gap-4">
            <h1 className="py-2">
              {toTitleCase(customerData?.customer_name || "")}
            </h1>
          </div>

          <p className="text-muted-foreground text-base">
            {customerData?.house_number &&
              `${toTitleCase(customerData.house_number || "")} `}
            {toTitleCase(customerData?.street_name || "")}
          </p>
          <p className="text-muted-foreground text-base">
            {toTitleCase(customerData?.town || "")}
          </p>
          <p className="text-muted-foreground text-base">
            {(customerData?.postcode || "").toUpperCase()}
          </p>
          {customerData?.email ? (
            <p className="text-muted-foreground text-base">
              {customerData?.email}
            </p>
          ) : (
            <p className="text-muted-foreground text-base">
              {groupData?.email}
              <span className="text-xs italic"> (group email)</span>
            </p>
          )}
        </div>
        <div className="flex flex-row items-start gap-4">
          <Badge
            variant={customerData.is_active ? "success" : "destructive"}
            className="my-2"
          >
            {customerData.is_active ? "Active" : "Archived"}{" "}
          </Badge>
          <Switch className="my-2"></Switch>
          <Button variant="outline" onClick={() => setIsOpen(true)}>
            Update
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <div className="grid">
          <StandardOrderCard customerId={customerId} />
        </div>

        <div className="grid">
          <AnalyticsCard customerId={customerId} />
        </div>
      </div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Customer Details</SheetTitle>
            <SheetDescription>
              Make changes to the customer here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <UpdateCustomerForm
            customerId={customerId}
            customerName={customerData?.customer_name || ""}
            customerHouseNumber={customerData?.house_number || ""}
            customerStreet={customerData?.street_name || ""}
            customerPostcode={customerData?.postcode || ""}
            customerEmail={customerData?.email || ""}
            customerDiscount={customerData?.discount || null}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default CustomerDetailPage;
