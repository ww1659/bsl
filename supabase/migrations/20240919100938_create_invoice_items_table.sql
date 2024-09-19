create table invoice_items (
  id bigint primary key generated always as identity, 
  invoice_id uuid references invoices(id) on delete cascade,  
  item_id bigint references items(id) on delete cascade, 
  quantity int check (quantity > 0),  
  price decimal(10, 2),  
  created_at timestamptz default now() 
);
