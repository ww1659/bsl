create table standard_order (
  id bigint primary key generated always as identity, 
  customer_id uuid references customers(id) on delete cascade,  
  order_name text,
  updated_at timestamptz default now(),
  created_at timestamptz default now() 
);