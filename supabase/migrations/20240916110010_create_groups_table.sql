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

-- Enable Row Level Security
alter table groups enable row level security;

-- Create policies that allow authenticated users to see and create groups
create policy "Public groups are visible to authenticated Users."
on groups for select
to authenticated -- the Postgres Role (recommended)
using ( true ); -- the actual Policy

create policy "Authenticated Users can create a group."
on groups for insert
to authenticated  
with check ( true );

create policy "Authenticated Users can update groups."
on groups for update
to authenticated                   
using ( true );
  

