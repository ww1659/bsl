import { useQuery } from "@tanstack/react-query";

import { supabase } from "@/services/supabase";

const fetchCustomers = async () => {
  const { data, error } = await supabase.from("customers").select("*");

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const useFetchCustomers = () => {
  return useQuery({ queryKey: ["customers"], queryFn: fetchCustomers });
};
