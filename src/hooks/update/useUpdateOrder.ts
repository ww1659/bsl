import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/services/supabase';
import { OrderItem } from '@/types';

type UpdateOrderData = {
  orderId: string;
  items?: OrderItem[];
  notes?: string;
  deliveryDate?: Date;
};

const updateOrder = async ({
  orderId,
  items,
  notes,
  deliveryDate,
}: UpdateOrderData) => {
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .update({
      ...(notes && { notes }),
      ...(deliveryDate && { delivery_date: deliveryDate.toISOString() }),
    })
    .eq('id', orderId)
    .select()
    .single();

  if (orderError) throw orderError;

  if (items) {
    // 1. Get existing items
    const { data: existingItems } = await supabase
      .from('order_items')
      .select('item_id')
      .eq('order_id', orderId);

    // 2. Find items to delete (exists in DB but not in new items)
    const existingIds = existingItems?.map((item) => item.item_id!) || [];
    const newItems = items.map((item) => item.id).filter(Boolean);
    const itemsToDelete = existingIds.filter((id) => !newItems.includes(id));

    // 3. Delete removed items
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

    // 4. Upsert new/updated items with correct ID handling
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
