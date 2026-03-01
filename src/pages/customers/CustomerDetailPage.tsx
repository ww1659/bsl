import { useState } from 'react';

//router
import { Link, useParams } from 'react-router-dom';

//redux
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setGroupId } from '@/redux/features/groups/groupSlice';

//components
import StandardOrderCard from '@/components/customers/StandardOrderCard';
import UpdateCustomerForm from '@/components/customers/UpdateCustomerForm';

//ui
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/loading';

//utils
import { toTitleCase } from '@/lib/utils';

//supabase hooks
import { useFetchCustomerById } from '@/hooks/customer/useFetchCustomerById';
import { useFetchGroupById } from '@/hooks/group/useFetchGroupById';
import { useToggleActiveCustomer } from '@/hooks/customer/useToggleActiveCustomer';

function CustomerDetailPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { groupName, customerName } = useParams();

  const customerId = useAppSelector((state) => state.customer.customerId);
  const groupId = useAppSelector((state) => state.group.groupId);

  const toggleActiveCustomer = useToggleActiveCustomer();

  const {
    data: customerData,
    isLoading: isCustomerLoading,
    isError: isCustomerError,
    error: customerError,
  } = useFetchCustomerById(customerId || '');

  const {
    data: groupData,
    isLoading: isGroupLoading,
    isError: isGroupError,
    error: groupError,
  } = useFetchGroupById(groupId || '');

  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setGroupId(groupId));
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleToggleActive = () => {
    toggleActiveCustomer.mutate(
      {
        customerId: customerId || '',
        isActive: customerData?.isActive || false,
      },
      {
        onSuccess: () => {
          setDialogOpen(false);
        },
        onError: (error) => {
          console.log('Error:', error);
        },
      }
    );
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

      <div className="flex flex-row items-start justify-between">
        <div>
          <div className="flex flex-row items-center gap-4">
            <h1 className="py-2">
              {toTitleCase(customerData?.customerName || '')}
            </h1>
          </div>

          <p className="text-muted-foreground text-base">
            {customerData?.houseNumber &&
              `${toTitleCase(customerData.houseNumber || '')} `}
            {toTitleCase(customerData?.streetName || '')}
          </p>
          <p className="text-muted-foreground text-base">
            {toTitleCase(customerData?.town || '')}
          </p>
          <p className="text-muted-foreground text-base">
            {(customerData?.postcode || '').toUpperCase()}
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
          <div className="flex flex-row gap-2 items-center my-2">
            <Label className="text-xs" htmlFor="active-customer">
              Active Customer
            </Label>
            <Switch
              id="active-customer"
              className="data-[state=checked]:bg-success"
              checked={customerData?.isActive ?? false}
              onCheckedChange={handleDialogOpen}
            />
          </div>
          <Button variant="outline" onClick={() => setIsSheetOpen(true)}>
            Update
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <div className="grid col-span-2">
          <StandardOrderCard customerId={customerId} />
        </div>
      </div>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Customer Details</SheetTitle>
            <SheetDescription>
              Make changes to the customer here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <UpdateCustomerForm
            customerId={customerId}
            customerName={customerData?.customerName || ''}
            customerHouseNumber={customerData?.houseNumber || ''}
            customerStreet={customerData?.streetName || ''}
            customerPostcode={customerData?.postcode || ''}
            customerEmail={customerData?.email || ''}
            customerDiscount={customerData?.discount || null}
            setIsSheetOpen={setIsSheetOpen}
          />
        </SheetContent>
      </Sheet>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Set the customer {toTitleCase(customerData?.customerName || '')}{' '}
              to {customerData?.isActive ? 'inactive' : 'active'}?
            </DialogTitle>
            {customerData?.isActive ? (
              <DialogDescription>
                The customer will no longer be able to place orders, however,
                their old orders will still be visible.
              </DialogDescription>
            ) : (
              <DialogDescription>
                The customer will now be able to place orders.
              </DialogDescription>
            )}
          </DialogHeader>
          <DialogFooter>
            <div className="flex flex-row gap-4 justify-between w-full">
              <Button variant="secondary" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleToggleActive}>
                {toggleActiveCustomer.isPending ? (
                  <Spinner className="text-secondary" size="sm" />
                ) : (
                  'Confirm'
                )}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CustomerDetailPage;
