import { useQuery } from "@tanstack/react-query"

import { supabase } from "@/services/supabase"

const fetchGroupById = async (groupId: string) => {
  if (groupId !== "private") {
    const { data, error } = await supabase
      .from("groups")
      .select("*")
      .eq("id", groupId)
      .single()

    if (error) {
      throw new Error(error.message)
    }

    const groupData = {
      id: data.id,
      groupName: data.group_name,
      houseNumber: data.house_number,
      streetName: data.street_name,
      town: data.town,
      postcode: data.postcode,
      email: data.email,
      standardDiscount: data.standard_discount,
      createdAt: data.created_at,
    }
    return groupData
  } else return null
}

export const useFetchGroupById = (groupId: string) => {
  return useQuery({
    queryKey: ["groups-id", groupId],
    queryFn: () => fetchGroupById(groupId),
    enabled: !!groupId,
  })
}
