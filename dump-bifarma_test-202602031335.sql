--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2026-02-03 13:35:26 WIB

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE bifarma_test;
--
-- TOC entry 3749 (class 1262 OID 18021)
-- Name: bifarma_test; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE bifarma_test WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';


ALTER DATABASE bifarma_test OWNER TO postgres;

\connect bifarma_test

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 224 (class 1259 OID 18053)
-- Name: m_ca_analyses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.m_ca_analyses (
    id bigint NOT NULL,
    created_by character varying(100) NOT NULL,
    created_on timestamp without time zone NOT NULL,
    last_updated_by character varying(100) NOT NULL,
    last_updated_on timestamp without time zone,
    is_active boolean DEFAULT true NOT NULL,
    code text,
    description text,
    parameter_id bigint,
    method_id bigint,
    sample_type_id bigint,
    lead_time timestamp without time zone
);


ALTER TABLE public.m_ca_analyses OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 18052)
-- Name: m_ca_analyses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.m_ca_analyses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.m_ca_analyses_id_seq OWNER TO postgres;

--
-- TOC entry 3750 (class 0 OID 0)
-- Dependencies: 223
-- Name: m_ca_analyses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.m_ca_analyses_id_seq OWNED BY public.m_ca_analyses.id;


--
-- TOC entry 218 (class 1259 OID 18023)
-- Name: m_ca_methods; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.m_ca_methods (
    id bigint NOT NULL,
    created_by character varying(100) NOT NULL,
    created_on timestamp without time zone NOT NULL,
    last_updated_by character varying(100) NOT NULL,
    last_updated_on timestamp without time zone,
    is_active boolean DEFAULT true NOT NULL,
    code text,
    description text
);


ALTER TABLE public.m_ca_methods OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 18022)
-- Name: m_ca_methods_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.m_ca_methods_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.m_ca_methods_id_seq OWNER TO postgres;

--
-- TOC entry 3751 (class 0 OID 0)
-- Dependencies: 217
-- Name: m_ca_methods_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.m_ca_methods_id_seq OWNED BY public.m_ca_methods.id;


--
-- TOC entry 220 (class 1259 OID 18033)
-- Name: m_ca_parameters; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.m_ca_parameters (
    id bigint NOT NULL,
    created_by character varying(100) NOT NULL,
    created_on timestamp without time zone NOT NULL,
    last_updated_by character varying(100) NOT NULL,
    last_updated_on timestamp without time zone,
    is_active boolean DEFAULT true NOT NULL,
    code text,
    description text
);


ALTER TABLE public.m_ca_parameters OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 18032)
-- Name: m_ca_parameters_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.m_ca_parameters_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.m_ca_parameters_id_seq OWNER TO postgres;

--
-- TOC entry 3752 (class 0 OID 0)
-- Dependencies: 219
-- Name: m_ca_parameters_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.m_ca_parameters_id_seq OWNED BY public.m_ca_parameters.id;


--
-- TOC entry 222 (class 1259 OID 18043)
-- Name: m_ca_sample_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.m_ca_sample_types (
    id bigint NOT NULL,
    created_by character varying(100) NOT NULL,
    created_on timestamp without time zone NOT NULL,
    last_updated_by character varying(100) NOT NULL,
    last_updated_on timestamp without time zone,
    is_active boolean DEFAULT true NOT NULL,
    code text,
    description text
);


ALTER TABLE public.m_ca_sample_types OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 18042)
-- Name: m_ca_sample_types_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.m_ca_sample_types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.m_ca_sample_types_id_seq OWNER TO postgres;

--
-- TOC entry 3753 (class 0 OID 0)
-- Dependencies: 221
-- Name: m_ca_sample_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.m_ca_sample_types_id_seq OWNED BY public.m_ca_sample_types.id;


--
-- TOC entry 3578 (class 2604 OID 18056)
-- Name: m_ca_analyses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.m_ca_analyses ALTER COLUMN id SET DEFAULT nextval('public.m_ca_analyses_id_seq'::regclass);


