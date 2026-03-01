import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/services/supabase';
import { toSnakeCase } from '@/lib/utils';
import { z } from 'zod';
import { toast } from '../use-toast';

type UpdateGroupInput = {
  groupId: string;
  groupName: string;
  groupHouseNumber: string;
  groupStreet: string;
  groupPostcode: string;
  groupEmail: string;
  groupStandardDiscount: number;
};

const groupUpdateSchema = z.object({
  group_name: z.string(),
  house_number: z.string(),
  street_name: z.string(),
  postcode: z.string(),
  email: z.string(),
  standard_discount: z.number(),
});

const updateGroup = async ({
  groupId,
  groupName,
  groupHouseNumber,
  groupStreet,
  groupPostcode,
  groupEmail,
  groupStandardDiscount,
}: UpdateGroupInput) => {
  const payload = {
    groupName,
    groupHouseNumber,
    groupStreet,
    groupPostcode,
    groupEmail,
    groupStandardDiscount,
  };
  const groupSnakeCaseData = toSnakeCase(payload);
  const parsedGroupData = groupUpdateSchema.parse(groupSnakeCaseData);

  const { data, error } = await supabase
    .from('groups')
    .update(parsedGroupData)
    .eq('id', groupId);

  if (error) throw new Error(error.message);
  return data;
};

export const useUpdateGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups-id'] });
      queryClient.invalidateQueries({ queryKey: ['groups'] });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to update group: ${error.message}`,
        variant: 'destructive',
      });
    },
  });
};
