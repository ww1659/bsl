import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/services/supabase';

type OrderStatus =
  | 'pending'
  | 'ready'
  | 'sent'
  | 'delivered'
  | 'archived'
  | undefined;

type UpdateOrderStatusMutation = {
  orderId: string;
  newStatus: OrderStatus;
};

const updateOrderStatus = async ({
  orderId,
  newStatus,
}: UpdateOrderStatusMutation) => {
  const { data, error } = await supabase
    .from('orders')
    .update({ status: newStatus })
    .eq('id', orderId)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateOrderStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (error) => {
      console.error('Failed to update order status:', error);
    },
  });
};
