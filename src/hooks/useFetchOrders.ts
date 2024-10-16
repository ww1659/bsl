import { useQuery } from '@tanstack/react-query';
import { createClient } from '@supabase/supabase-js'
import {Database} from '../../database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;;
const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

const fetchOrders = async () => {
  const today = new Date();

  const startOfDayLocal = new Date(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate(),
    0, 
    0, 
    0, 
    0  
  );

    const dateQuery = startOfDayLocal.toISOString();

  const { data, error } = await supabase
  .from('orders')
  .select(`
    total,
    number,
    delivery_date,
    status,
    notes,
    group_id,
    id,
    order_items (
      quantity,
      items (
        id,
        item_name,
        price
      )
    ),
    groups (
      group_name
    ), 
    customers (
      customer_name
    )
  `)
  .gte('delivery_date', dateQuery)
  .order('delivery_date', { ascending: true }); 

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const useFetchOrders = () => {
  return useQuery({queryKey: ['orders'], queryFn: fetchOrders});
};

