import { useQuery } from "@tanstack/react-query"

import { toCamelCase } from "@/lib/utils"
import type { Group } from "@/schemas"
import { supabase } from "@/services/supabase"

const fetchGroupById = async (groupId: string): Promise<Group | null> => {
  if (groupId !== "private") {
    const { data, error } = await supabase
      .from("groups")
      .select("*")
      .eq("id", groupId)
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return toCamelCase(data as Record<string, unknown>) as Group
  }
  return null
}

export const useFetchGroupById = (groupId: string) => {
  return useQuery({
    queryKey: ["groups-id", groupId],
    queryFn: () => fetchGroupById(groupId),
    enabled: !!groupId,
  })
}
