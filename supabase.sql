-- New setup only: create votes and admins, then add your admin user UUID.
create table if not exists public.votes (
 id bigint generated always as identity primary key,
 logo_id text not null check (logo_id in ('moose-crest','moose-modern','lighthouse','raccoon','action')),
 voter_name text not null check (char_length(trim(voter_name)) between 1 and 100),
 notes text check (char_length(notes)<=1000),
 created_at timestamptz not null default now()
);
create table if not exists public.admins (user_id uuid primary key references auth.users(id) on delete cascade);
alter table public.votes enable row level security;
alter table public.admins enable row level security;
revoke all on public.votes from anon, authenticated;
revoke all on public.admins from anon, authenticated;
grant insert on public.votes to anon, authenticated;
grant select on public.votes to authenticated;
grant select on public.admins to authenticated;
create policy "Public may submit a vote" on public.votes for insert to anon, authenticated with check (true);
create policy "Admins may read votes" on public.votes for select to authenticated using (exists (select 1 from public.admins a where a.user_id=auth.uid()));
create policy "Admin may see own membership" on public.admins for select to authenticated using (user_id=auth.uid());
-- insert into public.admins(user_id) values ('YOUR-ADMIN-USER-UUID');
