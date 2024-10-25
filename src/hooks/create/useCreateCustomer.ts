import { useMutation } from '@tanstack/react-query';
import { createClient } from '@supabase/supabase-js';
import { Database } from '../../../database.types';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../use-toast';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

type CreateCustomerMutation = {
    customerData: {
        customer_name: string;
        email: string | undefined;
        discount: number | undefined;
        house_number: string | undefined;
        street_name: string | undefined;
        town: string | undefined;
        postcode: string | undefined;
        country: string;
        group_id: string;
        reference: string;
    }
};

const createCustomer = async ({customerData}: CreateCustomerMutation) => {

  const { data, error } = await supabase
    .from('customers')
    .insert(customerData)
    .select('*')
    .single();

  if (error) {    
    throw new Error(error.message);
  }

  return data;
};

export const useCreateCustomer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  return useMutation({
    mutationFn: createCustomer,
    onSuccess: (data) => {
        toast({
          title: "Success!",
          description: `Customer ${data.customer_name} created!`,
        });
        navigate("/customers");
      },
      onError: (error) => {
        console.error("Error creating order:", error.message);
      },
    }
  )
};
