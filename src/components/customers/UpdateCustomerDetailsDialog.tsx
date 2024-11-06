type UpdateCustomerDetailsDialogType = {
  customerId: string | null;
};

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { closeDialog } from "@/redux/features/customers/updateCustomerSlice";
import CustomerDetailsForm from "./CustomerDetailsForm";

function UpdateCustomerDetailsDialog({
  customerId,
}: UpdateCustomerDetailsDialogType) {
  const dispatch = useAppDispatch();

  const handleCloseClick = () => {
    dispatch(closeDialog());
  };

  const isDialogOpen = useAppSelector(
    (state) => state.customerDetailsDialog.isOpen
  );

  return (
    <Dialog open={isDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> Update Customer Details</DialogTitle>
          <DialogDescription>
            Update your customer details here.
          </DialogDescription>
        </DialogHeader>
        <CustomerDetailsForm customerId={customerId} />
        <DialogFooter>
          <div className="flex flex-row w-full justify-between"></div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateCustomerDetailsDialog;
