import { useQuery } from '@tanstack/react-query';
import { createClient } from '@supabase/supabase-js'
import {Database} from '../../database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;;
const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

const fetchGroupedCustomers = async (groupName: string) => {
  
  const { data: groupData, error: groupError } = await supabase
    .from('groups')
    .select('id')
    .eq('group_name', groupName)
    .single(); 

  if (groupError) {
    throw new Error(`Group not found: ${groupError.message}`);
  }

  const groupId = groupData?.id;  

  const { data: customersData, error: customersError } = await supabase
    .from('customers')
    .select('*')
    .eq('group_id', groupId);

  if (customersError) {
    throw new Error(`Error fetching customers: ${customersError.message}`);
  }

  return customersData;
};


export const useFetchGroupedCustomers = (groupName: string) => {
    return useQuery({
      queryKey: ['customer-groups', groupName],
      queryFn: () => fetchGroupedCustomers(groupName),
      enabled: !!groupName, 
    });
  };
