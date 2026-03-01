import { useQuery } from "@tanstack/react-query";

import { supabase } from "@/services/supabase";

const fetchItems = async () => {
  const { data, error } = await supabase
    .from("items")
    .select("*")
    .order("item_name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  const itemsData = data.map((item) => {
    return {
      id: item.id,
      name: item.item_name,
      loanedOut: item.loaned_out,
      price: item.price,
      stock: item.stock,
      createdAt: item.created_at,
    };
  });

  return itemsData;
};

export const useFetchItems = () => {
  return useQuery({ queryKey: ["items"], queryFn: fetchItems });
};
