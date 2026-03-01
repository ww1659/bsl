import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useUpdateItem } from '@/hooks/item/useUpdateItem';
import { useToast } from '@/hooks/use-toast';
import { toTitleCase } from '@/lib/utils';

type UpdateItemFormProps = {
  itemId: number;
  itemName: string | null;
  itemPrice: number | null;
  setIsSheetOpen: (open: boolean) => void;
};

const updateItemSchema = z.object({
  itemName: z
    .string()
    .min(1, 'Item must have a name')
    .max(50, 'Item name must be less than 50 characters'),
  itemPrice: z.coerce
    .number()
    .gte(0, 'Price must be greater than £0')
    .lte(500, 'Price cannot exceed £500')
    .refine((val) => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
      message:
        'Price must be a valid currency value with up to 2 decimal places',
    }),
});

function UpdateItemForm({
  itemId,
  itemName,
  itemPrice,
  setIsSheetOpen,
}: UpdateItemFormProps) {
  const updateItem = useUpdateItem();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof updateItemSchema>>({
    resolver: zodResolver(updateItemSchema),
    defaultValues: {
      itemName: toTitleCase(itemName || ''),
      itemPrice: itemPrice || 0,
    },
  });

  function onSubmit(values: z.infer<typeof updateItemSchema>) {
    updateItem.mutate(
      {
        itemId: itemId,
        itemName: values.itemName.toLowerCase(),
        itemPrice: Number(values.itemPrice.toFixed(2)),
      },
      {
        onSuccess: (data) => {
          setIsSheetOpen(false);
          toast({
            title: 'Item Updated',
            description: `Item "${toTitleCase(
              data.item_name || ''
            )}" updated successfully`,
            duration: 5000,
          });
        },
        onError: (error) => {
          toast({
            title: 'Failed to Update Item',
            description: error.message,
            duration: 5000,
          });
        },
      }
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-4 py-4">
          <FormField
            control={form.control}
            name="itemName"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="col-span-1 text-right">
                  Item Name
                </FormLabel>
                <div className="grid gap-2 col-span-3">
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="itemPrice"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="col-span-1 text-right">
                  Price (£)
                </FormLabel>
                <div className="grid gap-2 col-span-3">
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full" variant="default">
          Update Item
        </Button>
      </form>
    </Form>
  );
}

export default UpdateItemForm;
