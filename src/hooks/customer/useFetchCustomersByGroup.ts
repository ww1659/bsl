import { useQuery } from '@tanstack/react-query'

import { toCamelCase } from '@/lib/utils'
import { Customer } from '@/schemas'
import { supabase } from '@/services/supabase'

const fetchGroupedCustomers = async (
  groupId: string,
  customerName?: string
): Promise<Customer[]> => {
  let query = supabase
    .from('customers')
    .select('*')
    .filter(
      'group_id',
      groupId === 'private' ? 'is' : 'eq',
      groupId === 'private' ? null : groupId
    )
    .eq('is_active', true)

  if (customerName) {
    query = query.ilike('customer_name', `%${customerName}%`)
  }

  const { data: customersData, error: customersError } = await query

  if (customersError) {
    throw new Error(`Error fetching customers: ${customersError.message}`)
  }

  return (customersData ?? []).map(
    (c) => toCamelCase(c as Record<string, unknown>) as Customer
  )
}

export const useFetchGroupedCustomers = (
  groupId: string,
  customerName?: string
) => {
  return useQuery({
    queryKey: ['customer-groups', groupId, customerName],
    queryFn: () => fetchGroupedCustomers(groupId, customerName),
    enabled: !!groupId,
  })
}