--
-- TOC entry 3572 (class 2604 OID 18026)
-- Name: m_ca_methods id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.m_ca_methods ALTER COLUMN id SET DEFAULT nextval('public.m_ca_methods_id_seq'::regclass);


--
-- TOC entry 3574 (class 2604 OID 18036)
-- Name: m_ca_parameters id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.m_ca_parameters ALTER COLUMN id SET DEFAULT nextval('public.m_ca_parameters_id_seq'::regclass);


--
-- TOC entry 3576 (class 2604 OID 18046)
-- Name: m_ca_sample_types id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.m_ca_sample_types ALTER COLUMN id SET DEFAULT nextval('public.m_ca_sample_types_id_seq'::regclass);


--
-- TOC entry 3743 (class 0 OID 18053)
-- Dependencies: 224
-- Data for Name: m_ca_analyses; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3737 (class 0 OID 18023)
-- Dependencies: 218
-- Data for Name: m_ca_methods; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3739 (class 0 OID 18033)
-- Dependencies: 220
-- Data for Name: m_ca_parameters; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3741 (class 0 OID 18043)
-- Dependencies: 222
-- Data for Name: m_ca_sample_types; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3754 (class 0 OID 0)
-- Dependencies: 223
-- Name: m_ca_analyses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.m_ca_analyses_id_seq', 1, false);


--
-- TOC entry 3755 (class 0 OID 0)
-- Dependencies: 217
-- Name: m_ca_methods_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.m_ca_methods_id_seq', 1, false);


--
-- TOC entry 3756 (class 0 OID 0)
-- Dependencies: 219
-- Name: m_ca_parameters_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.m_ca_parameters_id_seq', 1, false);


--
-- TOC entry 3757 (class 0 OID 0)
-- Dependencies: 221
-- Name: m_ca_sample_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.m_ca_sample_types_id_seq', 1, false);


--
-- TOC entry 3587 (class 2606 OID 18061)
-- Name: m_ca_analyses m_ca_analyses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.m_ca_analyses
    ADD CONSTRAINT m_ca_analyses_pkey PRIMARY KEY (id);


--
-- TOC entry 3581 (class 2606 OID 18031)
-- Name: m_ca_methods m_ca_methods_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.m_ca_methods
    ADD CONSTRAINT m_ca_methods_pkey PRIMARY KEY (id);


--
-- TOC entry 3583 (class 2606 OID 18041)
-- Name: m_ca_parameters m_ca_parameters_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.m_ca_parameters
    ADD CONSTRAINT m_ca_parameters_pkey PRIMARY KEY (id);


--
-- TOC entry 3585 (class 2606 OID 18051)
-- Name: m_ca_sample_types m_ca_sample_types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.m_ca_sample_types
    ADD CONSTRAINT m_ca_sample_types_pkey PRIMARY KEY (id);


--
-- TOC entry 3588 (class 2606 OID 18067)
-- Name: m_ca_analyses fk_analyses_method; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.m_ca_analyses
    ADD CONSTRAINT fk_analyses_method FOREIGN KEY (method_id) REFERENCES public.m_ca_methods(id);


--
-- TOC entry 3589 (class 2606 OID 18072)
-- Name: m_ca_analyses fk_analyses_parameter; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.m_ca_analyses
    ADD CONSTRAINT fk_analyses_parameter FOREIGN KEY (parameter_id) REFERENCES public.m_ca_parameters(id);


--
-- TOC entry 3590 (class 2606 OID 18062)
-- Name: m_ca_analyses fk_analyses_sample_type; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.m_ca_analyses
    ADD CONSTRAINT fk_analyses_sample_type FOREIGN KEY (sample_type_id) REFERENCES public.m_ca_sample_types(id);


-- Completed on 2026-02-03 13:35:26 WIB

--
-- PostgreSQL database dump complete
--

