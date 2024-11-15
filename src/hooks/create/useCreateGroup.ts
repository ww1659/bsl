import { supabase } from '../../connection';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../use-toast';

type CreateGroupMutation = {
    groupData: {
        group_name: string;
        email: string;
        standard_discount: number;
        house_number: string | undefined;
        street_name: string | undefined;
        town: string | undefined;
        postcode: string | undefined;
        country: string;
    }
};

const createGroup = async ({groupData}: CreateGroupMutation) => {

  const { data, error } = await supabase
    .from('groups')
    .insert(groupData)
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
          title: "Success!",
          description: `Group ${data.group_name} created!`,
        });
        navigate("/customers");
      },
      onError: (error) => {
        console.error("Error creating order:", error.message);
      },
    }
  )
};
