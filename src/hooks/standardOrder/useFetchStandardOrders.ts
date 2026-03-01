import { useQuery } from "@tanstack/react-query"

import { supabase } from "@/services/supabase"

const fetchStandardOrders = async (customerId: string) => {
  const { data, error } = await supabase
    .from("customers")
    .select(
      `
      standard_order (
        id,
        order_name,
        standard_order_items (
          quantity,
          items ( id, item_name, price )
        )
      )
    `
    )
    .eq("id", customerId)

  if (error) {
    throw new Error(`Error fetching data: ${error.message}`)
  }

  if (!data || data.length === 0) {
    return []
  }

  const standardOrders = data[0].standard_order.map((order) => ({
    id: order.id,
    orderName: order.order_name,
    orderItems: order.standard_order_items.map((item) => ({
      id: item.items?.id,
      name: item.items?.item_name,
      price: item.items?.price,
      quantity: item.quantity,
    })),
  }))

  return standardOrders
}

export const useFetchStandardOrders = (customerId: string) => {
  return useQuery({
    queryKey: ["customer-standard-orders", customerId],
    queryFn: () => fetchStandardOrders(customerId),
    enabled: !!customerId,
  })
}
