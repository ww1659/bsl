import { useQuery } from '@tanstack/react-query';
import { createClient } from '@supabase/supabase-js'
import {Database} from '../../../database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;;
const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Fetch data with Supabase
const fetchCustomers = async () => {
  const { data, error } = await supabase
    .from('customers')
    .select('*');

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// Hook that wraps the query in React Query
export const useFetchCustomers = () => {
  return useQuery({queryKey: ['customers'], queryFn: fetchCustomers});
};

