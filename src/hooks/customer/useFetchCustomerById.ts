import { useQuery } from '@tanstack/react-query'

import { toCamelCase } from '@/lib/utils'
import type { Customer } from '@/schemas'
import { supabase } from '@/services/supabase'

const fetchCustomerById = async (
  customerId: string
): Promise<Customer> => {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('id', customerId)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return toCamelCase(data as Record<string, unknown>) as Customer
}

export const useFetchCustomerById = (customerId: string) => {
  return useQuery({
    queryKey: ['customer-by-id', customerId],
    queryFn: () => fetchCustomerById(customerId),
    enabled: !!customerId,
  })
}
