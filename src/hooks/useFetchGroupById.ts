import { useQuery } from '@tanstack/react-query';
import { createClient } from '@supabase/supabase-js'
import {Database} from '../../database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;;
const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

const fetchGroupById = async (groupId: string) => {
  const { data, error } = await supabase
    .from('groups')
    .select('*')
    .eq('id', groupId);

  if (error) {
    throw new Error(error.message);
  }
  return data[0];
};

export const useFetchGroupById = (groupId: string) => {
  return useQuery({
    queryKey: ['groups-id', groupId], 
    queryFn: () => fetchGroupById(groupId), 
    enabled: !!groupId
});
}

