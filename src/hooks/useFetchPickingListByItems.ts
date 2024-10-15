import { useQuery } from '@tanstack/react-query';
import { createClient } from '@supabase/supabase-js'
import {Database} from '../../database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;;
const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

const fetchPickingListItems = async (startDate: string, endDate: string) => {

  const { data, error } = await supabase
  .rpc('get_picking_list_by_item_range', {
    start_date: startDate,
    end_date: endDate,
  });

  if (error) {
      console.log(error);
      throw new Error(error.message);
    }

    console.log(data);
    return data;
};

export const useFetchPickingListByItem = (startDate: string, endDate: string) => {
  return useQuery({
    queryKey: ['picking-list-items', startDate, endDate], 
    queryFn: () => fetchPickingListItems(startDate, endDate)
});
};

