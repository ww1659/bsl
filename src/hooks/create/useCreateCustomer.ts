import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useToast } from "../use-toast";
import { supabase } from "@/services/supabase";

type CreateCustomerMutation = {
  customerData: {
    customerName: string;
    email: string | undefined;
    discount: number | undefined;
    houseNumber: string | undefined;
    streetName: string | undefined;
    town: string | undefined;
    postcode: string | undefined;
    country: string;
    groupId: string;
    reference: string;
  };
};

const createCustomer = async ({ customerData }: CreateCustomerMutation) => {
  const { data, error } = await supabase
    .from("customers")
    .insert({
      customer_name: customerData.customerName,
      email: customerData.email,
      discount: customerData.discount,
      house_number: customerData.houseNumber,
      street_name: customerData.streetName,
      town: customerData.town,
      postcode: customerData.postcode,
      country: customerData.country,
      group_id: customerData.groupId,
      reference: customerData.reference,
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useCreateCustomer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  return useMutation({
    mutationFn: createCustomer,
    onSuccess: (data) => {
      toast({
        title: "Success!",
        description: `Customer ${data.customer_name} created!`,
      });
      navigate("/customers");
    },
    onError: (error) => {
      console.error("Error creating order:", error.message);
    },
  });
};
