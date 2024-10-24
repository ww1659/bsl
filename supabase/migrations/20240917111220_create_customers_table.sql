create table customers (
    id uuid default uuid_generate_v4() primary key,
    customer_name varchar(255),
    house_number varchar(10),
    street_name varchar(100),
    town varchar(100),
    postcode varchar(20),
    country varchar(100),
    email varchar(255),
    reference varchar(255),
    discount decimal (10, 2), 
    group_id uuid default null references groups(id) on delete set null,
    created_at timestamptz default now()
);
