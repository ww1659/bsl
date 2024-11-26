import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../connection";

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
