import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../connection';

const fetchGroupById = async (groupId: string) => {
  console.log(groupId, typeof groupId);
  

  if (groupId !== 'private') {
    console.log('IN HERE');
    
    const { data, error } = await supabase
      .from('groups')
      .select('*')
      .eq('id', groupId);

    if (error) {
      throw new Error(error.message);
    }
    return data[0];
  } else {
    return [];
  }
};

export const useFetchGroupById = (groupId: string) => {
  return useQuery({
    queryKey: ['groups-id', groupId], 
    queryFn: () => fetchGroupById(groupId), 
    enabled: !!groupId
});
}

