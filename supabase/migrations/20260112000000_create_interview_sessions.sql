-- Create the interview_sessions table
create table public.interview_sessions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  service_type text not null, -- 'divorce', 'bankruptcy', etc.
  status text default 'in_progress', -- 'in_progress', 'completed', 'generating'
  current_step integer default 0,
  answers jsonb default '{}'::jsonb,
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.interview_sessions enable row level security;

-- Create policies
create policy "Users can view their own sessions"
  on public.interview_sessions for select
  using (auth.uid() = user_id);

create policy "Users can insert their own sessions"
  on public.interview_sessions for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own sessions"
  on public.interview_sessions for update
  using (auth.uid() = user_id);

-- Create updated_at trigger
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger handle_interview_sessions_updated_at
  before update on public.interview_sessions
  for each row
  execute procedure public.handle_updated_at();
