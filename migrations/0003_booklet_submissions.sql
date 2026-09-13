-- Booklets sent to the presenter at the end of a live class.
create table if not exists booklet_submissions (
  id text primary key,
  session_id text not null,
  course_id text not null,
  user_id text not null,
  display_name text not null default '',
  workbook text not null default '{}',
  capstone_ticks text not null default '{}',
  diagnostic text not null default '{}',
  feeling text not null default '',
  improvement text not null default '',
  takeaway text not null default '',
  rating integer,
  submitted_at timestamptz not null default now(),
  unique (session_id, user_id)
);
create index if not exists booklet_submissions_session_idx
  on booklet_submissions (session_id, submitted_at desc);
