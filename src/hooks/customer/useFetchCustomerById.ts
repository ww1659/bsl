import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/services/supabase';

const fetchCustomerById = async (customerId: string) => {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('id', customerId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  const customerData = {
    id: data.id,
    customerName: data.customer_name,
    email: data.email,
    reference: data.reference,
    discount: data.discount,
    country: data.country,
    town: data.town,
    postcode: data.postcode,
    streetName: data.street_name,
    houseNumber: data.house_number,
    createdAt: data.created_at,
    groupId: data.group_id,
    isActive: data.is_active,
  };

  return customerData;
};

export const useFetchCustomerById = (customerId: string) => {
  return useQuery({
    queryKey: ['customer-by-id', customerId],
    queryFn: () => fetchCustomerById(customerId),
    enabled: !!customerId,
  });
};
