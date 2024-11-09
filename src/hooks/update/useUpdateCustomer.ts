import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@supabase/supabase-js';
import { Database } from '../../../database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

type UpdateCustomerArgs = { 
    customerId: string;
    customerName: string;
    customerHouseNumber: string;
    customerStreet: string;
    customerPostcode: string;
    customerEmail: string;
    customerDiscount: number;
};

const updateCustomer = async ({
    customerId, 
    customerName, 
    customerHouseNumber, 
    customerStreet, 
    customerPostcode, 
    customerEmail, 
    customerDiscount}: UpdateCustomerArgs) => {    

    const { data, error } = await supabase
        .from('customers')
        .update({ 
            customer_name: customerName,
            house_number: customerHouseNumber,
            street_name: customerStreet,
            postcode: customerPostcode,
            email: customerEmail,
            discount: customerDiscount
        })
        .eq('id', customerId);

    if (error) throw new Error(error.message);
    return data;
};

export const useUpdateCustomer = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateCustomer,
        onSuccess: () => {     
            queryClient.invalidateQueries({ queryKey: ['customer-by-id'] })
            queryClient.invalidateQueries({ queryKey: ['groups-id'] })
            console.log("Customerr Update Successfully");
        },
        onError: (error) => {
            console.error('Failed to update customer:', error);
        }
    });
};
