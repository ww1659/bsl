create table items (
    id bigint primary key generated always as identity,
    item_name varchar(255) unique,
    price decimal (10, 2),
    stock int default 0 CHECK (stock >= 0), 
    loaned_out int default 0 CHECK (loaned_out >= 0),    
    created_at timestamptz default now()
);

-- Enable Row Level Security
alter table items enable row level security;

-- Create policies that allow authenticated users to see and create items
create policy "Public items are visible to authenticated Users."
on items for select
to authenticated -- the Postgres Role (recommended)
using ( true ); -- the actual Policy

create policy "Authenticated Users can create an item."
on items for insert
to authenticated  
using ( true );

create policy "Authenticated Users can update items."
on items for update
to authenticated                   
using ( true );