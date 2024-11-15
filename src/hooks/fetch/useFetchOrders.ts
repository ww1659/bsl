import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../connection';

type FetchOrdersParams = {
  startDate?: string;
  groupId?: string;
  orderId?: string;
  status?: string;
};

const fetchOrders = async ({ startDate, groupId, orderId, status }: FetchOrdersParams) => {
  
  let query = supabase
    .from('orders')
    .select(`
      total,
      number,
      delivery_date,
      status,
      notes,
      group_id,
      id,
      order_items (
        quantity,
        items (
          id,
          item_name,
          price
        )
      ),
      groups (
        group_name
      ), 
      customers (
        customer_name
      )
    `)
    .order('delivery_date', { ascending: true });

  if (startDate) {query = query.gte('delivery_date', startDate);}

  if (groupId) {
    query = groupId === 'private' ? query.is('group_id', null) : query.eq('group_id', groupId);
  }

  if (orderId) {
    query = query.eq('id', orderId);
  }

  if (status) {
    query = query.eq('status', status);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }
  
  return data;
};

export const useFetchOrders = (params: FetchOrdersParams) => {
  return useQuery({
    queryKey: ['orders', params],
    queryFn: () => fetchOrders(params)
  });
};
