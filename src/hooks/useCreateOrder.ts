import { useMutation } from '@tanstack/react-query';
import { createClient } from '@supabase/supabase-js';
import { Database } from '../../database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

interface OrderItem {
  item_id: number;
  quantity: number;
  price: number;
}

// Mutation to insert an order and its items
const createOrder = async ({
  orderData,
  orderItems,
}: {
  orderData: {
    total: number;
    delivery_date: Date;
    status: string;
    customer_id: string;
    discount: number;
    notes: string;
    group_id?: string | null;
  };
  orderItems: OrderItem[];
}) => {
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert(orderData)
    .select('*')
    .single();

  if (orderError) {
    throw new Error(orderError.message);
  }

  // Insert order items into the order_items table
  const orderItemsData = orderItems.map((item) => ({
    order_id: order.id,
    item_id: item.item_id,
    quantity: item.quantity,
    price: item.price,
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
  return useMutation(createOrder);
};
