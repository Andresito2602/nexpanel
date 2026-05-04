-- ============================================================
-- NexPanel — Schema SQL para Supabase
-- Ejecuta este script en: Supabase Dashboard → SQL Editor
-- ============================================================

-- ─── PROJECTS ────────────────────────────────────────────────
create table if not exists public.projects (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  name        text not null,
  description text not null default '',
  status      text not null default 'active'
                check (status in ('active', 'paused', 'completed')),
  budget      numeric(12, 2) not null default 0,
  created_at  timestamptz not null default now()
);

-- Row Level Security: each user only sees their own rows
alter table public.projects enable row level security;

create policy "Users can view their own projects"
  on public.projects for select
  using (auth.uid() = user_id);

create policy "Users can insert their own projects"
  on public.projects for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own projects"
  on public.projects for update
  using (auth.uid() = user_id);

create policy "Users can delete their own projects"
  on public.projects for delete
  using (auth.uid() = user_id);

-- ─── CLIENTS ─────────────────────────────────────────────────
create table if not exists public.clients (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  name        text not null,
  email       text not null,
  company     text not null default '',
  status      text not null default 'active'
                check (status in ('active', 'inactive')),
  created_at  timestamptz not null default now()
);

alter table public.clients enable row level security;

create policy "Users can view their own clients"
  on public.clients for select
  using (auth.uid() = user_id);

create policy "Users can insert their own clients"
  on public.clients for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own clients"
  on public.clients for update
  using (auth.uid() = user_id);

create policy "Users can delete their own clients"
  on public.clients for delete
  using (auth.uid() = user_id);

-- ─── INDEXES ─────────────────────────────────────────────────
create index if not exists projects_user_id_idx on public.projects(user_id);
create index if not exists clients_user_id_idx  on public.clients(user_id);
