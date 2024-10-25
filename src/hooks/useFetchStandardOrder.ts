import { useQuery } from '@tanstack/react-query';
import { createClient } from '@supabase/supabase-js'
import {Database} from '../../database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;;
const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

const fetchStandardOrder = async (customerId: string) => {
  
  const { data, error } = await supabase
  .from('customers')
  .select(`
    id,
    standard_order (
      id,
      order_name,
      standard_order_items (
        quantity,
        items ( id, item_name, price )
      )
    )
  `)
  .eq('id', customerId)
  .single();

if (error) {
  throw new Error(`Error fetching data: ${error.message}`);
}

console.log(data, "IN HOOK");


return data
};

export const useFetchStandardOrder = (customerId: string) => {
  return useQuery({
    queryKey: ['customer-standard-order', customerId], 
    queryFn: () => fetchStandardOrder(customerId),       
    enabled: !!customerId, 
  });
};
