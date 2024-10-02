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
import { Button } from "./ui/button";
import { closeDialog } from "@/redux/features/customers/updateCustomerSlice";

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
            Update your customer details here. If you close the dialog no
            changes will be saved.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex flex-row w-full justify-between">
            <Button onClick={handleCloseClick}>Close</Button>
            <Button>Update</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateCustomerDetailsDialog;
