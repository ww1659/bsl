type CustomerDetailsForm = {
  customerId: string | null;
};

//zod forms
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

//components
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

//supabase hooks
import { useFetchCustomerById } from "@/hooks/fetch/useFetchCustomerById";
import { toTitleCase } from "@/lib/utils";

const customerDetailsSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  houseNumber: z.union([
    z
      .string()
      .min(1, {
        message: "House Number must be at least 1 character.",
      })
      .optional(),
    z.null(),
    z.literal("0"),
  ]), // allowing null and 0
  street: z.union([
    z
      .string()
      .min(1, {
        message: "Street name must be at least 1 character.",
      })
      .optional(),
    z.null(),
  ]),
  postcode: z.union([
    z
      .string()
      .regex(/^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i, {
        message: "Invalid UK postcode format.",
      })
      .optional(),
    z.null(),
  ]),
  email: z.union([
    z
      .string()
      .email({
        message: "Invalid email address.",
      })
      .optional(),
    z.null(),
  ]),
});

function CustomerDetailsForm({ customerId }: CustomerDetailsForm) {
  const { data, isLoading, isError, error } = useFetchCustomerById(
    customerId || ""
  );

  const form = useForm<z.infer<typeof customerDetailsSchema>>({
    resolver: zodResolver(customerDetailsSchema),
    defaultValues: {
      name: "",
      houseNumber: "",
      street: "",
      postcode: "",
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof customerDetailsSchema>) {
    console.log(values);
  }

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  if (data)
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder={toTitleCase(data.customer_name || "")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="houseNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>House Number</FormLabel>
                <FormControl>
                  <Input placeholder={data.house_number || ""} {...field} />
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
                <FormLabel>Street Name</FormLabel>
                <FormControl>
                  <Input placeholder={data.street_name || ""} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="postcode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postcode</FormLabel>
                <FormControl>
                  <Input placeholder={data.postcode || ""} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer Email</FormLabel>
                <FormControl>
                  <Input placeholder={data.email || ""} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Update
          </Button>
        </form>
      </Form>
    );
}

export default CustomerDetailsForm;
