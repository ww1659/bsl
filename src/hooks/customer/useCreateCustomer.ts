import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { toCamelCase, toSnakeCase } from '@/lib/utils'
import { supabase } from '@/services/supabase'

import { useToast } from '../use-toast'

type CreateCustomerInput = {
  customerName: string
  email?: string
  discount?: number
  houseNumber?: string
  streetName?: string
  town?: string
  postcode?: string
  country: string
  groupId: string
  reference: string
}

const customerInsertSchema = z.object({
  customer_name: z.string().optional(),
  email: z.string().nullable().optional(),
  discount: z.number().nullable().optional(),
  house_number: z.string().nullable().optional(),
  street_name: z.string().nullable().optional(),
  town: z.string().nullable().optional(),
  postcode: z.string().nullable().optional(),
  country: z.string(),
  group_id: z.string().nullable(),
  reference: z.string(),
})

const createCustomer = async ({
  customerData,
}: {
  customerData: CreateCustomerInput
}) => {
  const customerSnakeCaseData = toSnakeCase(customerData)
  const parsedCustomer = customerInsertSchema.parse(customerSnakeCaseData)

  if (parsedCustomer.group_id === 'private') {
    parsedCustomer.group_id = null
  }

  const { data, error } = await supabase
    .from('customers')
    .insert(parsedCustomer)
    .select('*')
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return toCamelCase(data) as typeof data & {
    customerName: string
  }
}

export const useCreateCustomer = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  return useMutation({
    mutationFn: createCustomer,
    onSuccess: (data) => {
      toast({
        title: 'Success!',
        description: `Customer ${data.customerName} created!`,
      })
      navigate('/customers')
    },
    onError: (error) => {
      console.error('Error creating Customer:', error.message)
    },
  })
}
