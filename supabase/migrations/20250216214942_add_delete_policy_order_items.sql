create policy "Authenticated Users can delete order items."
on order_items for delete
to authenticated
using ( true );