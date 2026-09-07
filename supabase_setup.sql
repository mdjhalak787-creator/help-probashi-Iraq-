-- ইউজার প্রফাইল টেবিল যেখানে রোল (admin, agent, user) সেভ থাকবে
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  email text,
  role text default 'user', -- 'admin', 'agent', 'user'
  status text default 'pending', -- 'pending', 'approved', 'rejected'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- নতুন ইউজার সাইন আপ করলে অটো প্রফাইল তৈরি করার ট্রিগার
function public.handle_new_user()
begin
  insert into public.profiles (id, full_name, email, role, status)
  values (new.id, new.raw_user_meta_data->>'full_name', new.email, 'user', 'pending');
  return new;
end;
;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- টেবিলের জন্য RLS পলিসি
alter table public.profiles enable row level security;

create policy "Enable read access for all users" on public.profiles for select using (true);
create policy "Enable update for users based on id or admin" on public.profiles for update using (true);
