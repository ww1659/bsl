create table items (
    id bigint primary key generated always as identity,
    item_name varchar(255) unique,
    price decimal (10, 2),
    stock int default 0 CHECK (stock >= 0), 
    loaned_out int default 0 CHECK (loaned_out >= 0),    
    created_at timestamptz default now()
);
