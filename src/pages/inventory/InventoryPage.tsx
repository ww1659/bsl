import { InventoryTable } from "@/components/inventory/InventoryTable";
import { inventoryTableColumns } from "@/components/inventory/InventoryTableColumns";
import { Button } from "@/components/ui/button";
import { useFetchItems } from "@/hooks/fetch/useFetchAllItems";
import { useState } from "react";
import NewItemDialog from "@/components/inventory/NewItemDialog";
import { Plus } from "lucide-react";

function InventoryPage() {
  const { data, isLoading, isError, error } = useFetchItems();
  const [itemDialogOpen, setItemDialogOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex flex-row gap-4 justify-between items-end gap-2">
        <h1>Inventory</h1>
        <Button onClick={() => setItemDialogOpen(true)}>
          <div className="flex flex-row gap-2 items-center">
            <Plus className="h-5 w-5" />
            <p>Add New Item</p>
          </div>
        </Button>
      </div>

      <div className="grid gap-x-4 gap-y-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div className="container col-span-4">
          {data && (
            <InventoryTable columns={inventoryTableColumns} data={data} />
          )}
        </div>
      </div>

      <NewItemDialog open={itemDialogOpen} setOpen={setItemDialogOpen} />
    </div>
  );
}

export default InventoryPage;
