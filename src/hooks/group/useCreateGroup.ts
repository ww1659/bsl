import { supabase } from '@/services/supabase';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../use-toast';
import { toSnakeCase } from '@/lib/utils';
import { z } from 'zod';

type CreateGroupInput = {
  groupName: string;
  email: string;
  standardDiscount: number;
  houseNumber?: string;
  streetName?: string;
  town?: string;
  postcode?: string;
  country: string;
};

const groupInsertSchema = z.object({
  group_name: z.string(),
  email: z.string(),
  standard_discount: z.number(),
  house_number: z.string().optional(),
  street_name: z.string().optional(),
  town: z.string().optional(),
  postcode: z.string().optional(),
  country: z.string(),
});

const createGroup = async ({ groupData }: { groupData: CreateGroupInput }) => {
  const groupSnakeCaseData = toSnakeCase(groupData);
  const parsedGroup = groupInsertSchema.parse(groupSnakeCaseData);

  const { data, error } = await supabase
    .from('groups')
    .insert(parsedGroup)
    .select('*')
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useCreateGroup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  return useMutation({
    mutationFn: createGroup,
    onSuccess: (data) => {
      toast({
        title: 'Success!',
        description: `Group ${data.group_name} created!`,
      });
      navigate('/customers');
    },
    onError: (error) => {
      console.error('Error creating order:', error.message);
    },
  });
};
