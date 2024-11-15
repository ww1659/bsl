import { useQuery } from '@tanstack/react-query';
import { createClient } from '@supabase/supabase-js'
import {Database} from '../../../database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;;
const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Fetch data with Supabase
const fetchGroups = async () => {
  const { data, error } = await supabase
    .from('groups')
    .select('*');

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// Hook that wraps the query in React Query
export const useFetchGroups = () => {
  return useQuery({queryKey: ['groups'], queryFn: fetchGroups});
};

