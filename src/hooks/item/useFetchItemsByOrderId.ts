import { useQuery } from '@tanstack/react-query';

import { supabase } from '@/services/supabase';

const fetchItemsByOrderId = async (orderId: string) => {
  const { data, error } = await supabase
    .from('order_items')
    .select('*, items(*)')
    .eq('order_id', orderId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useFetchItemsByOrderId = (orderId: string) => {
  return useQuery({
    queryKey: ['order-items', orderId],
    queryFn: () => fetchItemsByOrderId(orderId),
    enabled: !!orderId,
  });
};
