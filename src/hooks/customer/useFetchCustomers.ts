import { useQuery } from '@tanstack/react-query'

import { toCamelCase } from '@/lib/utils'
import { Customer } from '@/schemas'
import { supabase } from '@/services/supabase'

const fetchCustomers = async (): Promise<Customer[]> => {
  const { data, error } = await supabase.from('customers').select('*')

  if (error) {
    throw new Error(error.message)
  }
  return (data ?? []).map(
    (c) => toCamelCase(c as Record<string, unknown>) as Customer
  )
}

export const useFetchCustomers = () => {
  return useQuery({ queryKey: ['customers'], queryFn: fetchCustomers })
}
