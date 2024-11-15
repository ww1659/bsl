import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../../connection';

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
