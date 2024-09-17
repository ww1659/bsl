create extension if not exists "uuid-ossp";

create table customers (
    customer_id uuid default uuid_generate_v4() primary key,
    customer_name varchar(255),
    customer_house_number varchar(10),
    customer_street_name varchar(100),
    customer_city varchar(100),
    customer_postcode varchar(20),
    customer_country varchar(100),
    customer_email varchar(255),
    reference varchar(255),
    customer_discount decimal (10, 2), 
    created_at timestamptz default now()
);
