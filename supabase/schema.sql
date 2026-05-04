-- Run this in the Supabase SQL editor to create the contact submissions table.
-- The contact form on the site (src/components/ContactForm.tsx) inserts into this table
-- using the public anon key, so RLS is enabled and a permissive INSERT policy is added.

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  agency text,
  message text not null,
  services text[] default '{}'::text[],
  user_agent text,
  ip text
);

alter table public.contact_submissions enable row level security;

-- Allow the public anon key to INSERT (the form submits from the browser).
drop policy if exists "Public can insert contact submissions" on public.contact_submissions;
create policy "Public can insert contact submissions"
  on public.contact_submissions
  for insert
  to anon
  with check (true);

-- No SELECT policy is added — submissions are read by you in the Supabase dashboard
-- (which uses the service_role key and bypasses RLS).

-- Helpful index for browsing recent submissions:
create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);
