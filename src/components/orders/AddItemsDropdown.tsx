import { OrderItem } from '@/types';

type ItemsDropDown = {
  currentOrderItems: OrderItem[];
  setCurrentOrderItems: React.Dispatch<React.SetStateAction<OrderItem[]>>;
  disabled?: boolean;
};

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from '@/components/ui/select';

import { useFetchItems } from '@/hooks/fetch/useFetchAllItems';

import { toTitleCase } from '@/lib/utils';
import { SelectSeparator } from '@radix-ui/react-select';
import { Plus } from 'lucide-react';

function AddItemsDropdown({
  currentOrderItems,
  setCurrentOrderItems,
  disabled,
}: ItemsDropDown) {
  const { data: allItems, isLoading, isError, error } = useFetchItems();

  const sortedItems = allItems?.sort((a, b) =>
    (a.name || '').localeCompare(b.name || '')
  );

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
        <SelectTrigger disabled={disabled}>Add New Items</SelectTrigger>
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
                    <span className="absolute left-2">
                      <Plus className="h-4 w-4" />
                    </span>
                  )}
                  {toTitleCase(item.name || '')}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
}

export default AddItemsDropdown;
