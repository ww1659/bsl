import { useQuery } from '@tanstack/react-query';
import { createClient } from '@supabase/supabase-js'
import {Database} from '../../../database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;;
const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

const fetchPickingListByOrder = async (startDate: string, endDate: string) => {  

  const { data, error } = await supabase
    .from('orders')
    .select(`
      id,
      number,
      delivery_date,
      status,
      notes,
      group_id,
      customers (customer_name),
      groups (group_name),
      order_items (
        item_id,
        quantity,
        picked,
        items (
          id,
          item_name,
          price
        )
      )
    `)
    .gte('delivery_date', startDate)
    .lte('delivery_date', endDate)
    .order('delivery_date', { ascending: true });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
};

export const useFetchPickingListByOrder = (startDate: string, endDate: string) => {
  return useQuery({
    queryKey: ['picking-list-orders', startDate, endDate], 
    queryFn: () => fetchPickingListByOrder(startDate, endDate)
  });
};

