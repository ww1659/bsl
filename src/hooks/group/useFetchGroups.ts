import { useQuery } from '@tanstack/react-query'

import { toCamelCase } from '@/lib/utils'
import type { Group } from '@/schemas'
import { supabase } from '@/services/supabase'

const fetchGroups = async (): Promise<Group[]> => {
  const { data, error } = await supabase.from('groups').select('*')

  if (error) {
    throw new Error(error.message)
  }
  return (data ?? []).map(
    (g) => toCamelCase(g as Record<string, unknown>) as Group
  )
}

export const useFetchGroups = () => {
  return useQuery({
    queryKey: ['groups'],
    queryFn: fetchGroups,
  })
}
