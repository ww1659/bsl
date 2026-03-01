import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/services/supabase';
import { toSnakeCase } from '@/lib/utils';
import { z } from 'zod';
import { OrderItem } from '@/schemas';

type UpdateStandardOrderInput = {
  orderId: number;
  orderItems: OrderItem[];
};

const standardOrderItemInsertSchema = z.object({
  standard_order_id: z.number(),
  item_id: z.number().nullable(),
  quantity: z.number(),
});

const updateStandardOrder = async ({
  orderId,
  orderItems,
}: UpdateStandardOrderInput) => {
  const { error: deleteError } = await supabase
    .from('standard_order_items')
    .delete()
    .eq('standard_order_id', orderId);

  if (deleteError) throw new Error(deleteError.message);

  const parsedItems = orderItems.map((item) => {
    const itemSnakeCaseData = toSnakeCase({
      standardOrderId: orderId,
      itemId: item.id,
      quantity: item.quantity ?? 0,
    } as Record<string, unknown>) as Record<string, unknown>;
    return standardOrderItemInsertSchema.parse(itemSnakeCaseData);
  });

  const { data, error } = await supabase
    .from('standard_order_items')
    .insert(parsedItems);

  if (error) throw new Error(error.message);
  return data;
};

export const useUpdateStandardOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateStandardOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customer-standard-orders'] });
    },
    onError: (error) => {
      console.error('Failed to update standard Order:', error);
    },
  });
};
