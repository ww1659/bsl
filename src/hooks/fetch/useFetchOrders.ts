import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../connection";

type FetchOrdersParams = {
  startDate?: string;
  groupId?: string;
  customerName?: string;
};

const fetchOrders = async ({
  startDate,
  groupId,
  customerName,
}: FetchOrdersParams) => {
  let query = supabase
    .from("orders")
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
    .order("delivery_date", { ascending: true });

  if (startDate) {
    query = query.gte("delivery_date", new Date(startDate).toISOString());
  } else {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    query = query.gte("delivery_date", today.toISOString());
  }

  if (groupId) {
    query =
      groupId === "private"
        ? query.is("group_id", null)
        : query.eq("group_id", groupId);
  }

  if (customerName) {
    query = query.ilike("customers.customer_name", `%${customerName}%`);
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
      itemName: item.items?.item_name ?? "",
      price: item.items?.price ?? 0,
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
    queryKey: ["orders", params],
    queryFn: () => fetchOrders(params),
  });
};
