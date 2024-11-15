import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../connection';

type UpdatePickedMutation = {
    orderId: string;
    currentPickedStatus: boolean;
};

const updatePickedOrder = async ({ orderId, currentPickedStatus }: UpdatePickedMutation) => {
    const { data, error } = await supabase
        .from('order_items')
        .update({ picked: !currentPickedStatus })
        .eq('order_id', orderId);

    if (error) throw new Error(error.message);
    return data;
};

export const useUpdatePickedOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updatePickedOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['picking-list-orders'] });
        },
        onError: (error) => {
            console.error('Failed to toggle picked status:', error);
        }
    });
};


