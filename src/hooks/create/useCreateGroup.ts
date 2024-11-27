import { supabase } from "@/services/supabase";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useToast } from "../use-toast";

type CreateGroupMutation = {
  groupData: {
    groupName: string;
    email: string;
    standardDiscount: number;
    houseNumber: string | undefined;
    streetName: string | undefined;
    town: string | undefined;
    postcode: string | undefined;
    country: string;
  };
};

const createGroup = async ({ groupData }: CreateGroupMutation) => {
  const { data, error } = await supabase
    .from("groups")
    .insert({
      group_name: groupData.groupName,
      email: groupData.email,
      standard_discount: groupData.standardDiscount,
      house_number: groupData.houseNumber,
      street_name: groupData.streetName,
      town: groupData.town,
      postcode: groupData.postcode,
      country: groupData.country,
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useCreateGroup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  return useMutation({
    mutationFn: createGroup,
    onSuccess: (data) => {
      toast({
        title: "Success!",
        description: `Group ${data.group_name} created!`,
      });
      navigate("/customers");
    },
    onError: (error) => {
      console.error("Error creating order:", error.message);
    },
  });
};
