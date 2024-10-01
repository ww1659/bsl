import { useQuery } from '@tanstack/react-query';
import { createClient } from '@supabase/supabase-js'
import {Database} from '../../database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;;
const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

const fetchGroupedCustomers = async (groupId: string) => {
  
  if (groupId !== "null") { 
  const { data: customersData, error: customersError } = await supabase
    .from('customers')
    .select('*')
    .eq('group_id', groupId);

  if (customersError) {
    throw new Error(`Error fetching customers: ${customersError.message}`);
  }

  return customersData;
} else {
    const { data: customersData, error: customersError } = await supabase
      .from('customers')
      .select('*')
      .is('group_id', null);

      if (customersError) {
        throw new Error(`Error fetching customers: ${customersError.message}`);
      }

    return customersData;

  };
}

export const useFetchGroupedCustomers = (groupName: string) => {
    return useQuery({
      queryKey: ['customer-groups', groupName],
      queryFn: () => fetchGroupedCustomers(groupName),
      enabled: !!groupName, 
    });
  };
  
