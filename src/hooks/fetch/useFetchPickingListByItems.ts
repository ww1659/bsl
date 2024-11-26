import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../connection";

const fetchPickingListItems = async (startDate: string, endDate: string) => {
  const { data, error } = await supabase.rpc("get_picking_list_by_date_range", {
    start_date: startDate,
    end_date: endDate,
  });

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return data;
};

export const useFetchPickingListByItem = (
  startDate: string,
  endDate: string
) => {
  return useQuery({
    queryKey: ["picking-list-items", startDate, endDate],
    queryFn: () => fetchPickingListItems(startDate, endDate),
  });
};
