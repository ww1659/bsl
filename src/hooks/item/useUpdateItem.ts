import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { toCamelCase, toSnakeCase } from '@/lib/utils'
import { supabase } from '@/services/supabase'

type UpdateItemInput = {
  itemId: number;
  itemName: string;
  itemPrice: number;
};

const itemUpdateSchema = z.object({
  item_name: z.string(),
  price: z.number(),
})

const updateItem = async ({ itemId, itemName, itemPrice }: UpdateItemInput) => {
  const payload = { itemName, price: itemPrice }
  const itemSnakeCaseData = toSnakeCase(payload)
  const parsedItemData = itemUpdateSchema.parse(itemSnakeCaseData)

  const { data, error } = await supabase
    .from('items')
    .update(parsedItemData)
    .eq('id', itemId)
    .select()

  if (error) throw new Error(error.message)

  const row = data?.[0] as Record<string, unknown> | undefined
  if (!row) return row
  return toCamelCase(row) as { id: number; itemName: string; price: number }
}

export const useUpdateItem = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] })
    },
    onError: (error) => {
      console.error('Failed to pdate items:', error)
    },
  })
}
