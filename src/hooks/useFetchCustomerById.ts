import { useQuery } from '@tanstack/react-query';
import { createClient } from '@supabase/supabase-js'
import {Database} from '../../database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;;
const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

const fetchCustomerById = async (customerId: string) => {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('id', customerId);

  if (error) {
    throw new Error(error.message);
  }
  return data[0];
};

export const useFetchCustomerById = (customerId: string) => {
  return useQuery({
    queryKey: ['customerById', customerId], 
    queryFn: () => fetchCustomerById(customerId), 
    enabled: !!customerId
});
}

