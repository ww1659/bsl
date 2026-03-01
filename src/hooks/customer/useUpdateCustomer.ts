import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

import { toSnakeCase } from '@/lib/utils'
import { supabase } from '@/services/supabase'

type UpdateCustomerInput = {
  customerId: string;
  customerName: string;
  customerHouseNumber: string;
  customerStreet: string;
  customerPostcode: string;
  customerEmail: string;
  customerDiscount: number;
};

const customerUpdateSchema = z.object({
  customer_name: z.string(),
  house_number: z.string(),
  street_name: z.string(),
  postcode: z.string(),
  email: z.string(),
  discount: z.number(),
})

const updateCustomer = async ({
  customerId,
  customerName,
  customerHouseNumber,
  customerStreet,
  customerPostcode,
  customerEmail,
  customerDiscount,
}: UpdateCustomerInput) => {
  const payload = {
    customerName,
    customerHouseNumber,
    customerStreet,
    customerPostcode,
    customerEmail,
    customerDiscount,
  }
  const customerSnakeCaseData = toSnakeCase(payload)
  const parsedCustomerData = customerUpdateSchema.parse(customerSnakeCaseData)

  const { data, error } = await supabase
    .from('customers')
    .update(parsedCustomerData)
    .eq('id', customerId)

  if (error) throw new Error(error.message)
  return data
}

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customer-by-id'] })
      queryClient.invalidateQueries({ queryKey: ['groups-id'] })
    },
    onError: (error) => {
      console.error('Failed to update customer:', error)
    },
  })
}
