-- Live classes (presenter + participants) and per-user saved work.
create table if not exists live_sessions (
  id text primary key,
  host_user_id text not null,
  course_id text not null,
  title text not null default '',
  status text not null default 'live',
  current_module_id text,
  current_slide integer not null default 0,
  created_at timestamptz not null default now(),
  ended_at timestamptz
);
create index if not exists live_sessions_host_idx on live_sessions (host_user_id, status);
create index if not exists live_sessions_status_idx on live_sessions (status);

create table if not exists session_members (
  session_id text not null,
  user_id text not null,
  display_name text not null default '',
  role text not null default 'participant',
  joined_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  primary key (session_id, user_id)
);
create index if not exists session_members_user_idx on session_members (user_id);

create table if not exists user_progress (
  user_id text primary key,
  enrolled_course_id text,
  completed_modules text not null default '[]',
  module_slide text not null default '{}',
  diagnostic text not null default '{}',
  diagnostic_submitted text not null default '{}',
  workbook text not null default '{}',
  capstone_ticks text not null default '{}',
  bookmarked_prompts text not null default '[]',
  practice_history text not null default '[]',
  clinic text not null default '[]',
  certificate_name text not null default '',
  certificate_role text not null default 'Teacher',
  certificate_school text not null default '',
  certificate_issued_at text,
  updated_at timestamptz not null default now()
);
