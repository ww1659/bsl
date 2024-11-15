import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../connection';

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
    queryKey: ['customer-by-id', customerId], 
    queryFn: () => fetchCustomerById(customerId), 
    enabled: !!customerId
});
}

