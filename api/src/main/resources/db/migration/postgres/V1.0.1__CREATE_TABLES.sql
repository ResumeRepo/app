CREATE SCHEMA IF NOT EXISTS public;

CREATE TABLE IF NOT EXISTS public.user (
    id bigserial PRIMARY KEY NOT NULL,
    uid VARCHAR(255) NOT NULL,
    username VARCHAR(255),
    full_name VARCHAR(255),
    email VARCHAR(255),
    roles VARCHAR(255)[],
    avatar_url VARCHAR,
    anonymous boolean NOT NULL DEFAULT false,
    is_premium_user boolean NOT NULL DEFAULT false,
    updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(uid)
);
ALTER TABLE public.user OWNER TO root;

CREATE TABLE IF NOT EXISTS public.base_resume (
    id bigserial PRIMARY KEY NOT NULL,
    uid VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    s3_key VARCHAR(255),
    version integer NOT NULL,
    resume text,
    updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(uid)
);
ALTER TABLE public.base_resume OWNER TO root;

CREATE TABLE IF NOT EXISTS public.job_post (
    id bigserial PRIMARY KEY NOT NULL,
    uid VARCHAR(255) NOT NULL,
    job_id VARCHAR(255) NOT NULL,
    job_board VARCHAR(255) NOT NULL,
    job_title VARCHAR(1024),
    company_name VARCHAR(1024),
    company_info VARCHAR(1024),
    location VARCHAR(1024),
    salary VARCHAR(255),
    logo_url VARCHAR(255),
    job_description text,
    updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(job_id, job_board)
);
ALTER TABLE public.job_post OWNER TO root;

CREATE TABLE IF NOT EXISTS public.resume (
    id bigserial PRIMARY KEY NOT NULL,
    uid VARCHAR(255) NOT NULL,
    base_resume_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    job_post_id integer NOT NULL,
    template_id VARCHAR(255),
    resume text,
    updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(uid, base_resume_id)
);
ALTER TABLE public.resume OWNER TO root;

CREATE TABLE IF NOT EXISTS public.template_style (
    id bigserial PRIMARY KEY NOT NULL,
    uid VARCHAR(255) NOT NULL,
    template_id VARCHAR(255) NOT NULL,
    css text,
    updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE public.template_style OWNER TO root;
