type GroupDetailsForm = {
  groupId: string | null;
  groupName: string | null;
  groupHouseNumber: string | null;
  groupStreet: string | null;
  groupPostcode: string | null;
  groupEmail: string | null;
  groupStandardDiscount: number | null;
  setIsSheetOpen: (value: boolean) => void;
};

//zod forms
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

//components
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useUpdateGroup } from "@/hooks/group/useUpdateGroup"
import { useToast } from "@/hooks/use-toast"
//utils
import { toTitleCase } from "@/lib/utils"

const groupDetailsSchema = z.object({
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
  email: z.string().email({
    message: "Invalid email address.",
  }),
  standardDiscount: z.coerce
    .number()
    .gte(0, "Discount must be positive!")
    .lte(100, "Discount cannot exceed 100%"),
})

function UpdateGroupForm({
  groupId,
  groupName,
  groupHouseNumber,
  groupStreet,
  groupPostcode,
  groupEmail,
  groupStandardDiscount,
  setIsSheetOpen,
}: GroupDetailsForm) {
  const updateGroup = useUpdateGroup()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof groupDetailsSchema>>({
    resolver: zodResolver(groupDetailsSchema),
    defaultValues: {
      name: toTitleCase(groupName || ""),
      houseNumber: toTitleCase(groupHouseNumber || ""),
      street: toTitleCase(groupStreet || ""),
      postcode: groupPostcode?.toLocaleUpperCase() || "",
      email: groupEmail || "",
      standardDiscount: groupStandardDiscount || 0,
    },
  })

  function onSubmit(values: z.infer<typeof groupDetailsSchema>) {
    const groupData = {
      groupId: groupId || "",
      groupName: values.name.toLowerCase(),
      groupHouseNumber: (values.houseNumber || "").toLowerCase(),
      groupStreet: (values.street || "").toLowerCase(),
      groupPostcode: (values.postcode || "").toLowerCase(),
      groupEmail: values.email.toLowerCase(),
      groupStandardDiscount: values.standardDiscount,
    }
    updateGroup.mutate(groupData, {
      onSuccess: () => {
        setIsSheetOpen(false)
        toast({
          title: "Success!",
          description: "Group Details Updated",
          duration: 3000,
        })
      },
    })
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
                    placeholder={toTitleCase(groupName || "")}
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
            name="standardDiscount"
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
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Form>
  )
}

export default UpdateGroupForm
