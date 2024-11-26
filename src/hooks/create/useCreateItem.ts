import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../connection";

type CreateItem = {
  itemName: string;
  price: number;
  stock: number;
};

const createItem = async ({ itemName, price, stock }: CreateItem) => {
  const { data, error } = await supabase
    .from("items")
    .insert({
      item_name: itemName,
      price: price,
      stock: stock,
      loaned_out: 0,
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  const newItem = {
    id: data.id,
    itemName: data.item_name,
    price: data.price,
    stock: data.stock,
    loanedOut: data.loaned_out,
  };

  return newItem;
};

export const useCreateItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
};
