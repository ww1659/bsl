-- First, check for and remove any duplicates
do $$
declare
    duplicate record;
begin
    for duplicate in (
        select order_id, item_id, count(*) as count
        from order_items
        group by order_id, item_id
        having count(*) > 1
    )
    loop
        -- Keep the most recent entry for each duplicate set
        delete from order_items
        where ctid not in (
            select ctid
            from order_items
            where order_id = duplicate.order_id
            and item_id = duplicate.item_id
            order by updated_at desc
            limit 1
        )
        and order_id = duplicate.order_id
        and item_id = duplicate.item_id;
    end loop;
end $$;

-- Now add the constraint
alter table order_items
add constraint unique_order_item_combination
unique (order_id, item_id);