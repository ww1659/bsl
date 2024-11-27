import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/services/supabase";

type UpdatePickedItemMutation = {
  itemId: number;
  orderId: string;
  currentPickedStatus: boolean;
};

const updatePickedItem = async ({
  itemId,
  orderId,
  currentPickedStatus,
}: UpdatePickedItemMutation) => {
  const { data, error } = await supabase
    .from("order_items")
    .update({ picked: !currentPickedStatus })
    .eq("item_id", itemId)
    .eq("order_id", orderId);

  if (error) throw new Error(error.message);
  return data;
};

export const useUpdatePickedItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePickedItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["picking-list-orders"] });
    },
    onError: (error) => {
      console.error("Failed to toggle picked status:", error);
    },
  });
};
