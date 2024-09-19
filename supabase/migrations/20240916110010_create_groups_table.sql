create extension if not exists "uuid-ossp";

create table groups (
  id uuid default uuid_generate_v4() primary key,
  group_name varchar(255) not null,
  house_number varchar(10),
  street_name varchar(100),
  town varchar(100),
  postcode varchar(20),
  country varchar(100),
  email varchar(255),
  standard_discount decimal(10, 2) default 0, 
  created_at timestamptz default now()
);
