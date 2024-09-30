import { useQuery } from '@tanstack/react-query';
import { createClient } from '@supabase/supabase-js'
import {Database} from '../../database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;;
const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

const fetchStandardOrder = async (customerName: string) => {

    const { data: customerData, error: customerError } = await supabase
    .from('customers')
    .select('id')
    .eq('customer_name', customerName)
    .single(); 

  if (customerError) {
    throw new Error(`Group not found: ${customerError.message}`);
  }

  const customerId = customerData?.id;  

  const { data: orderData, error: orderError } = await supabase
    .from('standard_order')
    .select('*')
    .eq('customer_id', customerId);

  if (orderError) {
    throw new Error(orderError.message);
  }
  return orderData;
};

export const useFetchStandardOrder = (customerName: string) => {
  return useQuery({
    queryKey: ['customer-standard-order', customerName], 
    queryFn: () => fetchStandardOrder(customerName),       
    enabled: !!customerName, 
  });
};
