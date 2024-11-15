import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@supabase/supabase-js';
import { Database } from '../../../database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

type ToggleCustomerArgs = { 
    customerId: string; 
    isActive: boolean 
};

const toggleActiveCustomer = async ({customerId, isActive}: ToggleCustomerArgs) => {
    const { data, error } = await supabase
        .from('customers')
        .update({ is_active: !isActive })
        .eq('id', customerId);

    if (error) throw new Error(error.message);
    return data;
};

export const useToggleActiveCustomer = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: toggleActiveCustomer,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customer-by-id'] });
            queryClient.invalidateQueries({ queryKey: ['groups-id'] });
        },
        onError: (error) => {
            console.error('Failed to update customer:', error);
        },

    });
};
