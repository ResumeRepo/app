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
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE public.user OWNER TO root;

CREATE TABLE IF NOT EXISTS public.form (
    id bigserial PRIMARY KEY NOT NULL,
    expiration VARCHAR(255) NOT NULL,
    edition VARCHAR(255) NOT NULL,
    form_number VARCHAR(255) NOT NULL,
    updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id bigint NOT NULL
);
ALTER TABLE public.form OWNER TO root;

CREATE TABLE IF NOT EXISTS public.part (
    id bigserial PRIMARY KEY NOT NULL,
    part_number VARCHAR(255) NOT NULL,
    sort_order bigint NOT NULL DEFAULT 0,
    updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id bigint NOT NULL,
    form_id bigint NOT NULL
);
ALTER TABLE public.part OWNER TO root;

CREATE TABLE IF NOT EXISTS public.field (
    id bigserial PRIMARY KEY NOT NULL,
    field_number VARCHAR(255) NOT NULL,
    is_required boolean NOT NULL,

--     A selection may be Apt. Suite, or Floor
    selection VARCHAR,

--     A field value may be the unit number
    field_value VARCHAR,


--     What type of field is this? The selection above is of this data type
    is_text boolean NOT NULL,
    is_number boolean NOT NULL,
    is_date boolean NOT NULL,
    is_checkbox boolean NOT NULL,
    is_radio boolean NOT NULL,
    is_dropdown boolean NOT NULL,

    updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id bigint NOT NULL,
    form_id bigint NOT NULL,
    part_id bigint NOT NULL
);
ALTER TABLE public.field OWNER TO root;