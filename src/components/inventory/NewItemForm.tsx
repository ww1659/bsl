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
import { useCreateItem } from '@/hooks/item/useCreateItem';
import { useToast } from '@/hooks/use-toast';
import { toTitleCase } from '@/lib/utils';

type NewItemFormProps = { setDialogOpen: (open: boolean) => void };

const newItemSchema = z.object({
  itemName: z
    .string()
    .min(1, 'Item must have a name')
    .max(50, 'Item name must be less than 50 characters'),
  price: z.coerce
    .number()
    .gte(0, 'Price must be greater than £0')
    .lte(500, 'Price cannot exceed £500'),
  stock: z.coerce
    .number()
    .gte(0, 'Stock must be greater than 0')
    .int('Value must be a whole number'),
});

function NewItemForm({ setDialogOpen }: NewItemFormProps) {
  const createNewItem = useCreateItem();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof newItemSchema>>({
    resolver: zodResolver(newItemSchema),
  });

  function onSubmit(values: z.infer<typeof newItemSchema>) {
    createNewItem.mutate(
      {
        itemName: values.itemName.toLowerCase(),
        price: Number(values.price.toFixed(2)),
        stock: values.stock,
      },
      {
        onSuccess: (data) => {
          setDialogOpen(false);
          toast({
            title: 'New Item Created',
            description: `Item "${toTitleCase(
              data.itemName || ''
            )}" created successfully`,
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
                    <Input placeholder="e.g. Towel" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="col-span-1 text-right">
                  Price (£)
                </FormLabel>
                <div className="grid gap-2 col-span-3">
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="e.g. 2.99"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="col-span-1 text-right">Stock</FormLabel>
                <div className="grid gap-2 col-span-3">
                  <FormControl>
                    <Input type="number" placeholder="e.g. 12" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full" variant="default">
          Add Item
        </Button>
      </form>
    </Form>
  );
}

export default NewItemForm;
