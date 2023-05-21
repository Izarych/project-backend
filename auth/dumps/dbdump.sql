--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tokens (
    id integer NOT NULL,
    "userId" integer,
    "refreshToken" text,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.tokens OWNER TO postgres;

--
-- Name: tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tokens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tokens_id_seq OWNER TO postgres;

--
-- Name: tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tokens_id_seq OWNED BY public.tokens.id;


--
-- Name: tokens id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens ALTER COLUMN id SET DEFAULT nextval('public.tokens_id_seq'::regclass);


--
-- Data for Name: tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tokens (id, "userId", "refreshToken", "updatedAt") FROM stdin;
1	9	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjksImVtYWlsIjoiYXJ0eW9tMzU5QGlsLnJ1IiwiaXNBY3RpdmF0ZWQiOmZhbHNlLCJpYXQiOjE2ODMwNTYwMzQsImV4cCI6MTY4MzkyMDAzNH0.hTO7p6VgDNPY3xR_5XP02l-qUkMOpThm-LLIkfK8tcE	2023-05-02 22:33:54.184+03
2	2	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoicGlrYWNoMzV1MzU5QG1haWwucnUiLCJpc0FjdGl2YXRlZCI6ZmFsc2UsInJvbGVzIjpbeyJpZCI6MSwidmFsdWUiOiJVU0VSIiwiZGVzY3JpcHRpb24iOiLQn9C-0LvRjNC30L7QstCw0YLQtdC70YwiLCJVc2VyUm9sZXMiOnsiaWQiOjEsInVzZXJJZCI6Miwicm9sZUlkIjoxfX0seyJpZCI6MiwidmFsdWUiOiJBRE1JTiIsImRlc2NyaXB0aW9uIjoi0JDQtNC80LjQvSIsIlVzZXJSb2xlcyI6eyJpZCI6MiwidXNlcklkIjoyLCJyb2xlSWQiOjJ9fV0sImlhdCI6MTY4MzM4MzU4OSwiZXhwIjoxNjg0MjQ3NTg5fQ.BMvTMsiM8nTYg5aQ7WtEkjiTAvMpCTiq-t5wwg5UJMU	2023-05-06 17:33:09.188+03
4	4	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImVtYWlsIjoicGlrYTNjaDMzNXUzNTlAbWFpbC5ydSIsImlzQWN0aXZhdGVkIjpmYWxzZSwicm9sZXMiOlt7ImlkIjoxLCJ2YWx1ZSI6IlVTRVIiLCJkZXNjcmlwdGlvbiI6ItCf0L7Qu9GM0LfQvtCy0LDRgtC10LvRjCIsIlVzZXJSb2xlcyI6eyJpZCI6NCwidXNlcklkIjo0LCJyb2xlSWQiOjF9fV0sImlhdCI6MTY4Mzg5OTA0OSwiZXhwIjoxNjg0NzYzMDQ5fQ.dEGqNydTyFdoKERLmqVoctuTqUairlbQwoPctNii8Jc	2023-05-12 16:44:09.913+03
5	5	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImVtYWlsIjoicGlrYTMzY2gzMzV1MzU5QG1haWwucnUiLCJpc0FjdGl2YXRlZCI6ZmFsc2UsInJvbGVzIjpbeyJpZCI6MSwidmFsdWUiOiJVU0VSIiwiZGVzY3JpcHRpb24iOiLQn9C-0LvRjNC30L7QstCw0YLQtdC70YwiLCJVc2VyUm9sZXMiOnsiaWQiOjUsInVzZXJJZCI6NSwicm9sZUlkIjoxfX1dLCJpYXQiOjE2ODM5MDAwNzgsImV4cCI6MTY4NDc2NDA3OH0.Bw0oSOCFbGLJkOss7KfEBt_-7UNFr3HgCFwaIpmnaNU	2023-05-12 17:01:18.477+03
6	6	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImVtYWlsIjoicGlrYTMzYzNoMzM1dTM1OUBtYWlsLnJ1IiwiaXNBY3RpdmF0ZWQiOmZhbHNlLCJyb2xlcyI6W3siaWQiOjEsInZhbHVlIjoiVVNFUiIsImRlc2NyaXB0aW9uIjoi0J_QvtC70YzQt9C-0LLQsNGC0LXQu9GMIiwiVXNlclJvbGVzIjp7ImlkIjo2LCJ1c2VySWQiOjYsInJvbGVJZCI6MX19XSwiaWF0IjoxNjgzOTAwNTU0LCJleHAiOjE2ODQ3NjQ1NTR9.xyUKgyiuK1QrdJ6MS0EZlYP4qvPDkmX3oAuauOQX6T4	2023-05-12 17:09:14.04+03
3	3	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImVtYWlsIjoicGlrYWNoMzM1dTM1OUBtYWlsLnJ1IiwiaXNBY3RpdmF0ZWQiOmZhbHNlLCJyb2xlcyI6W3siaWQiOjEsInZhbHVlIjoiVVNFUiIsImRlc2NyaXB0aW9uIjoi0J_QvtC70YzQt9C-0LLQsNGC0LXQu9GMIiwiVXNlclJvbGVzIjp7ImlkIjozLCJ1c2VySWQiOjMsInJvbGVJZCI6MX19XSwiaWF0IjoxNjgzMzgzOTcyLCJleHAiOjE2ODQyNDc5NzJ9.b2IKlF3-dUQ3BTyGRfE937WZMgXD8T16SwAAgLPYALA	2023-05-06 17:39:32.378+03
7	7	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImVtYWlsIjoibmV3bWFpbEBtYWlsLnJ1IiwiaXNBY3RpdmF0ZWQiOmZhbHNlLCJyb2xlcyI6W3siaWQiOjEsInZhbHVlIjoiVVNFUiIsImRlc2NyaXB0aW9uIjoi0J_QvtC70YzQt9C-0LLQsNGC0LXQu9GMIiwiVXNlclJvbGVzIjp7ImlkIjo3LCJ1c2VySWQiOjcsInJvbGVJZCI6MX19XSwiaWF0IjoxNjgzOTI2MDkzLCJleHAiOjE2ODQ3OTAwOTN9.E80k2QsAsEnePmzYRqDM3x4x7o8PsVQY3bJDXg58t2Y	2023-05-13 00:14:53.386+03
\.


--
-- Name: tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tokens_id_seq', 7, true);


--
-- Name: tokens tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_pkey PRIMARY KEY (id);


--
-- Name: tokens tokens_userId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT "tokens_userId_key" UNIQUE ("userId");


--
-- PostgreSQL database dump complete
--

