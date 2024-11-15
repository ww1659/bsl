import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../connection';

const fetchItems = async () => {
  const { data, error } = await supabase
    .from('items')
    .select('*');

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const useFetchItems = () => {
  return useQuery({queryKey: ['items'], queryFn: fetchItems});
};

