import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { toSnakeCase } from '@/lib/utils'
import { supabase } from '@/services/supabase'

type CreateStandardOrderInput = {
  customerId: string | null;
  orderName: string;
  orderItems: { id: number; quantity: number }[];
};

const standardOrderInsertSchema = z.object({
  customer_id: z.string().nullable(),
  order_name: z.string(),
})

const standardOrderItemInsertSchema = z.object({
  standard_order_id: z.number(),
  item_id: z.number(),
  quantity: z.number(),
})

const createStandardOrder = async ({
  customerId,
  orderName,
  orderItems,
}: CreateStandardOrderInput) => {
  const orderSnakeCaseData = toSnakeCase({
    customerId,
    orderName,
  })
  const parsedOrder = standardOrderInsertSchema.parse(orderSnakeCaseData)

  const { data: orderData, error: orderError } = await supabase
    .from('standard_order')
    .insert(parsedOrder)
    .select('*')
    .single()

  if (orderError) {
    throw new Error(orderError.message)
  }

  const standardOrderId = orderData.id

  const parsedItems = orderItems.map((item) => {
    const itemSnakeCaseData = toSnakeCase({
      standardOrderId,
      itemId: item.id,
      quantity: item.quantity,
    })
    return standardOrderItemInsertSchema.parse(itemSnakeCaseData)
  })

  const { data: standardOrderItemsData, error: standardOrderItemsError } =
    await supabase.from('standard_order_items').insert(parsedItems).select('*')

  if (standardOrderItemsError) {
    throw new Error(standardOrderItemsError.message)
  }

  return { order: orderData, items: standardOrderItemsData }
}

export const useCreateStandardOrder = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createStandardOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customer-standard-orders'] })
    },
  })
}
