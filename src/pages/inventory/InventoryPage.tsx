import { InventoryTable } from "@/components/inventory/InventoryTable";
import { inventoryTableColumns } from "@/components/inventory/InventoryTableColumns";
import { useFetchItems } from "@/hooks/fetch/useFetchAllItems";

function InventoryPage() {
  const { data, isLoading, isError, error } = useFetchItems();

  return (
    <div className="space-y-4">
      <div className="flex flex-row gap-4 items-center justify-between">
        <h1>Inventory</h1>
      </div>

      <div className="grid gap-x-4 gap-y-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div className="container col-span-4">
          {data && (
            <InventoryTable columns={inventoryTableColumns} data={data} />
          )}
        </div>
      </div>
    </div>
  );
}

export default InventoryPage;
