import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useFetchGroups } from "@/hooks/useFetchGroups";
import { toTitleCase } from "@/lib/utils";
import { useCreateCustomer } from "@/hooks/create/useCreateCustomer";

const ukPostcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i;

const newCustomerSchema = z.object({
  customerName: z
    .string()
    .min(1, "Customer must have a name")
    .max(50, "Customer name must be smaller than 50 characters"),
  houseNumber: z.string().optional(),
  street: z.string().optional(),
  town: z.string().optional(),
  postcode: z
    .string()
    .optional()
    .refine((val) => !val || ukPostcodeRegex.test(val), {
      message: "Invalid UK postcode",
    }),
  email: z
    .string()
    .email("Invalid email address")
    .max(50, "Email must be less than 50 characters")
    .optional()
    .or(z.literal("")),
  discount: z.coerce
    .number()
    .gte(0, "Discount must be positive!")
    .lte(100, "Discount cannot exceed 100%")
    .optional()
    .transform((val) => (val === undefined ? undefined : val)),
  group: z
    .string()
    .min(1, "Group must have a name")
    .max(50, "Group name must be between 2 and 50 characters"),
  reference: z
    .string()
    .min(1, "No reference")
    .max(50, "Reference must be less than 50 characters"),
});

function NewCustomerForm() {
  const { mutate: createCustomer } = useCreateCustomer();

  const { data } = useFetchGroups();

  const form = useForm<z.infer<typeof newCustomerSchema>>({
    resolver: zodResolver(newCustomerSchema),
    defaultValues: {
      customerName: "",
      houseNumber: "",
      street: "",
      town: "",
      postcode: "",
      email: "",
      discount: 20,
      group: "",
      reference: "",
    },
  });

  function onSubmit(values: z.infer<typeof newCustomerSchema>) {
    console.log(values);
    const customerData = {
      customer_name: values.customerName.toLowerCase(),
      email: values.email?.toLowerCase(),
      discount: values.discount,
      house_number: values.houseNumber?.toLowerCase(),
      street_name: values.street?.toLowerCase(),
      town: values.town?.toLowerCase(),
      postcode: values.postcode?.toLowerCase(),
      country: "uk",
      group_id: values.group,
      reference: values.reference,
    };
    console.log(customerData);
    createCustomer({ customerData });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="customerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer Name* </FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Orange Roofs" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="reference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reference*</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. CH1" {...field} />
                </FormControl>
                <FormDescription className="text-xs">
                  This will be used to reference invoices
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="group"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Group*</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a group" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {data?.map((group) => (
                      <SelectItem key={group.id} value={group.id}>
                        {toTitleCase(group.group_name || "")}
                      </SelectItem>
                    ))}
                    <SelectItem value="private">Private Customer</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription className="text-xs">
                  Select 'Private Customer' for customers not in a group
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@gmail.com" {...field} />
                </FormControl>
                <FormDescription className="text-xs">
                  The group email address will be used if nothing is input here
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discount (%)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 10" {...field} />
                </FormControl>
                <FormDescription className="text-xs">
                  This will take priority over the standard group discount
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <h3>Address (optional)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="houseNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>House Number / Name</FormLabel>
                <FormControl>
                  <Input placeholder="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street</FormLabel>
                <FormControl>
                  <Input placeholder="Grange Cliffe Close" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="town"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Town / City</FormLabel>
                <FormControl>
                  <Input placeholder="Sheffield" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postcode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postcode</FormLabel>
                <FormControl>
                  <Input placeholder="S11 9JE" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full" variant="default">
          Create
        </Button>
      </form>
    </Form>
  );
}

export default NewCustomerForm;
