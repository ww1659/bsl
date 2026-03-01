import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { toSnakeCase } from '@/lib/utils';
import { supabase } from '@/services/supabase';

type CreateItemInput = {
  itemName: string;
  price: number;
  stock: number;
};

const itemInsertSchema = z.object({
  item_name: z.string(),
  price: z.number(),
  stock: z.number(),
  loaned_out: z.number(),
});

const createItem = async ({ itemName, price, stock }: CreateItemInput) => {
  const itemSnakeCaseData = toSnakeCase({
    itemName,
    price,
    stock,
    loanedOut: 0,
  });
  const parsedItemData = itemInsertSchema.parse(itemSnakeCaseData);

  const { data, error } = await supabase
    .from('items')
    .insert(parsedItemData)
    .select('*')
    .single();

  if (error) {
    throw new Error(error.message);
  }

  const newItem = {
    id: data.id,
    itemName: data.item_name,
    price: data.price,
    stock: data.stock,
    loanedOut: data.loaned_out,
  };

  return newItem;
};

export const useCreateItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });
};
