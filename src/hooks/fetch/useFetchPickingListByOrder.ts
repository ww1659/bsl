import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../connection";

const fetchPickingListByOrder = async (startDate: string, endDate: string) => {
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      id,
      number,
      delivery_date,
      status,
      notes,
      group_id,
      customers (customer_name),
      groups (group_name),
      order_items (
        quantity,
        picked,
        items (
          id,
          item_name,
          price
        )
      )
    `
    )
    .gte("delivery_date", startDate)
    .lte("delivery_date", endDate)
    .order("delivery_date", { ascending: true });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  const orderData = data.map((order) => ({
    id: order.id,
    number: order.number,
    deliveryDate: order.delivery_date,
    status: order.status,
    notes: order.notes,
    groupId: order.group_id,
    customerName: order.customers?.customer_name,
    groupName: order.groups?.group_name,
    orderItems: order.order_items.map((item) => ({
      id: item.items?.id ?? null,
      itemName: item.items?.item_name ?? "",
      price: item.items?.price ?? 0,
      quantity: item.quantity,
      picked: item.picked,
    })),
  }));

  return orderData;
};

export const useFetchPickingListByOrder = (
  startDate: string,
  endDate: string
) => {
  return useQuery({
    queryKey: ["picking-list-orders", startDate, endDate],
    queryFn: () => fetchPickingListByOrder(startDate, endDate),
  });
};
