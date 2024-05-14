-- Table: public.users
-- DROP TABLE IF EXISTS public.users;
CREATE TABLE IF NOT EXISTS public.users
(
    id bigserial NOT NULL PRIMARY KEY,
    email character varying(100) NOT NULL,
    first_name character varying(100),
    second_name character varying(100),
    phone_number character varying(20),
    username character varying(100) NOT NULL,
    password character varying(100) NOT NULL
);

-- Table: public.roles
-- DROP TABLE IF EXISTS public.roles;
CREATE TABLE IF NOT EXISTS public.roles
(
    id bigserial NOT NULL PRIMARY KEY,
    name character varying(100) NOT NULL
);


-- Table: public.users_roles
-- DROP TABLE IF EXISTS public.users_roles;
CREATE TABLE IF NOT EXISTS public.users_roles
(
    user_id bigint NOT NULL,
    role_id bigint NOT NULL,
    CONSTRAINT user_id_fkey FOREIGN KEY (user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    CONSTRAINT role_id_fkey FOREIGN KEY (role_id)
    REFERENCES public.roles (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE CASCADE
);




-- Table: public.tests
-- DROP TABLE IF EXISTS public.tests;
CREATE TABLE IF NOT EXISTS public.tests
(
    id bigserial NOT NULL PRIMARY KEY,
    author varchar(100) NOT NULL,
    name varchar(100) NOT NULL,
    description text,
    topic varchar(100) NOT NULL,
    status smallint
);

-- Table: public.questions
-- DROP TABLE IF EXISTS public.questions;
CREATE TABLE IF NOT EXISTS public.questions
(
    id bigserial NOT NULL PRIMARY KEY,
    text varchar(255) NOT NULL,
    type smallint NOT NULL
);

-- Table: public.answers
-- DROP TABLE IF EXISTS public.answers;
CREATE TABLE IF NOT EXISTS public.answers
(
    id bigserial NOT NULL PRIMARY KEY,
    is_correct boolean NOT NULL,
    text varchar(255)
);


-- Table: public.tests_questions
-- DROP TABLE IF EXISTS public.tests_questions;
CREATE TABLE IF NOT EXISTS public.tests_questions
(
    test_id bigint NOT NULL,
    question_id bigint NOT NULL,
    CONSTRAINT test_id_fkey FOREIGN KEY (test_id)
        REFERENCES public.tests (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT question_id_fkey FOREIGN KEY (question_id)
        REFERENCES public.questions (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- Table: public.questions_answers
-- DROP TABLE IF EXISTS public.questions_answers;
CREATE TABLE IF NOT EXISTS public.questions_answers
(
    question_id bigint NOT NULL,
    answer_id bigint NOT NULL,
    CONSTRAINT question_id_fkey FOREIGN KEY (question_id)
        REFERENCES public.questions (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT answer_id_fkey FOREIGN KEY (answer_id)
        REFERENCES public.answers (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
);
