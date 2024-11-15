import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../connection';

type DeleteStandardOrder = {
    standardOrderId: number;
};

const deleteStandardOrder = async ({ standardOrderId }: DeleteStandardOrder) => {
    const { error: deleteItemsError } = await supabase
        .from('standard_order_items')
        .delete()
        .eq('standard_order_id', standardOrderId);

    if (deleteItemsError) throw new Error(deleteItemsError.message);

    const { error: deleteOrderError } = await supabase
        .from('standard_order')
        .delete()
        .eq('id', standardOrderId);

    if (deleteOrderError) throw new Error(deleteOrderError.message);

    return { success: true };
};

export const useDeleteStandardOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteStandardOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customer-standard-orders'] });
        },
        onError: (error) => {
            console.error('Failed to delete Standard Order:', error);
        }
    });
};
