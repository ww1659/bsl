create type invoice_status as enum ('pending', 'paid', 'sent', 'overdue');

create table invoices (
  id uuid default uuid_generate_v4() primary key,
  number integer UNIQUE,
  total integer,
  due_date timestamp,
  status invoice_status,
  customer_id uuid references customers(id),
  created_at timestamptz default now()
);