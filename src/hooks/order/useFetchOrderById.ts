import { useQuery } from "@tanstack/react-query";

import { supabase } from "@/services/supabase";

const fetchOrderById = async (orderId: string) => {
  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items (*), groups (*), customers (*)")
    .eq("id", orderId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useFetchOrderById = (orderId: string) => {
  return useQuery({
    queryKey: ["order-id", orderId],
    queryFn: () => fetchOrderById(orderId),
    enabled: !!orderId,
  });
};
