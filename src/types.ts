export type Customer = {
  country: string | null;
  created_at: string | null;
  customer_name: string | null;
  discount: number | null;
  email: string | null;
  group_id: string | null;
  house_number: string | null;
  id: string;
  postcode: string | null;
  reference: string | null;
  street_name: string | null;
  town: string | null;
};

export type OrderItem = {
  id: number;
  quantity: number;
  name: string | null;
  price: number | null;
};

export type OrderStatus =
  | 'pending'
  | 'ready'
  | 'sent'
  | 'delivered'
  | 'archived'
  | undefined;
