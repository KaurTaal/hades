--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2 (Debian 15.2-1.pgdg110+1)
-- Dumped by pg_dump version 15.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;




ALTER SCHEMA public OWNER TO pg_database_owner;



--
-- Name: delete_unassigned_b_entities(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.delete_unassigned_b_entities() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    DELETE FROM label
    WHERE label_id NOT IN (
        SELECT label_id FROM exercise_m_label
    );
    RETURN NULL;
END;
$$;


ALTER FUNCTION public.delete_unassigned_b_entities() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: course; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.course (
    course_code character varying(50) NOT NULL,
    name text
);


ALTER TABLE public.course OWNER TO postgres;

--
-- Name: file; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.file (
    file_id bigint NOT NULL,
    content bytea NOT NULL,
    name text NOT NULL,
    mime_type text NOT NULL,
    size bigint NOT NULL
);


ALTER TABLE public.file OWNER TO postgres;

--
-- Name: COLUMN file.file_id; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.file.file_id IS 'Primary id for document';


--
-- Name: COLUMN file.content; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.file.content IS 'Binary content of the file';


--
-- Name: COLUMN file.name; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.file.name IS 'Document name';


--
-- Name: COLUMN file.mime_type; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.file.mime_type IS 'Document mime type (e.g jpeg, pdf)';


--
-- Name: COLUMN file.size; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.file.size IS 'The size of the document';


--
-- Name: document_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.document_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.document_id_seq OWNER TO postgres;

--
-- Name: document_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.document_id_seq OWNED BY public.file.file_id;


--
-- Name: exercise_document; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.exercise_document (
    exercise_id bigint NOT NULL,
    file_id bigint,
    year integer,
    course_code character varying(50)
);


ALTER TABLE public.exercise_document OWNER TO postgres;

--
-- Name: COLUMN exercise_document.exercise_id; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.exercise_document.exercise_id IS 'Primary id for manual';


--
-- Name: COLUMN exercise_document.file_id; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.exercise_document.file_id IS 'Corresponding document id';


--
-- Name: exercise_document_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.exercise_document_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.exercise_document_id_seq OWNER TO postgres;

--
-- Name: exercise_document_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.exercise_document_id_seq OWNED BY public.exercise_document.exercise_id;


--
-- Name: exercise_m_label; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.exercise_m_label (
    id bigint NOT NULL,
    exercise_id bigint,
    label_id bigint
);


ALTER TABLE public.exercise_m_label OWNER TO postgres;

--
-- Name: exercise_m_label_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.exercise_m_label_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.exercise_m_label_id_seq OWNER TO postgres;

--
-- Name: exercise_m_label_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.exercise_m_label_id_seq OWNED BY public.exercise_m_label.id;


--
-- Name: hades_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hades_user (
    user_id bigint NOT NULL,
    email character varying(225),
    password character varying(225),
    role character varying(225),
    status character varying(225)
);


ALTER TABLE public.hades_user OWNER TO postgres;

--
-- Name: hades_user_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hades_user_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.hades_user_user_id_seq OWNER TO postgres;

--
-- Name: hades_user_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.hades_user_user_id_seq OWNED BY public.hades_user.user_id;


--
-- Name: label; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.label (
    label_id integer NOT NULL,
    name character varying(255)
);


ALTER TABLE public.label OWNER TO postgres;

--
-- Name: label_label_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.label_label_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.label_label_id_seq OWNER TO postgres;

--
-- Name: label_label_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.label_label_id_seq OWNED BY public.label.label_id;


--
-- Name: manual_document; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.manual_document (
    manual_id bigint NOT NULL,
    file_id bigint,
    year integer,
    course_code character varying(50)
);


ALTER TABLE public.manual_document OWNER TO postgres;

--
-- Name: COLUMN manual_document.manual_id; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.manual_document.manual_id IS 'Primary id for manual';


--
-- Name: COLUMN manual_document.file_id; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.manual_document.file_id IS 'Corresponding document id';


--
-- Name: manual_document_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.manual_document_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.manual_document_id_seq OWNER TO postgres;

--
-- Name: manual_document_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.manual_document_id_seq OWNED BY public.manual_document.manual_id;


--
-- Name: solution; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.solution (
    solution_id bigint NOT NULL,
    exercise_id bigint,
    file_id bigint
);


ALTER TABLE public.solution OWNER TO postgres;

--
-- Name: solution_solution_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.solution_solution_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.solution_solution_id_seq OWNER TO postgres;

--
-- Name: solution_solution_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.solution_solution_id_seq OWNED BY public.solution.solution_id;


--
-- Name: test_suite; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.test_suite (
    test_suite_id bigint NOT NULL,
    exercise_id bigint,
    file_id bigint
);


ALTER TABLE public.test_suite OWNER TO postgres;

--
-- Name: test_suite_test_suite_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.test_suite_test_suite_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.test_suite_test_suite_id_seq OWNER TO postgres;

--
-- Name: test_suite_test_suite_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.test_suite_test_suite_id_seq OWNED BY public.test_suite.test_suite_id;


--
-- Name: exercise_document exercise_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise_document ALTER COLUMN exercise_id SET DEFAULT nextval('public.exercise_document_id_seq'::regclass);


--
-- Name: exercise_m_label id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise_m_label ALTER COLUMN id SET DEFAULT nextval('public.exercise_m_label_id_seq'::regclass);


--
-- Name: file file_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.file ALTER COLUMN file_id SET DEFAULT nextval('public.document_id_seq'::regclass);


--
-- Name: hades_user user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hades_user ALTER COLUMN user_id SET DEFAULT nextval('public.hades_user_user_id_seq'::regclass);


--
-- Name: label label_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.label ALTER COLUMN label_id SET DEFAULT nextval('public.label_label_id_seq'::regclass);


--
-- Name: manual_document manual_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.manual_document ALTER COLUMN manual_id SET DEFAULT nextval('public.manual_document_id_seq'::regclass);


--
-- Name: solution solution_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solution ALTER COLUMN solution_id SET DEFAULT nextval('public.solution_solution_id_seq'::regclass);


--
-- Name: test_suite test_suite_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.test_suite ALTER COLUMN test_suite_id SET DEFAULT nextval('public.test_suite_test_suite_id_seq'::regclass);


--
-- Data for Name: course; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.course (course_code, name) FROM stdin;
LTAT.03.001	LTAT.03.001 Programmeerimine
\.


--
-- Data for Name: exercise_document; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.exercise_document (exercise_id, file_id, year, course_code) FROM stdin;
\.


--
-- Data for Name: exercise_m_label; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.exercise_m_label (id, exercise_id, label_id) FROM stdin;
\.


--
-- Data for Name: file; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.file (file_id, content, name, mime_type, size) FROM stdin;
\.


--
-- Data for Name: hades_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.hades_user (user_id, email, password, role, status) FROM stdin;
48	taalkaur@gmail.com	$2a$10$r6mOoZxduzExn3omPDbbfOoqi62KZk7Q4M7CJi0I.ds1fUoRKdbRK	ADMIN	ACTIVATED
\.


--
-- Data for Name: label; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.label (label_id, name) FROM stdin;
\.


--
-- Data for Name: manual_document; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.manual_document (manual_id, file_id, year, course_code) FROM stdin;
\.


--
-- Data for Name: solution; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.solution (solution_id, exercise_id, file_id) FROM stdin;
\.


--
-- Data for Name: test_suite; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.test_suite (test_suite_id, exercise_id, file_id) FROM stdin;
\.


--
-- Name: document_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.document_id_seq', 369, true);


--
-- Name: exercise_document_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.exercise_document_id_seq', 158, true);


--
-- Name: exercise_m_label_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.exercise_m_label_id_seq', 167, true);


--
-- Name: hades_user_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.hades_user_user_id_seq', 48, true);


--
-- Name: label_label_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.label_label_id_seq', 125, true);


--
-- Name: manual_document_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.manual_document_id_seq', 102, true);


--
-- Name: solution_solution_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.solution_solution_id_seq', 34, true);


--
-- Name: test_suite_test_suite_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.test_suite_test_suite_id_seq', 60, true);


--
-- Name: course course_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course
    ADD CONSTRAINT course_pkey PRIMARY KEY (course_code);


--
-- Name: exercise_document exercise_document_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise_document
    ADD CONSTRAINT exercise_document_pkey PRIMARY KEY (exercise_id);


--
-- Name: exercise_m_label exercise_m_label_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise_m_label
    ADD CONSTRAINT exercise_m_label_pkey PRIMARY KEY (id);


--
-- Name: hades_user hades_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hades_user
    ADD CONSTRAINT hades_user_pkey PRIMARY KEY (user_id);


--
-- Name: label label_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.label
    ADD CONSTRAINT label_pkey PRIMARY KEY (label_id);


--
-- Name: manual_document manual_document_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.manual_document
    ADD CONSTRAINT manual_document_pkey PRIMARY KEY (manual_id);


--
-- Name: file pk_document; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.file
    ADD CONSTRAINT pk_document PRIMARY KEY (file_id);


--
-- Name: solution solution_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solution
    ADD CONSTRAINT solution_pkey PRIMARY KEY (solution_id);


--
-- Name: test_suite test_suite_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.test_suite
    ADD CONSTRAINT test_suite_pkey PRIMARY KEY (test_suite_id);


--
-- Name: exercise_m_label unique_label_per_document; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise_m_label
    ADD CONSTRAINT unique_label_per_document UNIQUE (exercise_id, label_id);


--
-- Name: exercise_document after_delete_exercise; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER after_delete_exercise AFTER DELETE ON public.exercise_document FOR EACH ROW EXECUTE FUNCTION public.delete_unassigned_b_entities();


--
-- Name: exercise_m_label exercise_m_label_exercise_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise_m_label
    ADD CONSTRAINT exercise_m_label_exercise_id_fkey FOREIGN KEY (exercise_id) REFERENCES public.exercise_document(exercise_id);


--
-- Name: exercise_m_label exercise_m_label_label_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise_m_label
    ADD CONSTRAINT exercise_m_label_label_id_fkey FOREIGN KEY (label_id) REFERENCES public.label(label_id);


--
-- Name: exercise_document fk_course_code; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise_document
    ADD CONSTRAINT fk_course_code FOREIGN KEY (course_code) REFERENCES public.course(course_code);


--
-- Name: manual_document fk_course_code; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.manual_document
    ADD CONSTRAINT fk_course_code FOREIGN KEY (course_code) REFERENCES public.course(course_code);


--
-- Name: exercise_document fk_exercise; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise_document
    ADD CONSTRAINT fk_exercise FOREIGN KEY (file_id) REFERENCES public.file(file_id);


--
-- Name: manual_document fk_manual; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.manual_document
    ADD CONSTRAINT fk_manual FOREIGN KEY (file_id) REFERENCES public.file(file_id);


--
-- Name: solution solution_exercise_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solution
    ADD CONSTRAINT solution_exercise_id_fkey FOREIGN KEY (exercise_id) REFERENCES public.exercise_document(exercise_id);


--
-- Name: solution solution_file_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.solution
    ADD CONSTRAINT solution_file_id_fkey FOREIGN KEY (file_id) REFERENCES public.file(file_id);


--
-- Name: test_suite test_suite_exercise_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.test_suite
    ADD CONSTRAINT test_suite_exercise_id_fkey FOREIGN KEY (exercise_id) REFERENCES public.exercise_document(exercise_id);


--
-- Name: test_suite test_suite_file_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.test_suite
    ADD CONSTRAINT test_suite_file_id_fkey FOREIGN KEY (file_id) REFERENCES public.file(file_id);


--
-- PostgreSQL database dump complete
--

