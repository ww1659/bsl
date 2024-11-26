import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { useCreateGroup } from "@/hooks/create/useCreateGroup";

const ukPostcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i;

const newGroupSchema = z.object({
  groupName: z
    .string()
    .min(1, "Group must have a name")
    .max(50, "Group name must be less than 50 characters"),
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
    .max(50, "Email must be less than 50 characters"),
  discount: z.coerce
    .number()
    .gte(0, "Discount must be postive!")
    .lte(100, "Discount cannot exceed 100%")
    .int("Value must be a whole number"),
});

function NewGroupForm() {
  const { mutate: createGroup } = useCreateGroup();

  const form = useForm<z.infer<typeof newGroupSchema>>({
    resolver: zodResolver(newGroupSchema),
    defaultValues: {
      groupName: "",
      houseNumber: "",
      street: "",
      town: "",
      postcode: "",
      email: "",
      discount: 10,
    },
  });

  function onSubmit(values: z.infer<typeof newGroupSchema>) {
    const groupData = {
      groupName: values.groupName.toLowerCase(),
      email: values.email.toLowerCase(),
      standardDiscount: values.discount,
      houseNumber: values.houseNumber?.toLowerCase(),
      streetName: values.street?.toLowerCase(),
      town: values.town?.toLowerCase(),
      postcode: values.postcode?.toLowerCase(),
      country: "uk",
    };
    createGroup({ groupData });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="groupName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Group Name* <span className="text-xs italic">required</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Orange Roofs" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email* <span className="text-xs italic">required</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="example@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Discount (%)* <span className="text-xs italic">required</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="10" {...field} />
                </FormControl>
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

export default NewGroupForm;
