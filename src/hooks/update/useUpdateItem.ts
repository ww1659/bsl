import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../connection";

type UpdateItemProps = {
  itemId: number;
  itemName: string;
  itemPrice: number;
};

const updateItem = async ({ itemId, itemName, itemPrice }: UpdateItemProps) => {
  const { data, error } = await supabase
    .from("items")
    .update({
      item_name: itemName,
      price: itemPrice,
    })
    .eq("id", itemId)
    .select();

  if (error) throw new Error(error.message);

  return data[0];
};

export const useUpdateItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
    onError: (error) => {
      console.error("Failed to pdate items:", error);
    },
  });
};
