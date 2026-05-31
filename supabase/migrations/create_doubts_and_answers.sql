-- Create doubts table
create table if not exists public.doubts (
  id uuid default gen_random_uuid() primary key,
  question text not null,
  posted_by text not null default 'Anonymous',
  created_at timestamptz default now()
);

-- Create answers table
create table if not exists public.answers (
  id uuid default gen_random_uuid() primary key,
  doubt_id uuid not null references public.doubts(id) on delete cascade,
  answer text not null,
  answered_by text not null default 'Anonymous',
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.doubts enable row level security;
alter table public.answers enable row level security;

-- Public read access (anyone can see doubts and answers)
create policy "public read doubts" on public.doubts
  for select using (true);

create policy "public read answers" on public.answers
  for select using (true);

-- Anyone can insert a doubt (anonymous allowed)
create policy "anyone can post doubts" on public.doubts
  for insert with check (true);

-- Anyone can insert an answer (anonymous allowed)
create policy "anyone can post answers" on public.answers
  for insert with check (true);
