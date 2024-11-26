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

-- Enable Row Level Security
alter table orders enable row level security;

-- Create policies that allow authenticated users to see and create orders
create policy "Public orders are visible to authenticated Users."
on orders for select
to authenticated -- the Postgres Role (recommended)
using ( true ); -- the actual Policy

create policy "Authenticated Users can create an order."
on orders for insert
to authenticated  
using ( true );

create policy "Authenticated Users can update orders."
on orders for update
to authenticated                   
using ( true );