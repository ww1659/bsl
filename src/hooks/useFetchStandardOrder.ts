import { useQuery } from '@tanstack/react-query';
import { createClient } from '@supabase/supabase-js'
import { Database } from '../../database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

const fetchStandardOrders = async (customerId: string) => {
  const { data, error } = await supabase
    .from('customers')
    .select(`
      standard_order (
        id,
        order_name,
        standard_order_items (
          quantity,
          items ( id, item_name, price )
        )
      )
    `)
    .eq('id', customerId);

  if (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }

  if (!data || data.length === 0) {
    return [];
  }

  const standardOrders = data[0].standard_order.map((order) => ({
    id: order.id,
    order_name: order.order_name,
    order_items: order.standard_order_items.map((item) => ({
      id: item.items?.id,
      item_name: item.items?.item_name,
      price: item.items?.price,
      quantity: item.quantity,
    })),
  }));

  return standardOrders;
};

export const useFetchStandardOrders = (customerId: string) => {
  return useQuery({
    queryKey: ['customer-standard-orders', customerId],
    queryFn: () => fetchStandardOrders(customerId),
    enabled: !!customerId,
  });
};
