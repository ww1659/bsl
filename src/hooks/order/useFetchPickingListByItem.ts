import { useQuery } from '@tanstack/react-query';

import { supabase } from '@/services/supabase';

type PickingListItem = {
  id: number;
  name: string;
  quantity: number;
  ordersPicked: {
    orderId: number;
    orderNumber: string;
    customerName: string;
    totalUnpicked: number;
  }[];
  ordersUnpicked: {
    orderId: number;
    orderNumber: string;
    customerName: string;
    totalUnpicked: number;
  }[];
};

const fetchPickingListItems = async (startDate: string, endDate: string) => {
  const { data, error } = await supabase.rpc('get_picking_list_by_date_range', {
    start_date: startDate,
    end_date: endDate,
  });

  if (error) {
    throw new Error(error.message);
  }

  const itemsData: PickingListItem[] = data.map((item: any) => ({
    id: item.item_id,
    name: item.item_name,
    quantity: item.total_number,
    ordersPicked: item.orders_picked.map((order: any) => ({
      orderId: order.order_id,
      orderNumber: order.order_number,
      customerName: order.customer_name,
      totalUnpicked: order.total_unpicked,
    })),
    ordersUnpicked: item.orders_unpicked.map((order: any) => ({
      orderId: order.order_id,
      orderNumber: order.order_number,
      customerName: order.customer_name,
      totalUnpicked: order.total_unpicked,
    })),
  }));

  return itemsData;
};

export const useFetchPickingListByItem = (
  startDate: string,
  endDate: string
) => {
  return useQuery({
    queryKey: ['picking-list-items', startDate, endDate],
    queryFn: () => fetchPickingListItems(startDate, endDate),
  });
};
