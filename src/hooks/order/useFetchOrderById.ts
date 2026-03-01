import { useQuery } from '@tanstack/react-query'

import { toCamelCase } from '@/lib/utils'
import type { OrderDetail } from '@/schemas'
import { supabase } from '@/services/supabase'

const fetchOrderById = async (orderId: string): Promise<OrderDetail> => {
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items (*), groups (*), customers (*)')
    .eq('id', orderId)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return toCamelCase(data as Record<string, unknown>) as OrderDetail
}

export const useFetchOrderById = (orderId: string) => {
  return useQuery({
    queryKey: ['order-id', orderId],
    queryFn: () => fetchOrderById(orderId),
    enabled: !!orderId,
  })
}
