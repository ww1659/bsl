import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../connection';
import { OrderItem } from '@/types';

type UpdateStandardOrderArgs = {
    orderId: number;
    orderItems: OrderItem[];
};

const updateStandardOrder = async ({ orderId, orderItems }: UpdateStandardOrderArgs) => {
    const { error: deleteError } = await supabase
        .from('standard_order_items')
        .delete()
        .eq('standard_order_id', orderId);

    if (deleteError) throw new Error(deleteError.message);

    const { data, error } = await supabase
        .from('standard_order_items')
        .insert(orderItems.map(item => ({
            standard_order_id: orderId,
            item_id: item.id,
            quantity: item.quantity,
        })));

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
        }
    });
};
