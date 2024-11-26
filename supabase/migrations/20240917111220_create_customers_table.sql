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
    is_active boolean default true,
    deactivated_at timestamptz default null,
    created_at timestamptz default now()
);

-- Enable Row Level Security
alter table customers enable row level security;

-- Create policies that allow authenticated users to see and create customers
create policy "Public customers are visible to authenticated Users."
on customers for select
to authenticated -- the Postgres Role (recommended)
using ( true ); -- the actual Policy

create policy "Authenticated Users can create a customer."
on customers for insert
to authenticated  
using ( true );

create policy "Authenticated Users can update customers."
on customers for update
to authenticated                   
using ( true );

-- trigger to manage deactivated_at timestamp
create or replace function update_customer_deactivated_at()
returns trigger as $$
begin
    if new.is_active = false and old.is_active = true then
        new.deactivated_at = now();
    elsif new.is_active = true then
        new.deactivated_at = null;
    end if;
    return new;
end;
$$ language plpgsql;

create trigger set_customer_deactivated_at
    before update on customers
    for each row
    execute function update_customer_deactivated_at();