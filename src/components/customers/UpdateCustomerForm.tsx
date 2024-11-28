type CustomerDetailsForm = {
  customerId: string | null;
  customerName: string | null;
  customerHouseNumber: string | null;
  customerStreet: string | null;
  customerPostcode: string | null;
  customerEmail: string | null;
  customerDiscount: number | null;
  setIsSheetOpen: (value: boolean) => void;
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

//utils
import { toTitleCase } from "@/lib/utils";
import { useUpdateCustomer } from "@/hooks/update/useUpdateCustomer";
import { useToast } from "@/hooks/use-toast";
import { Spinner } from "../ui/loading";

const customerDetailsSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  houseNumber: z
    .union([
      z.string().min(1, {
        message: "House Number must be at least 1 character.",
      }),
      z.null(),
      z.literal(""),
    ])
    .optional(),
  street: z
    .union([
      z.string().min(1, {
        message: "Street name must be at least 1 character.",
      }),
      z.null(),
      z.literal(""),
    ])
    .optional(),
  postcode: z
    .union([
      z.string().regex(/^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i, {
        message: "Invalid UK postcode format.",
      }),
      z.null(),
      z.literal(""),
    ])
    .optional(),
  email: z
    .union([
      z.string().email({
        message: "Invalid email address.",
      }),
      z.null(),
      z.literal(""),
    ])
    .optional(),
  discount: z.coerce
    .number()
    .gte(0, "Discount must be positive!")
    .lte(100, "Discount cannot exceed 100%"),
});

function UpdateCustomerForm({
  customerId,
  customerName,
  customerHouseNumber,
  customerStreet,
  customerPostcode,
  customerEmail,
  customerDiscount,
  setIsSheetOpen,
}: CustomerDetailsForm) {
  const { toast } = useToast();
  const updateCustomer = useUpdateCustomer();

  const form = useForm<z.infer<typeof customerDetailsSchema>>({
    resolver: zodResolver(customerDetailsSchema),
    defaultValues: {
      name: toTitleCase(customerName || ""),
      houseNumber: toTitleCase(customerHouseNumber || ""),
      street: toTitleCase(customerStreet || ""),
      postcode: customerPostcode?.toLocaleUpperCase() || "",
      email: customerEmail || "",
      discount: customerDiscount || 0,
    },
  });

  function onSubmit(values: z.infer<typeof customerDetailsSchema>) {
    const customerData = {
      customerId: customerId || "",
      customerName: values.name.toLowerCase(),
      customerHouseNumber: (values.houseNumber || "").toLowerCase(),
      customerStreet: (values.street || "").toLowerCase(),
      customerPostcode: (values.postcode || "").toLowerCase(),
      customerEmail: values.email?.toLowerCase() || "",
      customerDiscount: values.discount,
    };
    updateCustomer.mutate(customerData, {
      onSuccess: () => {
        setIsSheetOpen(false);
        toast({
          title: "Success!",
          description: "Customer Details Updated",
          duration: 3000,
        });
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-x-4">
                <FormLabel className="text-right">Name</FormLabel>
                <FormControl className="col-span-3">
                  <Input
                    placeholder={toTitleCase(customerName || "")}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="col-span-4 text-right" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="houseNumber"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-x-4">
                <FormLabel className="text-right">House Number</FormLabel>
                <FormControl className="col-span-3">
                  <Input
                    placeholder="e.g. 2a"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage className="col-span-4 text-right" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-x-4">
                <FormLabel className="text-right">Street</FormLabel>
                <FormControl className="col-span-3">
                  <Input
                    placeholder="e.g. High Street"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage className="col-span-4 text-right" />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="postcode"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-x-4">
                <FormLabel className="text-right">Postcode</FormLabel>
                <FormControl className="col-span-3">
                  <Input
                    placeholder="e.g. TW1 3QS"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage className="col-span-4 text-right" />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-x-4">
                <FormLabel className="text-right">Email</FormLabel>
                <FormControl className="col-span-3">
                  <Input
                    placeholder="e.g. johndoe@gmail.com"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage className="col-span-4 text-right" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discount"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-x-4">
                <FormLabel className="text-right">Discount (%)</FormLabel>
                <FormControl className="col-span-3">
                  <Input
                    type="number"
                    placeholder="Standard Group Discount"
                    {...field}
                    value={field.value || 0}
                  />
                </FormControl>
                <FormMessage className="col-span-4 text-right" />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row justify-end pt-4">
          <Button type="submit" className="w-full">
            {updateCustomer.isPending ? (
              <Spinner size="sm" className="text-secondary" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default UpdateCustomerForm;
