import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/services/supabase";

const fetchGroups = async () => {
  const { data, error } = await supabase.from("groups").select("*");

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const useFetchGroups = () => {
  return useQuery({
    queryKey: ["groups"],
    queryFn: fetchGroups,
  });
};
