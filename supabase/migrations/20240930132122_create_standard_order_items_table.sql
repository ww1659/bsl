create table standard_order_items (
  id bigint primary key generated always as identity,
  standard_order_id bigint references standard_order(id) on delete cascade,
  item_id bigint references items(id) on delete restrict,  
  quantity int not null,  
  custom_price decimal(10, 2) default null,  
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

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