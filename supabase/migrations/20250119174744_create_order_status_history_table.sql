-- create status history table
create table order_status_history (
    id uuid default uuid_generate_v4() primary key,
    order_id uuid references orders(id),
    old_status order_status,
    new_status order_status,
    changed_at timestamptz default now(),
    changed_by uuid references auth.users(id),
    notes text
);

-- enable row level security
alter table order_status_history enable row level security;

-- add rls policies
create policy "Public order history visible to authenticated Users"
on order_status_history for select
to authenticated
using ( true );

create policy "Authenticated users can insert order history"
on order_status_history 
for insert
to authenticated
with check ( true );

-- create status history trigger
create or replace function log_order_status_change()
returns trigger as $$
begin
    if old.status is distinct from new.status then
        insert into order_status_history (order_id, old_status, new_status, changed_by)
        values (new.id, old.status, new.status, auth.uid());
    end if;
    return new;
end;
$$ language plpgsql;

create trigger order_status_change_trigger
after update on orders
for each row
execute function log_order_status_change();

