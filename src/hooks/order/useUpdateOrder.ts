import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { toSnakeCase } from '@/lib/utils';
import { OrderItem } from '@/schemas';
import { supabase } from '@/services/supabase';

type UpdateOrderInput = {
  orderId: string;
  items?: OrderItem[];
  notes?: string;
  deliveryDate?: Date;
};

const orderUpdateSchema = z.object({
  notes: z.string().optional(),
  delivery_date: z.string().optional(),
});

const updateOrder = async ({
  orderId,
  items,
  notes,
  deliveryDate,
}: UpdateOrderInput) => {
  const payload: Record<string, unknown> = {};

  if (notes !== undefined) payload.notes = notes;
  if (deliveryDate !== undefined)
    payload.deliveryDate = deliveryDate.toISOString();

  const orderSnakeCaseData = toSnakeCase(payload);
  const parsedOrderData = orderUpdateSchema.parse(orderSnakeCaseData);

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .update(parsedOrderData)
    .eq('id', orderId)
    .select()
    .single();

  if (orderError) throw orderError;

  if (items) {
    const { data: existingItems } = await supabase
      .from('order_items')
      .select('item_id')
      .eq('order_id', orderId);

    const existingIds = existingItems?.map((item) => item.item_id!) || [];
    const newItems = items.map((item) => item.id).filter(Boolean);
    const itemsToDelete = existingIds.filter((id) => !newItems.includes(id));

    if (itemsToDelete.length > 0) {
      const { error: deleteError } = await supabase
        .from('order_items')
        .delete()
        .eq('order_id', orderId)
        .in('item_id', itemsToDelete)
        .select();

      if (deleteError) throw deleteError;
    }

    const itemsToBeUpserted = items.map((item) => ({
      order_id: orderId,
      item_id: item.id,
      price: item.price,
      quantity: item.quantity,
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .upsert(itemsToBeUpserted, {
        onConflict: 'order_id, item_id',
      });

    if (itemsError) throw itemsError;
  }

  return order;
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateOrder,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({
        queryKey: ['order-items', variables.orderId],
      });
    },
  });
};
