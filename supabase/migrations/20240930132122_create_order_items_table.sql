create table order_items (
  id bigint primary key generated always as identity,
  standard_order_id bigint references standard_order(id) on delete cascade,
  item_id bigint references items(id) on delete RESTRICT,  
  quantity int not null,  
  custom_price decimal(10, 2) default null,  
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
