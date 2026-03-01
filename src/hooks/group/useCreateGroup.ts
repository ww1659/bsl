import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { toCamelCase, toSnakeCase } from '@/lib/utils'
import { supabase } from '@/services/supabase'

import { useToast } from '../use-toast'

type CreateGroupInput = {
  groupName: string;
  email: string;
  standardDiscount: number;
  houseNumber?: string;
  streetName?: string;
  town?: string;
  postcode?: string;
  country: string;
};

const groupInsertSchema = z.object({
  group_name: z.string(),
  email: z.string(),
  standard_discount: z.number(),
  house_number: z.string().optional(),
  street_name: z.string().optional(),
  town: z.string().optional(),
  postcode: z.string().optional(),
  country: z.string(),
})

const createGroup = async ({ groupData }: { groupData: CreateGroupInput }) => {
  const groupSnakeCaseData = toSnakeCase(groupData)
  const parsedGroup = groupInsertSchema.parse(groupSnakeCaseData)

  const { data, error } = await supabase
    .from('groups')
    .insert(parsedGroup)
    .select('*')
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return toCamelCase(data as Record<string, unknown>) as typeof data & {
    groupName: string
  }
}

export const useCreateGroup = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  return useMutation({
    mutationFn: createGroup,
    onSuccess: (data) => {
      toast({
        title: 'Success!',
        description: `Group ${data.groupName} created!`,
      })
      navigate('/customers')
    },
    onError: (error) => {
      console.error('Error creating order:', error.message)
    },
  })
}
