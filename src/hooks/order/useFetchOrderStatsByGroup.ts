import { useQuery } from "@tanstack/react-query"

import { supabase } from "@/services/supabase"

const fetchOrdersStats = async (groupId: string) => {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const startOfPreviousMonth = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    1
  )
  const endOfPreviousMonth = new Date(now.getFullYear(), now.getMonth(), 0)

  const [totalOrders, monthOrders, previousMonthOrders] = await Promise.all([
    supabase
      .from("orders")
      .select("*", { count: "exact" })
      .eq("group_id", groupId)
      .then(({ count, error }) => {
        if (error) throw new Error(error.message)
        return count
      }),
    supabase
      .from("orders")
      .select("*", { count: "exact" })
      .eq("group_id", groupId)
      .gte("created_at", startOfMonth.toISOString())
      .then(({ count, error }) => {
        if (error) throw new Error(error.message)
        return count
      }),
    supabase
      .from("orders")
      .select("*", { count: "exact" })
      .eq("group_id", groupId)
      .gte("created_at", startOfPreviousMonth.toISOString())
      .lt("created_at", endOfPreviousMonth.toISOString())
      .then(({ count, error }) => {
        if (error) throw new Error(error.message)
        return count
      }),
  ])

  return { totalOrders, monthOrders, previousMonthOrders }
}

export const useFetchOrderStatsByGroup = (groupId: string) => {
  return useQuery({
    queryKey: ["ordersStats", groupId],
    queryFn: () => fetchOrdersStats(groupId),
  })
}
