import { useQuery } from '@tanstack/react-query'

import { toCamelCase } from '@/lib/utils'
import type { OrderItemRow } from '@/schemas'
import { supabase } from '@/services/supabase'

const fetchItemsByOrderId = async (
  orderId: string
): Promise<OrderItemRow[]> => {
  const { data, error } = await supabase
    .from('order_items')
    .select('*, items(*)')
    .eq('order_id', orderId)

  if (error) {
    throw new Error(error.message)
  }

  return (data ?? []).map((row) => {
    const c = toCamelCase(row as Record<string, unknown>) as Record<
      string,
      unknown
    >
    const items = c.items as {
      id: number
      itemName: string | null
      price: number | null
    } | null
    return {
      id: items?.id ?? null,
      name: items?.itemName ?? null,
      price: c.price as number | null,
      quantity: c.quantity as number | null,
    }
  })
}

export const useFetchItemsByOrderId = (orderId: string) => {
  return useQuery({
    queryKey: ['order-items', orderId],
    queryFn: () => fetchItemsByOrderId(orderId),
    enabled: !!orderId,
  })
}
