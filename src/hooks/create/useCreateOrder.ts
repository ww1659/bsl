import { useMutation } from '@tanstack/react-query';
import { createClient } from '@supabase/supabase-js';
import { Database } from '../../../database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

type CreateOrderMutation = {
  orderData: {
    total: number;
    delivery_date: string | undefined;
    status: "pending" | "paid" | "sent" | "overdue";
    customer_id: string | null;
    discount: number | null;
    notes: string;
    group_id: string | null;
  
  };
  orderItems: {  
    item_id: number | null | undefined;
    quantity: number;
    price: number | null | undefined;
    }[];
};

const createOrder = async ({
  orderData,
  orderItems,
}: CreateOrderMutation) => {

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert(orderData)
    .select('*')
    .single();

  if (orderError) {    
    throw new Error(orderError.message);
  }

  // add order_id to each order item
  const orderItemsData = orderItems.map((item) => ({
    ...item,
    order_id: order.id,
  }));


  const { error: orderItemsError } = await supabase
    .from('order_items')
    .insert(orderItemsData);

  if (orderItemsError) {
    throw new Error(orderItemsError.message);
  }

  return order;
};

// Hook to handle the mutation
export const useCreateOrder = () => {
  return useMutation({mutationFn: createOrder})
};
