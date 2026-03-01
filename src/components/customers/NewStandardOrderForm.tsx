import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFetchItems } from "@/hooks/item/useFetchItems";
import { useCreateStandardOrder } from "@/hooks/standardOrder/useCreateStandardOrder";
import { useToast } from "@/hooks/use-toast";
import { toTitleCase } from "@/lib/utils";

type StandardOrderForm = {
  customerId: string;
  handleSaveNewOrder: () => void;
};

const orderItemSchema = z.object({
  id: z.number().min(1, "Item must be selected"),
  quantity: z.coerce.number().min(1, "Must be at least 1"),
});

const newStandardOrderSchema = z.object({
  orderName: z
    .string()
    .min(1, "Order must have a name")
    .max(50, "Order name must be less than 50 characters"),
  orderItems: z
    .array(orderItemSchema)
    .min(1, "Must have at least one order item"),
});

function NewStandardOrderForm({
  customerId,
  handleSaveNewOrder,
}: StandardOrderForm) {
  const { toast } = useToast();
  const [selectedItemNames, setSelectedItemNames] = useState<{
    [key: string]: string;
  }>({});

  const { data, isLoading, isError, error } = useFetchItems();
  const createStandardOrder = useCreateStandardOrder();

  const sortedItems = data?.sort((a, b) =>
    (a.name || "").localeCompare(b.name || "")
  );

  const form = useForm<z.infer<typeof newStandardOrderSchema>>({
    resolver: zodResolver(newStandardOrderSchema),
    defaultValues: {
      orderName: "",
      orderItems: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "orderItems",
  });

  const handleSelectChange = (
    index: number,
    value: number,
    itemName: string
  ) => {
    form.setValue(`orderItems.${index}.id`, value);
    setSelectedItemNames((prev) => ({ ...prev, [index]: itemName }));
  };

  const handleRemoveItem = (index: number) => {
    remove(index);
    setSelectedItemNames((prev) => {
      const newSelectedItemNames = { ...prev };
      delete newSelectedItemNames[index];

      const updatedSelectedItemNames: { [key: string]: string } = {};
      Object.keys(newSelectedItemNames).forEach((key) => {
        const newIndex =
          parseInt(key) > index ? parseInt(key) - 1 : parseInt(key);
        updatedSelectedItemNames[newIndex] = newSelectedItemNames[key];
      });

      return updatedSelectedItemNames;
    });
  };

  function onSubmit(values: z.infer<typeof newStandardOrderSchema>) {
    createStandardOrder.mutate(
      {
        customerId: customerId,
        orderName: values.orderName,
        orderItems: values.orderItems,
      },
      {
        onSuccess: (data) => {
          toast({
            title: "Order Created",
            description: `Order "${toTitleCase(
              data.order.order_name || ""
            )}" created successfully`,
            duration: 5000,
          });
          handleSaveNewOrder();
        },
      }
    );
  }

  const selectedOrderItems = form.watch("orderItems");

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col gap-6">
          <FormField
            control={form.control}
            name="orderName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Standard Order Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Default Order" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-4">
              <FormLabel className="text-lg">Standard Order Items</FormLabel>
              <Button
                className="w-fill"
                size="sm"
                type="button"
                variant="outline"
                onClick={() => append({ id: 0, quantity: 1 })}
              >
                <div className="flex flex-row items-center">
                  <Plus className="w-4 h-4" />
                  <p>Add Item</p>
                </div>
              </Button>
            </div>
            {fields.map((field, index) => (
              <div key={field.id} className="grid grid-cols-6 items-end gap-4">
                <div className="grid col-span-3">
                  <FormField
                    control={form.control}
                    name={`orderItems.${index}.id`}
                    render={({ field }) => (
                      <FormItem>
                        {index === 0 ? (
                          <div className="flex flex-col gap-2 justify-between">
                            <FormLabel>Item Name</FormLabel>
                            <FormMessage />
                          </div>
                        ) : (
                          <FormMessage />
                        )}
                        <FormControl>
                          <Select
                            value={field.value.toString()}
                            onValueChange={(value) =>
                              handleSelectChange(
                                index,
                                Number(value),
                                sortedItems?.find(
                                  (item) => item.id === Number(value)
                                )?.name || ""
                              )
                            }
                          >
                            <SelectTrigger className="">
                              <SelectValue placeholder="Select Item" />
                              {toTitleCase(
                                selectedItemNames[index] || "Select Item"
                              )}
                            </SelectTrigger>
                            <SelectContent>
                              {sortedItems
                                ?.filter(
                                  (item) =>
                                    !selectedOrderItems.some(
                                      (selectedItem) =>
                                        selectedItem.id === item.id
                                    )
                                )
                                .map((item) => (
                                  <SelectItem
                                    key={item.id}
                                    value={item.id.toString()}
                                  >
                                    {toTitleCase(item.name || "")}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid col-span-2 justify-center">
                  <FormField
                    control={form.control}
                    name={`orderItems.${index}.quantity`}
                    render={({ field }) => (
                      <FormItem>
                        {index === 0 && (
                          <div className="flex flex row gap-2 justify-between py-1">
                            <FormLabel>Quantity</FormLabel>
                            <FormMessage />
                          </div>
                        )}
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            placeholder="Quantity"
                            min={1}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid col-span-1 justify-start">
                  <Button
                    type="button"
                    variant="destructive"
                    size="xs"
                    onClick={() => handleRemoveItem(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-row justify-end">
          <Button
            type="submit"
            className="w-fill"
            variant="default"
            disabled={form.watch("orderItems").length < 1}
          >
            Create Standard Order
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default NewStandardOrderForm;
