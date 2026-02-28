import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/services/supabase';
import type { OrderStatus } from '@/schemas';

type FetchOrdersParams = {
  month?: string;
  groupId?: string;
  customerName?: string;
  status?: OrderStatus[];
};

const monthDates = (month: string): { startDate: string; endDate: string } => {
  const monthMap: { [key: string]: number } = {
    january: 0,
    february: 1,
    march: 2,
    april: 3,
    may: 4,
    june: 5,
    july: 6,
    august: 7,
    september: 8,
    october: 9,
    november: 10,
    december: 11,
  };

  const year = new Date().getFullYear();
  const monthIndex = monthMap[month.toLowerCase()];
  const startDate = new Date(year, monthIndex, 1).toISOString();
  const endDate = new Date(year, monthIndex + 1, 0).toISOString();

  return { startDate, endDate };
};

const fetchOrders = async ({
  month,
  groupId,
  customerName,
  status,
}: FetchOrdersParams) => {
  let query = supabase
    .from('orders')
    .select(
      `
      total,
      number,
      delivery_date,
      status,
      notes,
      group_id,
      id,
      order_items (
        quantity,
        picked,
        items (
          id,
          item_name,
          price
        )
      ),
      groups (
        group_name
      ), 
      customers!inner(customer_name)
    `
    )
    .order('delivery_date', { ascending: false });

  if (status && status.length > 0) {
    query = query.in('status', status);
  }

  if (month) {
    query = query.gte('delivery_date', monthDates(month).startDate);
    query = query.lte('delivery_date', monthDates(month).endDate);
  } else {
    // const currentDate = new Date();
    // const currentMonth = currentDate
    //   .toLocaleString('en-US', { month: 'long' })
    //   .toLowerCase();
    // query = query.gte('delivery_date', monthDates(currentMonth).startDate);
    // query = query.lte('delivery_date', monthDates(currentMonth).endDate);
  }

  if (groupId) {
    query =
      groupId === 'private'
        ? query.is('group_id', null)
        : query.eq('group_id', groupId);
  }

  if (customerName) {
    query = query.ilike('customers.customer_name', `%${customerName}%`);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  const orderData = data.map((order) => ({
    total: order.total,
    number: order.number,
    deliveryDate: order.delivery_date,
    status: order.status,
    notes: order.notes,
    groupId: order.group_id,
    id: order.id,
    orderItems: order.order_items.map((item) => ({
      id: item.items?.id ?? null,
      name: item.items?.item_name ?? null,
      price: item.items?.price ?? null,
      quantity: item.quantity,
      picked: item.picked,
    })),
    groupName: order.groups?.group_name,
    customerName: order.customers?.customer_name,
  }));

  return orderData;
};

export const useFetchOrders = (params: FetchOrdersParams) => {
  return useQuery({
    queryKey: ['orders', params],
    queryFn: () => fetchOrders(params),
  });
};
