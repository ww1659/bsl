create table standard_order (
  id bigint primary key generated always as identity, 
  customer_id uuid references customers(id) on delete cascade,  
  order_name text,
  updated_at timestamptz default now(),
  created_at timestamptz default now() 
);

-- Enable Row Level Security
alter table standard_order enable row level security;

-- Create policies that allow authenticated users to see and create standard orders
create policy "Public standard orders are visible to authenticated Users."
on standard_order for select
to authenticated
using ( true ); 

create policy "Authenticated Users can create a standard order."
on standard_order for insert
to authenticated  
using ( true );

create policy "Authenticated Users can update a standard order."
on standard_order for update
to authenticated                   
using ( true );

create policy "Authenticated Users can delete a standard order."
on standard_order for delete
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

CREATE TRIGGER update_standard_order_timestamp
BEFORE UPDATE ON standard_order
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();