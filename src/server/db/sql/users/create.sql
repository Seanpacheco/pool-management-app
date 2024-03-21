CREATE TABLE IF NOT EXISTS public.app_user
(
    user_id text NOT NULL,
    first_name text,
    last_name text,
    email text,
    created_at timestamp with time zone NOT NULL DEFAULT 'CURRENT_TIMESTAMP',
    updated_at timestamp with time zone NOT NULL DEFAULT 'CURRENT_TIMESTAMP',
    CONSTRAINT app_user_pkey PRIMARY KEY (user_id)
)
