type AddItemDialogProps = { open: boolean; setOpen: (open: boolean) => void };

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import NewItemForm from "./NewItemForm"

function NewItemDialog({ open, setOpen }: AddItemDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Item</DialogTitle>
          <DialogDescription>
            Create a new item here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <NewItemForm setDialogOpen={setOpen} />
      </DialogContent>
    </Dialog>
  )
}

export default NewItemDialog
