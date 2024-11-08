import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@supabase/supabase-js';
import { Database } from '../../../database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

type UpdateGroupArgs = { 
    groupId: string;
    groupName: string;
    groupHouseNumber: string;
    groupStreet: string;
    groupPostcode: string;
    groupEmail: string;
    groupStandardDiscount: number;
};

const updateGroup = async ({
    groupId, 
    groupName, 
    groupHouseNumber, 
    groupStreet, groupPostcode, 
    groupEmail, 
    groupStandardDiscount}: UpdateGroupArgs) => {    

    const { data, error } = await supabase
        .from('groups')
        .update({ 
            group_name: groupName,
            house_number: groupHouseNumber,
            street_name: groupStreet,
            postcode: groupPostcode,
            email: groupEmail,
            standard_discount: groupStandardDiscount
        })
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
            queryClient.invalidateQueries({ queryKey: ['groups'] })
            console.log("Group Update Successfully");
        },
        onError: (error) => {
            console.error('Failed to update group:', error);
        }
    });
};
