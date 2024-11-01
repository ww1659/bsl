import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@supabase/supabase-js';
import { Database } from '../../../database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

type UpdatePickedItemMutation = {
    itemId: number;
    orderId: string;
    currentPickedStatus: boolean;
};

const updatePickedItem = async ({ itemId, orderId, currentPickedStatus }: UpdatePickedItemMutation) => {    

    const { data, error } = await supabase
        .from('order_items')
        .update({ picked: !currentPickedStatus })
        .eq('item_id', itemId)
        .eq('order_id', orderId);

    if (error) throw new Error(error.message);
    return data;
};

export const useUpdatePickedItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updatePickedItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['picking-list-orders'] });
        },
        onError: (error) => {
            console.error('Failed to toggle picked status:', error);
        }
    });
};