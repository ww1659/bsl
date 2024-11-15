import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@supabase/supabase-js';
import { Database } from '../../../database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

type StandardOrderItem = {
    id: number;
    quantity: number;
};

type CreateStandardOrder = {
    customerId: string | null;
    orderName: string;
    orderItems: StandardOrderItem[];
};

const createStandardOrder = async ({ customerId, orderName, orderItems }: CreateStandardOrder) => {
    const { data: orderData, error: orderError } = await supabase
        .from('standard_order')
        .insert({ 
            "customer_id":customerId, 
            "order_name": orderName 
        })
        .select('*')
        .single();

    if (orderError) {
        throw new Error(orderError.message);
    }

    const standardOrderId = orderData.id;

    const { data: standardOrderItemsData, error: standardOrderItemsError } = await supabase
        .from('standard_order_items')
        .insert(
            orderItems.map(item => ({
                standard_order_id: standardOrderId,
                item_id: item.id,
                quantity: item.quantity,
            }))
        )
        .select('*');

    if (standardOrderItemsError) {
        throw new Error(standardOrderItemsError.message);
    }

    return { order: orderData, items: standardOrderItemsData };
};

export const useCreateStandardOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createStandardOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['customer-standard-orders'] });
        },
    });
};

