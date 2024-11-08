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