import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { toTitleCase } from '@/lib/utils';
import type { OrderItem } from '@/schemas';

import { Button } from '../ui/button';
import UpdateItemForm from './UpdateItemForm';

type UpdateItemDialogProps = {
  row: OrderItem;
};

function UpdateItemDropdown({ row }: UpdateItemDialogProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setIsSheetOpen(true);
            }}
          >
            Update Item
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Update Item</SheetTitle>
            <SheetDescription>
              Update the item name or price for{' '}
              <span className="font-bold">{toTitleCase(row.name || '')}</span>.
              Click Update Item when you are done.
            </SheetDescription>
            <UpdateItemForm
              itemId={row.id ?? 0}
              itemName={row.name ?? null}
              itemPrice={row.price ?? null}
              setIsSheetOpen={setIsSheetOpen}
            />
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default UpdateItemDropdown;
