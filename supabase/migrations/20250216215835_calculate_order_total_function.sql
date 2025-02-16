create or replace function calculate_order_total()
returns trigger as $$
begin
    update orders
    set 
        total = (
            select round(
                coalesce(sum(quantity * price), 0) * 
                ((100 - coalesce(orders.discount, 0)) / 100),
                2
            )
            from order_items
            where order_items.order_id = new.order_id
        )
    where id = new.order_id;
    return new;
end;
$$ language plpgsql;

-- Then create triggers for insert, update, and delete on order_items
create trigger update_order_total_on_insert
after insert on order_items
for each row
execute function calculate_order_total();

create trigger update_order_total_on_update
after update on order_items
for each row
execute function calculate_order_total();

-- Separate function for delete since we need to use OLD
create or replace function calculate_order_total_on_delete()
returns trigger as $$
begin
    update orders
    set 
        total = (
            select round(
                coalesce(sum(quantity * price), 0) * 
                ((100 - coalesce(orders.discount, 0)) / 100),
                2
            )
            from order_items
            where order_items.order_id = old.order_id
        )
    where id = old.order_id;
    return old;
end;
$$ language plpgsql;

create trigger update_order_total_on_delete
after delete on order_items
for each row
execute function calculate_order_total_on_delete();