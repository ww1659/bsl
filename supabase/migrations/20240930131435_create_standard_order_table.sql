create table standard_order (
  id bigint primary key generated always as identity, 
  customer_id uuid references customers(id) on delete cascade,  
  order_name text,
  updated_at timestamptz default now(),
  created_at timestamptz default now() 
);

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