create table standard_order_items (
  id bigint primary key generated always as identity,
  standard_order_id bigint references standard_order(id) on delete cascade,
  item_id bigint references items(id) on delete restrict,  
  quantity int not null,  
  custom_price decimal(10, 2) default null,  
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable Row Level Security
alter table standard_order_items enable row level security;

-- Create policies that allow authenticated users to see and create standard orders
create policy "Public standard order items are visible to authenticated Users."
on standard_order_items for select
to authenticated
using ( true ); 

create policy "Authenticated Users can create standard order items."
on standard_order_items for insert
to authenticated  
with check ( true );

create policy "Authenticated Users can update standard order items."
on standard_order_items for update
to authenticated                   
using ( true );

create policy "Authenticated Users can delete standard order items."
on standard_order_items for delete
to authenticated                   
using ( true  );

-- Trigger to update the updated_at column on row changes
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_standard_order_items_timestamp
BEFORE UPDATE ON standard_order_items
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();