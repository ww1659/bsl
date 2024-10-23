import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@supabase/supabase-js';
import { Database } from '../../../database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

type UpdatePickedMutation = {
    orderId: string;
    currentPickedStatus: boolean;
};

const updatePickedOrder = async ({orderId, currentPickedStatus}: UpdatePickedMutation ) => {
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
        }
    );
};
  
