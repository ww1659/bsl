
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@supabase/supabase-js'
import {Database} from '../../database.types'
import { getEndOfWeek, getStartOfWeek } from '@/lib/utils';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;;
const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);


const fetchWeeklyOrderTotal = async (): Promise<number | null> => {
    const today = new Date();
    const startOfWeek = getStartOfWeek(today);
    const endOfWeek = getEndOfWeek(today); 
    
    const { data, error } = await supabase
    .rpc('get_weekly_total', { start_date: startOfWeek, end_date: endOfWeek });

  if (error) {
    throw new Error(error.message);
  }

  return data;
  };

export const useFetchWeeklyTotal = () => {
  return useQuery({
    queryKey: ['weekly-total'], 
    queryFn: fetchWeeklyOrderTotal
});
};

