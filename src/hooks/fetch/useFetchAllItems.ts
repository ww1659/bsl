import { useQuery } from '@tanstack/react-query';
import { createClient } from '@supabase/supabase-js'
import {Database} from '../../../database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;;
const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

const fetchItems = async () => {
  const { data, error } = await supabase
    .from('items')
    .select('*');

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const useFetchItems = () => {
  return useQuery({queryKey: ['items'], queryFn: fetchItems});
};

