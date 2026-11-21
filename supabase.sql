-- Run in Supabase SQL Editor. Votes are private; public can INSERT only.
create table if not exists public.votes (
 id bigint generated always as identity primary key,
 logo_id text not null check (logo_id in ('moose-crest','moose-modern','lighthouse')),
 notes text check (char_length(notes)<=1000),
 voter_token uuid not null unique,
 created_at timestamptz not null default now()
);
create table if not exists public.admins (
 user_id uuid primary key references auth.users(id) on delete cascade
);
alter table public.votes enable row level security;
alter table public.admins enable row level security;
revoke all on public.votes from anon, authenticated;
revoke all on public.admins from anon, authenticated;
grant insert on public.votes to anon, authenticated;
grant select on public.votes to authenticated;
grant select on public.admins to authenticated;
create policy "Public may submit a vote" on public.votes for insert to anon, authenticated with check (true);
create policy "Admins may read votes" on public.votes for select to authenticated using (
 exists (select 1 from public.admins a where a.user_id=auth.uid())
);
create policy "Admin may see own membership" on public.admins for select to authenticated using (user_id=auth.uid());
-- After inviting/creating an admin account in Supabase Authentication > Users,
-- use its UUID in this statement (uncomment and replace):
-- insert into public.admins(user_id) values ('REPLACE_WITH_ADMIN_AUTH_USER_UUID');
