-- Migration to create profiles table
create table if not exists profiles (
    id uuid primary key references auth.users(id),
    first_name text,
    last_name text,
    email text,
    avatar_url varchar(2048),
    created_at timestamptz default now()
);

-- Enable Row Level Security
alter table profiles enable row level security;

-- Policy for users to manage their own profile
create policy "Users can manage own profile" 
on profiles for all 
using (auth.uid() = id);

-- Trigger to automatically create profile when user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
    insert into public.profiles (id, email)
    values (new.id, new.email);
    return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
    after insert on auth.users
    for each row execute function public.handle_new_user();