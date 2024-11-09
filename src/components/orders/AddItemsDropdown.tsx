import { OrderItem } from "@/types";

type ItemsDropDown = {
  currentOrderItems: OrderItem[];
  setCurrentOrderItems: React.Dispatch<React.SetStateAction<OrderItem[]>>;
};

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";

import { useFetchItems } from "@/hooks/useFetchAllItems";

import { toTitleCase } from "@/lib/utils";
import { SelectSeparator } from "@radix-ui/react-select";
import { Plus } from "lucide-react";

function AddItemsDropdown({
  currentOrderItems,
  setCurrentOrderItems,
}: ItemsDropDown) {
  const { data: allItems, isLoading, isError, error } = useFetchItems();

  const sortedItems = allItems?.sort((a, b) =>
    (a.item_name || "").localeCompare(b.item_name || "")
  );

  console.log(currentOrderItems, "SELECT STATEMENT");

  const handleItemAdd = (itemId: string) => {
    const selectedItem = allItems?.find((item) => item.id === Number(itemId));
    if (selectedItem) {
      const itemExists = currentOrderItems.some(
        (orderItem) => orderItem.id === selectedItem.id
      );

      if (!itemExists) {
        setCurrentOrderItems((prevItems) => [
          ...prevItems,
          { ...selectedItem, quantity: 1 },
        ]);
      }
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  if (sortedItems)
    return (
      <Select onValueChange={handleItemAdd}>
        <SelectTrigger>
          <span>Add New Items</span>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Items</SelectLabel>
            <SelectSeparator />
            {sortedItems?.map((item) => {
              const itemExists = currentOrderItems.some(
                (orderItem) => orderItem.id === item.id
              );

              return (
                <SelectItem
                  key={item.id}
                  value={String(item.id)}
                  disabled={itemExists}
                  noCheck={true}
                >
                  {!itemExists && (
                    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                      <Plus className="h-4 w-4" />
                    </span>
                  )}
                  {toTitleCase(item.item_name || "")}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
}

export default AddItemsDropdown;
