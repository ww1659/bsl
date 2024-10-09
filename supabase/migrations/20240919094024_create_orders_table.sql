create type order_status as enum ('pending', 'paid', 'sent', 'overdue');

create table orders (
  id uuid default uuid_generate_v4() primary key,
  number integer generated always as identity UNIQUE,  
  total decimal(10, 2),
  delivery_date timestamptz,
  status order_status,
  customer_id uuid references customers(id),
  discount decimal (10, 2),
  notes text,
  group_id uuid default null references groups(id) on delete set null,
  created_at timestamptz default now()
);