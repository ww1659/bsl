create table picking_list (
    id bigserial primary key,
    order_id uuid references orders(id) on delete cascade,
    item_id bigint references items(id) on delete cascade,
    customer_id uuid references customers(id) on delete cascade,
    group_id uuid references groups(id),
    quantity integer not null,
    picked boolean default false,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Index for faster lookups
create index on picking_list (order_id);
create index on picking_list (item_id);
create index on picking_list (customer_id);
create index on picking_list (group_id);

-- Trigger to update the updated_at column on row changes
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_picking_list_timestamp
BEFORE UPDATE ON picking_list
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();
