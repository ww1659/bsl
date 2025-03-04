create table order_items (
  id bigint primary key generated always as identity, 
  order_id uuid references orders(id) on delete cascade,  
  item_id bigint references items(id) on delete cascade, 
  quantity int check (quantity > 0),  
  price decimal(10, 2),
  picked boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable Row Level Security
alter table order_items enable row level security;

-- Create policies that allow authenticated users to see and create Order Items
create policy "Public Order Items are visible to authenticated Users."
on order_items for select
to authenticated -- the Postgres Role (recommended)
using ( true ); -- the actual Policy

create policy "Authenticated Users can create an order item."
on order_items for insert
to authenticated  
with check ( true );

create policy "Authenticated Users can update order items."
on order_items for update
to authenticated                   
using ( true );

-- Index for faster lookups
create index on order_items (order_id);
create index on order_items (item_id);

-- Trigger to update the updated_at column on row changes
create or replace function update_timestamp()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Function to call the trigger
create trigger update_order_items_timestamp
before update on order_items
for each row
execute function update_timestamp();

create or replace function check_order_items_picked()
returns trigger as $$
declare
    all_picked boolean;
begin
    -- Check if all items in the order are picked
    select case 
        when count(*) = count(case when picked then 1 end) then true 
        else false 
    end into all_picked
    from order_items
    where order_id = new.order_id;

    -- Update order status with explicit type casting
    update orders 
    set status = (case 
        when all_picked then 'ready'::order_status
        else 'pending'::order_status
    end)
    where id = new.order_id
    and status in ('pending'::order_status, 'ready'::order_status);

    return new;
end;
$$ language plpgsql;

-- Create trigger to run after order_items update
create trigger check_items_picked_trigger
after update of picked on order_items
for each row
execute function check_order_items_picked();
