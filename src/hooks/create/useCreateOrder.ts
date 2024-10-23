import { useMutation } from '@tanstack/react-query';
import { createClient } from '@supabase/supabase-js';
import { Database } from '../../../database.types';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../use-toast';

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

export const useCreateOrder = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  return useMutation({
    mutationFn: createOrder,
    onSuccess: (order) => {
        toast({
          title: "Success!",
          description: `Order number ${order.number} created, £${order.total}`,
        });
        navigate("/");
      },
      onError: (error) => {
        console.error("Error creating order:", error.message);
      },
    }
  )
};
