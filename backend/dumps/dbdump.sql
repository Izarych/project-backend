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
-- Name: genres; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.genres (
    id integer NOT NULL,
    genre character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.genres OWNER TO postgres;

--
-- Name: genres_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.genres_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.genres_id_seq OWNER TO postgres;

--
-- Name: genres_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.genres_id_seq OWNED BY public.genres.id;


--
-- Name: images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.images (
    id integer NOT NULL,
    image text,
    "movieId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.images OWNER TO postgres;

--
-- Name: images_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.images_id_seq OWNER TO postgres;

--
-- Name: images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.images_id_seq OWNED BY public.images.id;


--
-- Name: movie_genres; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movie_genres (
    id integer NOT NULL,
    "genreId" integer,
    "movieId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.movie_genres OWNER TO postgres;

--
-- Name: movie_genres_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.movie_genres_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.movie_genres_id_seq OWNER TO postgres;

--
-- Name: movie_genres_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.movie_genres_id_seq OWNED BY public.movie_genres.id;


--
-- Name: movie_people; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movie_people (
    id integer NOT NULL,
    "peopleId" integer,
    "movieId" integer
);


ALTER TABLE public.movie_people OWNER TO postgres;

--
-- Name: movie_people_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.movie_people_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.movie_people_id_seq OWNER TO postgres;

--
-- Name: movie_people_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.movie_people_id_seq OWNED BY public.movie_people.id;


--
-- Name: movies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.movies (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    "originalTitle" character varying(255),
    "ageRate" integer NOT NULL,
    description text NOT NULL,
    "yearSince" integer NOT NULL,
    "yearTill" integer NOT NULL,
    country character varying(255) NOT NULL,
    "premierRussia" character varying(255),
    premier character varying(255),
    seasons integer,
    rate real,
    "rateQuantity" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.movies OWNER TO postgres;

--
-- Name: movies_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.movies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.movies_id_seq OWNER TO postgres;

--
-- Name: movies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.movies_id_seq OWNED BY public.movies.id;


--
-- Name: people; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.people (
    id integer NOT NULL,
    "fullName" character varying(255) NOT NULL,
    "fullNameOrig" character varying(255),
    profession character varying(255) NOT NULL,
    photo text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.people OWNER TO postgres;

--
-- Name: people_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.people_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.people_id_seq OWNER TO postgres;

--
-- Name: people_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.people_id_seq OWNED BY public.people.id;


--
-- Name: genres id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genres ALTER COLUMN id SET DEFAULT nextval('public.genres_id_seq'::regclass);


--
-- Name: images id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images ALTER COLUMN id SET DEFAULT nextval('public.images_id_seq'::regclass);


--
-- Name: movie_genres id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_genres ALTER COLUMN id SET DEFAULT nextval('public.movie_genres_id_seq'::regclass);


--
-- Name: movie_people id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_people ALTER COLUMN id SET DEFAULT nextval('public.movie_people_id_seq'::regclass);


--
-- Name: movies id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movies ALTER COLUMN id SET DEFAULT nextval('public.movies_id_seq'::regclass);


--
-- Name: people id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.people ALTER COLUMN id SET DEFAULT nextval('public.people_id_seq'::regclass);


--
-- Data for Name: genres; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.genres (id, genre, "createdAt", "updatedAt") FROM stdin;
1	драма	2023-04-25 21:42:50.914+03	2023-04-25 21:42:50.914+03
2	комедия	2023-04-25 21:42:50.992+03	2023-04-25 21:42:50.992+03
3	биография	2023-04-25 21:42:51.025+03	2023-04-25 21:42:51.025+03
4	криминал	2023-04-25 21:44:12.773+03	2023-04-25 21:44:12.773+03
5	боевик	2023-04-25 21:44:12.829+03	2023-04-25 21:44:12.829+03
\.


--
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.images (id, image, "movieId", "createdAt", "updatedAt") FROM stdin;
1	https://avatars.mds.yandex.net/get-kinopoisk-image/1629390/572b22e3-5103-45b9-883d-c0a485d03ae8/orig	1	2023-04-25 21:42:54.395+03	2023-04-25 21:42:54.41+03
2	https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/7f8f950d-8cea-4cbb-9202-04215c5013ec/orig	1	2023-04-25 21:42:54.424+03	2023-04-25 21:42:54.434+03
3	https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/5d8b2ddb-4134-4c5f-a972-274707c24bb1/orig	1	2023-04-25 21:42:54.445+03	2023-04-25 21:42:54.46+03
4	https://avatars.mds.yandex.net/get-kinopoisk-image/1629390/0a7fe01c-ab12-4246-86fe-35e60d1773f0/orig	1	2023-04-25 21:42:54.467+03	2023-04-25 21:42:54.494+03
5	https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/714a318c-87c5-40bf-a565-01d44e216696/orig	1	2023-04-25 21:42:54.499+03	2023-04-25 21:42:54.51+03
6	https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/d2f33a70-7c85-4884-8d17-01e86e763732/orig	1	2023-04-25 21:42:54.517+03	2023-04-25 21:42:54.529+03
7	https://avatars.mds.yandex.net/get-kinopoisk-image/1629390/5ed12f6a-2612-4759-b6d8-b2c25d279bad/orig	1	2023-04-25 21:42:54.533+03	2023-04-25 21:42:54.547+03
8	https://avatars.mds.yandex.net/get-kinopoisk-image/1629390/0b3af738-8a05-47fd-800a-6446d0953204/orig	1	2023-04-25 21:42:54.551+03	2023-04-25 21:42:54.563+03
9	https://avatars.mds.yandex.net/get-kinopoisk-image/1629390/e95915fb-a2b1-41b4-afdd-60a098118daa/orig	1	2023-04-25 21:42:54.568+03	2023-04-25 21:42:54.58+03
10	https://avatars.mds.yandex.net/get-kinopoisk-image/1704946/e4c01c43-6d46-4b73-8cdc-7f00a7e1d045/orig	1	2023-04-25 21:42:54.584+03	2023-04-25 21:42:54.596+03
11	https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/77e8ada4-f34e-49b8-9763-76f3ea7e3a0d/orig	1	2023-04-25 21:42:54.601+03	2023-04-25 21:42:54.612+03
12	https://avatars.mds.yandex.net/get-kinopoisk-image/1629390/0cbfc2aa-bbf3-4361-a0e6-57331f8f5c98/orig	1	2023-04-25 21:42:54.617+03	2023-04-25 21:42:54.628+03
13	https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/687d4836-2ff9-4910-aa99-b9b54e64f311/orig	1	2023-04-25 21:42:54.633+03	2023-04-25 21:42:54.645+03
14	https://avatars.mds.yandex.net/get-kinopoisk-image/1629390/044c7496-f828-4da6-b57c-63f864a8531a/orig	1	2023-04-25 21:42:54.651+03	2023-04-25 21:42:54.663+03
15	https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/a14d14ac-5ded-4af8-95fb-3cb808939c7c/orig	1	2023-04-25 21:42:54.667+03	2023-04-25 21:42:54.68+03
16	https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/3d0978ff-54f8-4cc2-b495-8c9dbd4ba708/orig	1	2023-04-25 21:42:54.683+03	2023-04-25 21:42:54.695+03
17	https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/b65a4165-e267-4880-9460-35608563b229/orig	1	2023-04-25 21:42:54.7+03	2023-04-25 21:42:54.711+03
18	https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/69bad35c-9bfc-49d2-b66f-4ec660a2ab28/orig	1	2023-04-25 21:42:54.717+03	2023-04-25 21:42:54.733+03
19	https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/bd3c56b3-3681-4137-9335-b849c42ed6ea/orig	1	2023-04-25 21:42:54.736+03	2023-04-25 21:42:54.749+03
20	https://avatars.mds.yandex.net/get-kinopoisk-image/1704946/b1e2e484-b95b-4771-aaad-6915259db8d0/orig	1	2023-04-25 21:42:54.753+03	2023-04-25 21:42:54.769+03
21	https://avatars.mds.yandex.net/get-kinopoisk-image/1629390/61601dc9-3a0b-46aa-99b0-3ada45d2b686/orig	1	2023-04-25 21:42:54.778+03	2023-04-25 21:42:54.785+03
22	https://avatars.mds.yandex.net/get-kinopoisk-image/1704946/f7006901-dc40-4011-9ba1-1b4243a59b26/orig	1	2023-04-25 21:42:54.797+03	2023-04-25 21:42:54.816+03
23	https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/42b6df55-33e7-4339-acdc-b50794e04561/orig	1	2023-04-25 21:42:54.828+03	2023-04-25 21:42:54.836+03
24	https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/1aabbe89-6cbe-4585-a520-8c0975502bcc/orig	1	2023-04-25 21:42:54.847+03	2023-04-25 21:42:54.861+03
25	https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/33ed3af6-435e-48b8-9fd6-59ba6a2e09dd/orig	1	2023-04-25 21:42:54.867+03	2023-04-25 21:42:54.884+03
26	https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/df70b8d2-9e2e-4522-8841-d14682b6eaea/orig	1	2023-04-25 21:42:54.897+03	2023-04-25 21:42:54.912+03
27	https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/d532460d-48ae-43b9-a153-8ab81ccf7b56/orig	1	2023-04-25 21:42:54.919+03	2023-04-25 21:42:54.933+03
28	https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/e3b3f009-4c7f-40c0-a05b-0e5dd5689dbf/orig	1	2023-04-25 21:42:54.943+03	2023-04-25 21:42:54.953+03
29	https://avatars.mds.yandex.net/get-kinopoisk-image/1777765/7e01ca3d-14d2-48cd-86e2-4de99562639d/orig	1	2023-04-25 21:42:54.964+03	2023-04-25 21:42:54.985+03
30	https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/2972e71c-235a-4ed3-95ae-af80672a7b85/orig	1	2023-04-25 21:42:55.02+03	2023-04-25 21:42:55.036+03
31	https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/c52d52de-e1ef-4059-a927-bb07562226cf/orig	1	2023-04-25 21:42:55.051+03	2023-04-25 21:42:55.064+03
32	https://avatars.mds.yandex.net/get-kinopoisk-image/1898899/4c78b2e3-ffed-4985-bbc2-642952c92f5e/orig	1	2023-04-25 21:42:55.069+03	2023-04-25 21:42:55.083+03
33	https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/1bb12631-5e91-42fe-a17a-ffe2a0ead165/orig	1	2023-04-25 21:42:55.093+03	2023-04-25 21:42:55.101+03
34	https://avatars.mds.yandex.net/get-kinopoisk-image/1777765/5314928c-6769-4b84-9131-c868f547deb3/orig	1	2023-04-25 21:42:55.115+03	2023-04-25 21:42:55.132+03
35	https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/c73592c4-675f-43c3-8a2b-a6f11f9e2535/orig	1	2023-04-25 21:42:55.143+03	2023-04-25 21:42:55.152+03
36	https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/bf93b465-1189-4155-9dd1-cb9fb5cb1bb5/orig	1	2023-04-25 21:42:55.163+03	2023-04-25 21:42:55.183+03
37	https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/c4cb60a9-6743-47df-9390-4707fd857481/orig	1	2023-04-25 21:42:55.202+03	2023-04-25 21:42:55.22+03
38	https://avatars.mds.yandex.net/get-kinopoisk-image/1629390/1c04262c-bb87-41b5-bbe7-8ff73b72a8ee/orig	1	2023-04-25 21:42:55.252+03	2023-04-25 21:42:55.315+03
39	https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/05af7dd7-05fd-4196-96c1-64734483ffa2/orig	1	2023-04-25 21:42:55.366+03	2023-04-25 21:42:55.4+03
40	https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/bb506aeb-f0a6-4d84-ae0a-478e9b1ba2a4/orig	1	2023-04-25 21:42:55.411+03	2023-04-25 21:42:55.434+03
41	https://avatars.mds.yandex.net/get-kinopoisk-image/1777765/3084687e-d635-4bcc-ad6b-7d78c8a15fb4/orig	1	2023-04-25 21:42:55.45+03	2023-04-25 21:42:55.478+03
42	https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/2bd160c7-5f30-41a0-b538-778277879625/orig	1	2023-04-25 21:42:55.485+03	2023-04-25 21:42:55.509+03
43	https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/e9be2b3b-83f0-4cb9-9492-6411529a35bc/orig	1	2023-04-25 21:42:55.515+03	2023-04-25 21:42:55.531+03
44	https://avatars.mds.yandex.net/get-kinopoisk-image/1629390/34b02ab9-9ecd-4b72-b2ff-72a0875060a5/orig	2	2023-04-25 21:44:16.931+03	2023-04-25 21:44:16.949+03
45	https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/b88f4392-526e-4747-868d-0773a3ad8246/orig	2	2023-04-25 21:44:16.965+03	2023-04-25 21:44:16.982+03
46	https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/5432fdc2-043d-43b3-9fe4-6bb83de2758e/orig	2	2023-04-25 21:44:16.992+03	2023-04-25 21:44:17.009+03
47	https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/570cfc7e-2ae9-4fd9-8193-1070b530879a/orig	2	2023-04-25 21:44:17.014+03	2023-04-25 21:44:17.028+03
48	https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/e3391701-0b2c-4635-bfcf-15c180f32bb6/orig	2	2023-04-25 21:44:17.041+03	2023-04-25 21:44:17.054+03
49	https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/7ef9bcba-4728-4950-8b88-147745c91bdc/orig	2	2023-04-25 21:44:17.063+03	2023-04-25 21:44:17.081+03
50	https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/1f2117e8-fbd0-48ef-b5e4-f8a8295ff1ff/orig	2	2023-04-25 21:44:17.094+03	2023-04-25 21:44:17.106+03
51	https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/c4783768-9a0e-406f-bf1e-457f73fd9a85/orig	2	2023-04-25 21:44:17.11+03	2023-04-25 21:44:17.12+03
52	https://avatars.mds.yandex.net/get-kinopoisk-image/1599028/83a23a45-fd32-4dca-8a86-17c462943d41/orig	2	2023-04-25 21:44:17.127+03	2023-04-25 21:44:17.14+03
53	https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/4f8662b3-a177-4e0c-a40a-084f07a31040/orig	2	2023-04-25 21:44:17.145+03	2023-04-25 21:44:17.157+03
54	https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/acc1a9a1-b88c-45fe-98de-84c6333eac02/orig	2	2023-04-25 21:44:17.161+03	2023-04-25 21:44:17.174+03
55	https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/088f2433-7e66-4494-91f9-8fbb8d27b7f5/orig	2	2023-04-25 21:44:17.178+03	2023-04-25 21:44:17.196+03
56	https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/4c28fc6e-3eb8-4e16-bb24-f3663c4ea3e4/orig	2	2023-04-25 21:44:17.208+03	2023-04-25 21:44:17.22+03
57	https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/6ca8cbb8-cec4-4ba3-8e7a-daa3c65aa381/orig	2	2023-04-25 21:44:17.228+03	2023-04-25 21:44:17.24+03
58	https://avatars.mds.yandex.net/get-kinopoisk-image/1777765/dad62acf-3a9d-412a-be30-9a3515677bb4/orig	2	2023-04-25 21:44:17.245+03	2023-04-25 21:44:17.259+03
59	https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/0b01ba82-eef4-4791-b3e2-d65e3c86712c/orig	2	2023-04-25 21:44:17.262+03	2023-04-25 21:44:17.275+03
60	https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/87ed5b49-a58e-4ed0-a0c9-7282578ce86a/orig	2	2023-04-25 21:44:17.279+03	2023-04-25 21:44:17.291+03
61	https://avatars.mds.yandex.net/get-kinopoisk-image/1629390/9f09efd5-6110-4f2d-8868-62693f2d2bc2/orig	2	2023-04-25 21:44:17.294+03	2023-04-25 21:44:17.312+03
62	https://avatars.mds.yandex.net/get-kinopoisk-image/1704946/26135e58-ac38-47c4-b5c4-f30cb9b2e5f2/orig	2	2023-04-25 21:44:17.32+03	2023-04-25 21:44:17.331+03
63	https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/32bc711b-a9d9-4eb8-9557-434336065f28/orig	2	2023-04-25 21:44:17.341+03	2023-04-25 21:44:17.356+03
64	https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/4c45ca27-0df8-4b74-91d0-f63af094ee08/orig	2	2023-04-25 21:44:17.365+03	2023-04-25 21:44:17.381+03
65	https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/b0818ad5-daeb-420b-a37a-66186d209788/orig	2	2023-04-25 21:44:17.394+03	2023-04-25 21:44:17.409+03
66	https://avatars.mds.yandex.net/get-kinopoisk-image/1777765/53b5261f-b5d7-4f5d-bebd-16b6e21d7f2d/orig	2	2023-04-25 21:44:17.414+03	2023-04-25 21:44:17.428+03
67	https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/9358314f-0ef3-4c4f-a00f-4d00d58d1244/orig	2	2023-04-25 21:44:17.436+03	2023-04-25 21:44:17.448+03
68	https://avatars.mds.yandex.net/get-kinopoisk-image/1777765/b90e3261-ded1-45ff-b452-f7fb0d1a67da/orig	2	2023-04-25 21:44:17.459+03	2023-04-25 21:44:17.474+03
69	https://avatars.mds.yandex.net/get-kinopoisk-image/1777765/ca69c70f-5a83-44d7-a9df-d4c541809d36/orig	2	2023-04-25 21:44:17.479+03	2023-04-25 21:44:17.493+03
70	https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/f5005b13-601c-40b8-ab32-e8a89e81dd48/orig	2	2023-04-25 21:44:17.499+03	2023-04-25 21:44:17.514+03
71	https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/b400ac76-72a9-447f-bfc2-50e4acd60609/orig	2	2023-04-25 21:44:17.526+03	2023-04-25 21:44:17.541+03
72	https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/bc6b84c7-52ce-49f6-85fc-247b1f36a5c6/orig	2	2023-04-25 21:44:17.546+03	2023-04-25 21:44:17.561+03
73	https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/9e498b23-c488-49d6-8759-92bd18397805/orig	2	2023-04-25 21:44:17.573+03	2023-04-25 21:44:17.591+03
74	https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/a03cad41-5338-4e97-997a-619f130f50d7/orig	2	2023-04-25 21:44:17.605+03	2023-04-25 21:44:17.615+03
75	https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/55c21dd3-036c-451e-b350-41f89cb9045b/orig	2	2023-04-25 21:44:17.632+03	2023-04-25 21:44:17.648+03
76	https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/d5cc31da-ec0c-4e4f-9282-614da6a5dbf2/orig	2	2023-04-25 21:44:17.663+03	2023-04-25 21:44:17.677+03
77	https://avatars.mds.yandex.net/get-kinopoisk-image/1629390/bf89f1c6-ee08-40ec-a8d8-5dead13790d9/orig	2	2023-04-25 21:44:17.681+03	2023-04-25 21:44:17.698+03
78	https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/7cff709c-f933-4761-b1ab-b861b25c47c7/orig	2	2023-04-25 21:44:17.71+03	2023-04-25 21:44:17.724+03
79	https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/644865c1-44ef-47b3-8e00-1e5c2ffaf104/orig	2	2023-04-25 21:44:17.728+03	2023-04-25 21:44:17.743+03
80	https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/cc8753d5-2cb7-4b6c-a376-804b45171402/orig	2	2023-04-25 21:44:17.747+03	2023-04-25 21:44:17.763+03
81	https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/5ccc71df-6840-47da-b24c-05b74dd2d94e/orig	2	2023-04-25 21:44:17.772+03	2023-04-25 21:44:17.779+03
82	https://avatars.mds.yandex.net/get-kinopoisk-image/1704946/1e0ad1bd-a510-48cc-afe8-bd1b05e74bab/orig	2	2023-04-25 21:44:17.787+03	2023-04-25 21:44:17.794+03
83	https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/550f2c0e-9d26-42c3-a7df-d5d5f2eedd85/orig	2	2023-04-25 21:44:17.798+03	2023-04-25 21:44:17.81+03
84	https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/e9b96afc-d2e3-4358-8a46-76ee8eec3a4a/orig	2	2023-04-25 21:44:17.82+03	2023-04-25 21:44:17.828+03
85	https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/9b095a6b-7c28-4324-8349-23a54b74a6fd/orig	2	2023-04-25 21:44:17.836+03	2023-04-25 21:44:17.845+03
86	https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/c5876e81-9dec-43e2-923f-fee2fca85e21/orig	3	2023-04-25 21:46:19.024+03	2023-04-25 21:46:19.04+03
87	https://avatars.mds.yandex.net/get-kinopoisk-image/1777765/27a05a29-40fc-47c9-bb40-377432af0150/orig	3	2023-04-25 21:46:19.053+03	2023-04-25 21:46:19.067+03
88	https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/1702b7c4-b998-4772-b6d5-85e1aa1bc050/orig	3	2023-04-25 21:46:19.075+03	2023-04-25 21:46:19.092+03
89	https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/6fa913e1-688b-4597-9e97-332316b67257/orig	3	2023-04-25 21:46:19.107+03	2023-04-25 21:46:19.125+03
90	https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/6af7e593-8114-4ea3-8f9e-f1c7ac8e8311/orig	3	2023-04-25 21:46:19.141+03	2023-04-25 21:46:19.274+03
91	https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/4286bf0c-adf5-4764-9b2b-a75b1d11a31e/orig	3	2023-04-25 21:46:19.306+03	2023-04-25 21:46:19.32+03
92	https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/fbc62a68-1584-42de-882f-249c1fda3662/orig	3	2023-04-25 21:46:19.326+03	2023-04-25 21:46:19.342+03
93	https://avatars.mds.yandex.net/get-kinopoisk-image/1777765/729ccc3f-db84-40be-bfd7-818151c5b6ae/orig	3	2023-04-25 21:46:19.355+03	2023-04-25 21:46:19.373+03
94	https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/f548c8f7-6f58-4d7f-8ef4-74d0b54d8499/orig	3	2023-04-25 21:46:19.384+03	2023-04-25 21:46:19.401+03
95	https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/3b8745de-ac05-4feb-a693-da1d7f9a6a1d/orig	3	2023-04-25 21:46:19.406+03	2023-04-25 21:46:19.422+03
96	https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/09330845-d990-4640-aadb-6a1219899a88/orig	3	2023-04-25 21:46:19.435+03	2023-04-25 21:46:19.443+03
97	https://avatars.mds.yandex.net/get-kinopoisk-image/1704946/20974051-a14d-420f-8ae5-dd15571951ca/orig	3	2023-04-25 21:46:19.454+03	2023-04-25 21:46:19.463+03
98	https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/bd7b6187-f54b-432b-99b5-ae433bc34fde/orig	3	2023-04-25 21:46:19.471+03	2023-04-25 21:46:19.477+03
99	https://avatars.mds.yandex.net/get-kinopoisk-image/1777765/252ddf95-f055-463f-af3c-e8d70b9dbbfc/orig	3	2023-04-25 21:46:19.487+03	2023-04-25 21:46:19.493+03
100	https://avatars.mds.yandex.net/get-kinopoisk-image/1704946/3cbeed87-c1f0-4cc8-8a91-b5da13fbb6ac/orig	3	2023-04-25 21:46:19.503+03	2023-04-25 21:46:19.509+03
101	https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/a7d8f122-507b-477a-afac-c4bcea95c3c8/orig	3	2023-04-25 21:46:19.518+03	2023-04-25 21:46:19.525+03
102	https://avatars.mds.yandex.net/get-kinopoisk-image/1704946/8d0ad667-5612-4231-b7d5-5a744c45ef6b/orig	3	2023-04-25 21:46:19.536+03	2023-04-25 21:46:19.543+03
103	https://avatars.mds.yandex.net/get-kinopoisk-image/1629390/50c61803-482d-4976-a41b-e0944ddc1eac/orig	3	2023-04-25 21:46:19.553+03	2023-04-25 21:46:19.56+03
104	https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/01231cc2-0895-4bb5-bbba-94c97edbd397/orig	3	2023-04-25 21:46:19.571+03	2023-04-25 21:46:19.576+03
105	https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/a3eb6a29-c32c-43c4-b5d1-959b83b4968a/orig	3	2023-04-25 21:46:19.587+03	2023-04-25 21:46:19.593+03
106	https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/945b49c6-d47d-4441-a59d-0c5dc367e6d9/orig	3	2023-04-25 21:46:19.604+03	2023-04-25 21:46:19.62+03
107	https://avatars.mds.yandex.net/get-kinopoisk-image/1777765/49f9b435-d0aa-478a-a7a9-7cb1e0149649/orig	3	2023-04-25 21:46:19.626+03	2023-04-25 21:46:19.653+03
108	https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/7420739b-893a-4d37-bbb3-c42f5148c8f2/orig	3	2023-04-25 21:46:19.669+03	2023-04-25 21:46:19.686+03
109	https://avatars.mds.yandex.net/get-kinopoisk-image/1777765/9a0de000-982e-41a1-943e-766d05c1eb8e/orig	3	2023-04-25 21:46:19.692+03	2023-04-25 21:46:19.709+03
110	https://avatars.mds.yandex.net/get-kinopoisk-image/1599028/55507eb7-b4d6-436c-b433-977328f684c4/orig	3	2023-04-25 21:46:19.72+03	2023-04-25 21:46:19.726+03
111	https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/73152702-8ce9-4302-b939-0bbe9416491a/orig	3	2023-04-25 21:46:19.738+03	2023-04-25 21:46:19.746+03
112	https://avatars.mds.yandex.net/get-kinopoisk-image/1777765/8d6c246c-76e1-4761-9eab-1a044fb53efe/orig	3	2023-04-25 21:46:19.755+03	2023-04-25 21:46:19.77+03
113	https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/6daaf940-6ea5-4069-8c9c-68b36c2714b9/orig	3	2023-04-25 21:46:19.775+03	2023-04-25 21:46:19.79+03
114	https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/5847a760-1ed0-4d26-8cc4-6a892784ec87/orig	3	2023-04-25 21:46:19.802+03	2023-04-25 21:46:19.811+03
115	https://avatars.mds.yandex.net/get-kinopoisk-image/1900788/d45e1fe5-4d7a-4c23-9a52-c7ba75f5bcaa/orig	3	2023-04-25 21:46:19.826+03	2023-04-25 21:46:19.841+03
116	https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/66cebfdb-fa74-46c7-91b3-00b9ef7e6efd/orig	3	2023-04-25 21:46:19.852+03	2023-04-25 21:46:19.86+03
117	https://avatars.mds.yandex.net/get-kinopoisk-image/1629390/e1267770-5b76-4892-b31b-f58515a607ab/orig	3	2023-04-25 21:46:19.87+03	2023-04-25 21:46:19.88+03
118	https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/8d4c1184-79f9-4c14-8e11-99191b568270/orig	3	2023-04-25 21:46:19.927+03	2023-04-25 21:46:19.95+03
119	https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/775aca3b-8d1c-4f74-a336-bbeb4742276e/orig	3	2023-04-25 21:46:19.955+03	2023-04-25 21:46:19.969+03
120	https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/5c758ac0-7a5c-4f00-a94f-1be680a312fb/orig	3	2023-04-25 21:46:19.974+03	2023-04-25 21:46:19.986+03
121	https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/9bfc9aee-3d1c-4647-af85-4c20c7134a43/orig	3	2023-04-25 21:46:19.99+03	2023-04-25 21:46:20.004+03
122	https://avatars.mds.yandex.net/get-kinopoisk-image/1777765/3dae7e1d-115d-45dd-88e2-9a4fde422c3d/orig	3	2023-04-25 21:46:20.008+03	2023-04-25 21:46:20.022+03
123	https://avatars.mds.yandex.net/get-kinopoisk-image/1704946/a926a62a-11c7-432b-88da-e8f1819bac44/orig	3	2023-04-25 21:46:20.026+03	2023-04-25 21:46:20.039+03
124	https://avatars.mds.yandex.net/get-kinopoisk-image/1777765/68d821c4-93ec-4ef4-9409-6c97013a16a5/orig	3	2023-04-25 21:46:20.043+03	2023-04-25 21:46:20.059+03
\.


--
-- Data for Name: movie_genres; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.movie_genres (id, "genreId", "movieId", "createdAt", "updatedAt") FROM stdin;
1	1	1	2023-04-25 21:42:50.973+03	2023-04-25 21:42:50.973+03
2	2	1	2023-04-25 21:42:51.011+03	2023-04-25 21:42:51.011+03
3	3	1	2023-04-25 21:42:51.153+03	2023-04-25 21:42:51.153+03
4	4	2	2023-04-25 21:44:12.796+03	2023-04-25 21:44:12.796+03
5	2	2	2023-04-25 21:44:12.822+03	2023-04-25 21:44:12.822+03
6	5	2	2023-04-25 21:44:12.847+03	2023-04-25 21:44:12.847+03
7	1	3	2023-04-25 21:45:52.239+03	2023-04-25 21:45:52.239+03
8	4	3	2023-04-25 21:45:52.259+03	2023-04-25 21:45:52.259+03
9	3	3	2023-04-25 21:45:52.277+03	2023-04-25 21:45:52.277+03
10	2	3	2023-04-25 21:45:52.293+03	2023-04-25 21:45:52.293+03
\.


--
-- Data for Name: movie_people; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.movie_people (id, "peopleId", "movieId") FROM stdin;
1	1	1
2	2	1
3	3	1
4	4	1
5	5	1
6	6	1
7	7	1
8	8	1
9	9	1
10	10	1
11	11	1
12	12	1
13	13	1
14	14	1
15	15	1
16	16	1
17	17	1
18	18	1
19	19	1
20	20	1
21	21	1
22	22	1
23	23	1
24	24	1
25	25	1
26	26	1
27	27	1
28	28	1
29	29	1
30	30	1
31	31	1
32	32	1
33	33	1
34	34	1
35	35	1
36	36	1
37	37	1
38	38	1
39	39	1
40	40	1
41	41	1
42	42	1
43	43	1
44	44	1
45	45	1
46	46	1
47	47	1
48	48	1
49	49	1
50	50	1
51	51	1
52	52	1
53	53	1
54	54	1
55	55	1
56	56	1
57	57	1
58	58	1
59	59	1
60	60	1
61	61	1
62	62	1
63	63	1
64	64	1
65	65	1
66	66	1
67	67	1
68	68	1
69	69	1
70	70	1
71	71	1
72	72	1
73	73	1
74	74	1
75	75	1
76	76	1
77	77	1
78	78	1
79	79	2
80	80	2
81	81	2
82	82	2
83	83	2
84	84	2
85	85	2
86	86	2
87	87	2
88	88	2
89	89	2
90	90	2
91	91	2
92	92	2
93	93	2
94	94	2
95	95	2
96	96	2
97	97	2
98	98	2
99	99	2
100	100	2
101	101	2
102	102	2
103	103	2
104	104	2
105	105	2
106	106	2
107	107	2
108	108	2
109	109	2
110	110	2
111	111	2
112	112	2
113	113	2
114	114	2
115	115	2
116	116	2
117	117	2
118	118	2
119	119	2
120	120	2
121	121	2
122	122	2
123	123	2
124	124	2
125	125	2
126	126	2
127	127	2
128	128	2
129	129	2
130	130	2
131	131	2
132	132	2
133	133	2
134	134	2
135	135	2
136	136	2
137	137	2
138	138	2
139	139	2
140	140	2
141	141	2
142	142	2
143	143	2
144	144	2
145	145	2
146	146	2
147	147	2
148	148	2
149	149	2
150	150	2
151	151	2
152	152	2
153	153	2
154	154	2
155	155	2
156	156	2
157	157	2
158	158	2
159	159	2
160	160	2
161	161	2
162	162	2
163	163	2
164	164	2
165	165	2
166	166	2
167	167	2
168	168	2
169	169	2
170	170	2
171	171	2
172	172	2
173	173	2
174	174	2
175	175	2
176	176	2
177	177	2
178	178	2
179	179	2
180	180	2
181	181	2
182	182	2
183	183	2
184	184	2
185	185	2
186	186	2
187	187	2
188	188	2
189	189	2
190	190	2
191	191	2
192	192	2
193	193	2
194	194	2
195	195	2
196	196	2
197	197	2
198	198	2
199	199	3
200	200	3
201	201	3
202	202	3
203	203	3
204	204	3
205	205	3
206	206	3
207	207	3
208	208	3
209	80	3
210	209	3
211	210	3
212	211	3
213	212	3
214	213	3
215	214	3
216	215	3
217	216	3
218	217	3
219	218	3
220	219	3
221	220	3
222	221	3
223	222	3
224	223	3
225	224	3
226	225	3
227	226	3
228	227	3
229	228	3
230	229	3
231	230	3
232	231	3
233	232	3
234	233	3
235	234	3
236	235	3
237	236	3
238	237	3
239	238	3
240	239	3
241	240	3
242	241	3
243	242	3
244	243	3
245	244	3
246	245	3
247	246	3
248	247	3
249	248	3
250	249	3
251	250	3
252	251	3
253	252	3
254	253	3
255	254	3
256	255	3
257	256	3
258	257	3
259	258	3
260	259	3
261	260	3
262	261	3
263	262	3
264	263	3
265	264	3
266	265	3
267	266	3
268	267	3
269	268	3
270	269	3
271	270	3
272	271	3
273	272	3
274	273	3
275	274	3
276	275	3
277	276	3
278	277	3
279	278	3
280	279	3
281	280	3
282	281	3
283	282	3
284	283	3
285	284	3
286	285	3
287	286	3
288	287	3
289	288	3
290	289	3
291	290	3
292	291	3
293	292	3
294	293	3
295	294	3
296	295	3
297	296	3
298	297	3
299	298	3
300	299	3
301	300	3
302	301	3
303	302	3
304	303	3
305	304	3
306	305	3
307	306	3
308	307	3
309	308	3
310	309	3
311	310	3
312	311	3
313	312	3
314	313	3
315	314	3
316	315	3
317	316	3
318	317	3
319	318	3
320	319	3
321	320	3
322	321	3
323	322	3
324	323	3
325	324	3
326	325	3
327	326	3
328	327	3
329	328	3
330	329	3
331	330	3
332	331	3
333	332	3
334	333	3
335	334	3
336	335	3
337	336	3
338	337	3
339	338	3
340	339	3
341	340	3
342	341	3
343	342	3
344	343	3
345	344	3
346	345	3
347	346	3
348	347	3
349	348	3
350	349	3
351	350	3
352	351	3
353	352	3
354	353	3
355	354	3
356	355	3
357	356	3
358	357	3
359	358	3
360	359	3
361	360	3
362	361	3
363	362	3
364	363	3
365	364	3
366	365	3
367	366	3
368	367	3
369	368	3
370	369	3
371	370	3
372	371	3
373	372	3
374	373	3
375	374	3
376	375	3
377	376	3
378	377	3
379	378	3
380	379	3
381	380	3
382	381	3
383	382	3
384	383	3
385	384	3
386	385	3
387	386	3
388	387	3
389	388	3
390	389	3
391	390	3
392	391	3
393	392	3
394	393	3
395	394	3
396	395	3
397	396	3
398	397	3
399	398	3
400	399	3
401	400	3
402	401	3
403	402	3
404	403	3
405	404	3
406	405	3
407	406	3
408	407	3
409	408	3
410	409	3
411	410	3
412	411	3
413	412	3
414	413	3
415	414	3
416	415	3
417	416	3
418	417	3
419	418	3
420	419	3
421	420	3
422	421	3
423	422	3
424	423	3
425	424	3
426	425	3
427	426	3
428	427	3
429	428	3
430	429	3
431	430	3
432	431	3
433	432	3
434	433	3
435	434	3
436	435	3
437	436	3
438	437	3
439	438	3
440	439	3
441	440	3
442	441	3
443	442	3
444	443	3
445	444	3
446	445	3
447	446	3
448	447	3
449	448	3
450	449	3
451	450	3
452	451	3
453	452	3
454	453	3
455	454	3
456	455	3
457	456	3
458	457	3
459	458	3
460	459	3
461	460	3
462	461	3
463	462	3
464	463	3
465	464	3
466	465	3
467	466	3
468	467	3
469	468	3
470	469	3
471	470	3
472	471	3
473	472	3
474	473	3
475	474	3
476	475	3
477	476	3
478	477	3
479	478	3
480	479	3
481	480	3
482	481	3
483	482	3
484	483	3
485	484	3
486	485	3
487	486	3
488	487	3
489	488	3
490	489	3
491	490	3
492	491	3
493	492	3
494	493	3
495	494	3
496	495	3
497	496	3
498	497	3
499	498	3
500	499	3
501	500	3
502	501	3
503	502	3
504	503	3
505	504	3
506	505	3
507	506	3
508	507	3
509	508	3
510	509	3
511	510	3
512	511	3
513	512	3
514	513	3
515	514	3
516	515	3
517	516	3
518	517	3
519	518	3
520	519	3
521	520	3
522	521	3
523	522	3
524	523	3
525	524	3
526	525	3
527	526	3
528	527	3
529	528	3
530	529	3
531	530	3
532	531	3
533	532	3
534	533	3
535	534	3
536	535	3
537	536	3
538	537	3
539	538	3
540	539	3
541	540	3
542	541	3
543	542	3
544	543	3
545	544	3
546	545	3
547	546	3
548	547	3
549	548	3
550	549	3
551	550	3
552	551	3
553	552	3
554	553	3
555	554	3
556	555	3
557	556	3
558	557	3
559	558	3
560	559	3
561	560	3
562	561	3
563	562	3
564	563	3
565	564	3
566	565	3
567	566	3
568	567	3
569	56	3
570	568	3
571	569	3
572	177	3
573	570	3
574	571	3
575	572	3
576	573	3
577	574	3
578	174	3
579	173	3
580	575	3
581	576	3
582	59	3
583	577	3
584	578	3
585	579	3
586	580	3
587	581	3
588	582	3
589	583	3
590	584	3
591	585	3
592	586	3
593	587	3
594	588	3
595	61	3
596	589	3
597	590	3
598	591	3
599	592	3
600	593	3
601	594	3
602	595	3
603	596	3
604	597	3
605	598	3
606	599	3
607	600	3
608	601	3
609	602	3
610	603	3
611	604	3
612	69	3
613	605	3
614	64	3
615	606	3
616	607	3
617	67	3
618	608	3
619	609	3
620	610	3
621	60	3
622	182	3
623	611	3
624	612	3
625	613	3
626	614	3
627	615	3
628	616	3
629	68	3
630	617	3
631	618	3
632	619	3
633	620	3
634	621	3
635	71	3
636	622	3
637	623	3
638	624	3
639	625	3
640	626	3
641	627	3
\.


--
-- Data for Name: movies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.movies (id, title, "originalTitle", "ageRate", description, "yearSince", "yearTill", country, "premierRussia", premier, seasons, rate, "rateQuantity", "createdAt", "updatedAt") FROM stdin;
1	1+1	Intouchables	16	Пострадав в результате несчастного случая, богатый аристократ Филипп нанимает в помощники человека, который менее всего подходит для этой работы, – молодого жителя предместья Дрисса, только что освободившегося из тюрьмы. Несмотря на то, что Филипп прикован к инвалидному креслу, Дриссу удается привнести в размеренную жизнь аристократа дух приключений.	2011	2011	Франция	26 апреля 2012	23 сентября 2011	\N	8.8	1569108	2023-04-25 21:42:50.868+03	2023-04-25 21:42:50.868+03
2	Джентльмены	The Gentlemen	18	Один ушлый американец ещё со студенческих лет приторговывал наркотиками, а теперь придумал схему нелегального обогащения с использованием поместий обедневшей английской аристократии и очень неплохо на этом разбогател. Другой пронырливый журналист приходит к Рэю, правой руке американца, и предлагает тому купить киносценарий, в котором подробно описаны преступления его босса при участии других представителей лондонского криминального мира — партнёра-еврея, китайской диаспоры, чернокожих спортсменов и даже русского олигарха.	2019	2019	Великобритания, США	13 февраля 2020	3 декабря 2019	\N	8.5	1364903	2023-04-25 21:44:12.754+03	2023-04-25 21:44:12.754+03
3	Волк с Уолл-стрит	The Wolf of Wall Street	18	1987 год. Джордан Белфорт становится брокером в успешном инвестиционном банке. Вскоре банк закрывается после внезапного обвала индекса Доу-Джонса. По совету жены Терезы Джордан устраивается в небольшое заведение, занимающееся мелкими акциями. Его настойчивый стиль общения с клиентами и врождённая харизма быстро даёт свои плоды. Он знакомится с соседом по дому Донни, торговцем, который сразу находит общий язык с Джорданом и решает открыть с ним собственную фирму. В качестве сотрудников они нанимают нескольких друзей Белфорта, его отца Макса и называют компанию «Стрэттон Оукмонт». В свободное от работы время Джордан прожигает жизнь: лавирует от одной вечеринки к другой, вступает в сексуальные отношения с проститутками, употребляет множество наркотических препаратов, в том числе кокаин и кваалюд. Однажды наступает момент, когда быстрым обогащением Белфорта начинает интересоваться агент ФБР...	2013	2013	США	6 февраля 2014	9 декабря 2013	\N	8	1092554	2023-04-25 21:45:52.208+03	2023-04-25 21:45:52.208+03
\.


--
-- Data for Name: people; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.people (id, "fullName", "fullNameOrig", profession, photo, "createdAt", "updatedAt") FROM stdin;
1	Оливье Накаш	Olivier Nakache	Режиссёр	https://www.kinopoisk.ru/name/382906/	2023-04-25 21:42:51.186+03	2023-04-25 21:42:51.186+03
2	Эрик Толедано	Éric Toledano	Режиссёр	https://www.kinopoisk.ru/name/426346/	2023-04-25 21:42:51.699+03	2023-04-25 21:42:51.699+03
3	Франсуа Клюзе	François Cluzet	Актёр	https://www.kinopoisk.ru/name/71427/	2023-04-25 21:42:51.751+03	2023-04-25 21:42:51.751+03
4	Омар Си	Omar Sy	Актёр	https://www.kinopoisk.ru/name/41644/	2023-04-25 21:42:51.894+03	2023-04-25 21:42:51.894+03
5	Анн Ле Ни	Anne Le Ny	Актёр	https://www.kinopoisk.ru/name/57174/	2023-04-25 21:42:51.928+03	2023-04-25 21:42:51.928+03
6	Одри Флеро	Audrey Fleurot	Актёр	https://www.kinopoisk.ru/name/868557/	2023-04-25 21:42:51.959+03	2023-04-25 21:42:51.959+03
7	Жозефин де Мо	Joséphine de Meaux	Актёр	https://www.kinopoisk.ru/name/541041/	2023-04-25 21:42:51.985+03	2023-04-25 21:42:51.985+03
8	Клотильд Молле	Clotilde Mollet	Актёр	https://www.kinopoisk.ru/name/445/	2023-04-25 21:42:52.02+03	2023-04-25 21:42:52.02+03
9	Альба Гайя Крагеде Беллуджи	Alba Gaïa Bellugi	Актёр	https://www.kinopoisk.ru/name/964574/	2023-04-25 21:42:52.049+03	2023-04-25 21:42:52.049+03
10	Сирил Менди	Cyril Mendy	Актёр	https://www.kinopoisk.ru/name/2237576/	2023-04-25 21:42:52.079+03	2023-04-25 21:42:52.079+03
11	Салимата Камате	Salimata Kamate	Актёр	https://www.kinopoisk.ru/name/3084679/	2023-04-25 21:42:52.1+03	2023-04-25 21:42:52.1+03
12	Абса Дьяту Тур	Absa Diatou Toure	Актёр	https://www.kinopoisk.ru/name/3084680/	2023-04-25 21:42:52.127+03	2023-04-25 21:42:52.127+03
13	Грегуар Эстерманн	Grégoire Oestermann	Актёр	https://www.kinopoisk.ru/name/83742/	2023-04-25 21:42:52.151+03	2023-04-25 21:42:52.151+03
14	Доминик Дагьер	Dominique Daguier	Актёр	https://www.kinopoisk.ru/name/233518/	2023-04-25 21:42:52.168+03	2023-04-25 21:42:52.168+03
15	Франсуа Карон	François Caron	Актёр	https://www.kinopoisk.ru/name/25264/	2023-04-25 21:42:52.19+03	2023-04-25 21:42:52.19+03
16	Кристиан Амери	Christian Ameri	Актёр	https://www.kinopoisk.ru/name/5570/	2023-04-25 21:42:52.286+03	2023-04-25 21:42:52.286+03
17	Тома Соливерес	Thomas Solivérès	Актёр	https://www.kinopoisk.ru/name/2497518/	2023-04-25 21:42:52.314+03	2023-04-25 21:42:52.314+03
18	Дороти Бриер	Dorothée Brière	Актёр	https://www.kinopoisk.ru/name/240040/	2023-04-25 21:42:52.344+03	2023-04-25 21:42:52.344+03
19	Мари-Лор Дикуру	Marie-Laure Descoureaux	Актёр	https://www.kinopoisk.ru/name/1960244/	2023-04-25 21:42:52.366+03	2023-04-25 21:42:52.366+03
20	Эмили Кан	Émilie Caen	Актёр	https://www.kinopoisk.ru/name/1283646/	2023-04-25 21:42:52.385+03	2023-04-25 21:42:52.385+03
21	Сильвен Лазард	Sylvain Lazard	Актёр	https://www.kinopoisk.ru/name/2216393/	2023-04-25 21:42:52.409+03	2023-04-25 21:42:52.409+03
22	Жан Франсуа Кэйри	Jean-François Cayrey	Актёр	https://www.kinopoisk.ru/name/2687585/	2023-04-25 21:42:52.431+03	2023-04-25 21:42:52.431+03
23	Йен Фенелон	Ian Fenelon	Актёр	https://www.kinopoisk.ru/name/2228474/	2023-04-25 21:42:52.459+03	2023-04-25 21:42:52.459+03
24	Рено Барсе	Renaud Barse	Актёр	https://www.kinopoisk.ru/name/2200014/	2023-04-25 21:42:52.499+03	2023-04-25 21:42:52.499+03
25	Франсуа Бюрелу	François Bureloup	Актёр	https://www.kinopoisk.ru/name/1617276/	2023-04-25 21:42:52.699+03	2023-04-25 21:42:52.699+03
26	Никки Марбо	Nicky Marbot	Актёр	https://www.kinopoisk.ru/name/58912/	2023-04-25 21:42:52.725+03	2023-04-25 21:42:52.725+03
27	Бенжамин Барош	Benjamin Baroche	Актёр	https://www.kinopoisk.ru/name/1277398/	2023-04-25 21:42:52.751+03	2023-04-25 21:42:52.751+03
28	Жером Паувельс	Jérôme Pauwels	Актёр	https://www.kinopoisk.ru/name/1171108/	2023-04-25 21:42:52.781+03	2023-04-25 21:42:52.781+03
29	Антуан Лоран	Antoine Laurent	Актёр	https://www.kinopoisk.ru/name/551535/	2023-04-25 21:42:52.802+03	2023-04-25 21:42:52.802+03
30	Фабрис Мантенья	Fabrice Mantegna	Актёр	https://www.kinopoisk.ru/name/2224913/	2023-04-25 21:42:52.821+03	2023-04-25 21:42:52.821+03
31	Хеди Бушенафа	Hedi Bouchenafa	Актёр	https://www.kinopoisk.ru/name/2687586/	2023-04-25 21:42:52.843+03	2023-04-25 21:42:52.843+03
32	Каролин Бург	Caroline Bourg	Актёр	https://www.kinopoisk.ru/name/792895/	2023-04-25 21:42:52.863+03	2023-04-25 21:42:52.863+03
33	Мишель Виноградов	Michel Winogradoff	Актёр	https://www.kinopoisk.ru/name/99326/	2023-04-25 21:42:52.886+03	2023-04-25 21:42:52.886+03
34	Кевин Вамо	Kévin Wamo	Актёр	https://www.kinopoisk.ru/name/2687587/	2023-04-25 21:42:52.917+03	2023-04-25 21:42:52.917+03
35	Эллиот Латиль	Elliot Latil	Актёр	https://www.kinopoisk.ru/name/2687588/	2023-04-25 21:42:52.963+03	2023-04-25 21:42:52.963+03
36	Ален Антони	Alain Anthony	Актёр	https://www.kinopoisk.ru/name/2687589/	2023-04-25 21:42:52.986+03	2023-04-25 21:42:52.986+03
37	Доминик Анри	Dominique Henry	Актёр	https://www.kinopoisk.ru/name/2687590/	2023-04-25 21:42:53.015+03	2023-04-25 21:42:53.015+03
38	Ле Капариксьо Франсе	Le Capriccio Français	Актёр	https://www.kinopoisk.ru/name/3084681/	2023-04-25 21:42:53.049+03	2023-04-25 21:42:53.049+03
39	Филипп Ле Февр	Philippe Le Fevre	Актёр	https://www.kinopoisk.ru/name/3084682/	2023-04-25 21:42:53.076+03	2023-04-25 21:42:53.076+03
40	Пьер-Лоран Барнерон	Pierre-Laurent Barneron	Актёр	https://www.kinopoisk.ru/name/2269034/	2023-04-25 21:42:53.103+03	2023-04-25 21:42:53.103+03
41	Хэ Юньпин	He Yunping	Актёр	https://www.kinopoisk.ru/name/4559766/	2023-04-25 21:42:53.15+03	2023-04-25 21:42:53.15+03
42	Филипп Поццо ди Борго	Philippe Pozzo di Borgo	Актёр	https://www.kinopoisk.ru/name/3152842/	2023-04-25 21:42:53.178+03	2023-04-25 21:42:53.178+03
43	Абдель Селлу	Abdel Sellou	Актёр	https://www.kinopoisk.ru/name/2789409/	2023-04-25 21:42:53.203+03	2023-04-25 21:42:53.203+03
44	Арно Бертран	Arnaud Bertrand	Продюсер	https://www.kinopoisk.ru/name/2402288/	2023-04-25 21:42:53.262+03	2023-04-25 21:42:53.262+03
45	Доминик Бутонна	Dominique Boutonnat	Продюсер	https://www.kinopoisk.ru/name/884847/	2023-04-25 21:42:53.301+03	2023-04-25 21:42:53.301+03
46	Юбер Кайлар	Hubert Caillard	Продюсер	https://www.kinopoisk.ru/name/2659794/	2023-04-25 21:42:53.328+03	2023-04-25 21:42:53.328+03
47	Николя Дюваль-Адассовски	Nicolas Duval Adassovsky	Продюсер	https://www.kinopoisk.ru/name/676553/	2023-04-25 21:42:53.351+03	2023-04-25 21:42:53.351+03
48	Robin Noel		Продюсер	https://www.kinopoisk.ru/name/6827355/	2023-04-25 21:42:53.384+03	2023-04-25 21:42:53.384+03
49	Лорен Сиво	Laurent Sivot	Продюсер	https://www.kinopoisk.ru/name/3152843/	2023-04-25 21:42:53.415+03	2023-04-25 21:42:53.415+03
50	Лоран Зэйтун	Laurent Zeitoun	Продюсер	https://www.kinopoisk.ru/name/608149/	2023-04-25 21:42:53.453+03	2023-04-25 21:42:53.453+03
51	Ян Зеноу	Yann Zenou	Продюсер	https://www.kinopoisk.ru/name/1178370/	2023-04-25 21:42:53.498+03	2023-04-25 21:42:53.498+03
52	Оливье Накаш	Olivier Nakache	Сценарист	https://www.kinopoisk.ru/name/382906/	2023-04-25 21:42:53.536+03	2023-04-25 21:42:53.536+03
53	Эрик Толедано	Éric Toledano	Сценарист	https://www.kinopoisk.ru/name/426346/	2023-04-25 21:42:53.567+03	2023-04-25 21:42:53.567+03
54	Филипп Поццо ди Борго	Philippe Pozzo di Borgo	Сценарист	https://www.kinopoisk.ru/name/3152842/	2023-04-25 21:42:53.613+03	2023-04-25 21:42:53.613+03
55	Матьё Вадпьед	Mathieu Vadepied	Оператор	https://www.kinopoisk.ru/name/634036/	2023-04-25 21:42:53.646+03	2023-04-25 21:42:53.646+03
56	Сергей Козин		Переводчик	https://www.kinopoisk.ru/name/2440395/	2023-04-25 21:42:53.683+03	2023-04-25 21:42:53.683+03
57	Владимир Зайцев		Актёр дубляжа	https://www.kinopoisk.ru/name/256836/	2023-04-25 21:42:53.748+03	2023-04-25 21:42:53.748+03
58	Илья Исаев		Актёр дубляжа	https://www.kinopoisk.ru/name/1179681/	2023-04-25 21:42:53.773+03	2023-04-25 21:42:53.773+03
59	Елена Соловьева		Актёр дубляжа	https://www.kinopoisk.ru/name/1654400/	2023-04-25 21:42:53.8+03	2023-04-25 21:42:53.8+03
60	Рамиля Искандер		Актёр дубляжа	https://www.kinopoisk.ru/name/1624192/	2023-04-25 21:42:53.852+03	2023-04-25 21:42:53.852+03
61	Антон Колесников		Актёр дубляжа	https://www.kinopoisk.ru/name/464040/	2023-04-25 21:42:53.885+03	2023-04-25 21:42:53.885+03
62	Лина Иванова		Актёр дубляжа	https://www.kinopoisk.ru/name/1643982/	2023-04-25 21:42:53.916+03	2023-04-25 21:42:53.916+03
63	Марина Бакина		Актёр дубляжа	https://www.kinopoisk.ru/name/1653673/	2023-04-25 21:42:53.952+03	2023-04-25 21:42:53.952+03
64	Андрей Градов		Актёр дубляжа	https://www.kinopoisk.ru/name/277027/	2023-04-25 21:42:53.979+03	2023-04-25 21:42:53.979+03
65	Лариса Некипелова		Актёр дубляжа	https://www.kinopoisk.ru/name/1649885/	2023-04-25 21:42:53.999+03	2023-04-25 21:42:53.999+03
66	Прохор Чеховской		Актёр дубляжа	https://www.kinopoisk.ru/name/1653657/	2023-04-25 21:42:54.019+03	2023-04-25 21:42:54.019+03
67	Наталья Терешкова		Актёр дубляжа	https://www.kinopoisk.ru/name/1758684/	2023-04-25 21:42:54.046+03	2023-04-25 21:42:54.046+03
68	Иван Жарков		Актёр дубляжа	https://www.kinopoisk.ru/name/1921569/	2023-04-25 21:42:54.068+03	2023-04-25 21:42:54.068+03
69	Юрий Меншагин		Актёр дубляжа	https://www.kinopoisk.ru/name/594457/	2023-04-25 21:42:54.091+03	2023-04-25 21:42:54.091+03
70	Данил Щебланов		Актёр дубляжа	https://www.kinopoisk.ru/name/1963412/	2023-04-25 21:42:54.145+03	2023-04-25 21:42:54.145+03
71	Ярослава Турылёва		Режиссёр дубляжа	https://www.kinopoisk.ru/name/1290076/	2023-04-25 21:42:54.167+03	2023-04-25 21:42:54.167+03
72	Александр Новиков		Режиссёр дубляжа	https://www.kinopoisk.ru/name/231213/	2023-04-25 21:42:54.186+03	2023-04-25 21:42:54.186+03
73	Людовико Эйнауди	Ludovico Einaudi	Композитор	https://www.kinopoisk.ru/name/590648/	2023-04-25 21:42:54.213+03	2023-04-25 21:42:54.213+03
74	Дориан Ригаль-Ансу	Dorian Rigal-Ansous	Монтажёр	https://www.kinopoisk.ru/name/1987674/	2023-04-25 21:42:54.245+03	2023-04-25 21:42:54.245+03
75	Франсуа Эммануэлли	François Emmanuelli	Художник	https://www.kinopoisk.ru/name/2006850/	2023-04-25 21:42:54.283+03	2023-04-25 21:42:54.283+03
76	Матьё Вадпьед	Mathieu Vadepied	Художник	https://www.kinopoisk.ru/name/634036/	2023-04-25 21:42:54.314+03	2023-04-25 21:42:54.314+03
77	Изабель Паннетье	Isabelle Pannetier	Художник	https://www.kinopoisk.ru/name/1998619/	2023-04-25 21:42:54.347+03	2023-04-25 21:42:54.347+03
78	Оливия Блох-Лене	Olivia Bloch-Lainé	Художник	https://www.kinopoisk.ru/name/2004628/	2023-04-25 21:42:54.369+03	2023-04-25 21:42:54.369+03
79	Гай Ричи	Guy Ritchie	Режиссёр	https://www.kinopoisk.ru/name/45159/	2023-04-25 21:44:12.89+03	2023-04-25 21:44:12.89+03
80	Мэттью МакКонахи	Matthew McConaughey	Актёр	https://www.kinopoisk.ru/name/797/	2023-04-25 21:44:12.915+03	2023-04-25 21:44:12.915+03
81	Чарли Ханнэм	Charlie Hunnam	Актёр	https://www.kinopoisk.ru/name/38702/	2023-04-25 21:44:12.944+03	2023-04-25 21:44:12.944+03
82	Генри Голдинг	Henry Golding	Актёр	https://www.kinopoisk.ru/name/4950097/	2023-04-25 21:44:12.975+03	2023-04-25 21:44:12.975+03
83	Хью Грант	Hugh Grant	Актёр	https://www.kinopoisk.ru/name/8090/	2023-04-25 21:44:13.007+03	2023-04-25 21:44:13.007+03
84	Мишель Докери	Michelle Dockery	Актёр	https://www.kinopoisk.ru/name/1067193/	2023-04-25 21:44:13.055+03	2023-04-25 21:44:13.055+03
85	Джереми Стронг	Jeremy Strong	Актёр	https://www.kinopoisk.ru/name/1146480/	2023-04-25 21:44:13.107+03	2023-04-25 21:44:13.107+03
86	Эдди Марсан	Eddie Marsan	Актёр	https://www.kinopoisk.ru/name/2444/	2023-04-25 21:44:13.13+03	2023-04-25 21:44:13.13+03
87	Джейсон Вонг	Jason Wong	Актёр	https://www.kinopoisk.ru/name/2454111/	2023-04-25 21:44:13.261+03	2023-04-25 21:44:13.261+03
88	Колин Фаррелл	Colin Farrell	Актёр	https://www.kinopoisk.ru/name/373/	2023-04-25 21:44:13.29+03	2023-04-25 21:44:13.29+03
89	Лин Рене	Lyne Renée	Актёр	https://www.kinopoisk.ru/name/1006787/	2023-04-25 21:44:13.326+03	2023-04-25 21:44:13.326+03
90	Том У	Tom Wu	Актёр	https://www.kinopoisk.ru/name/25964/	2023-04-25 21:44:13.365+03	2023-04-25 21:44:13.365+03
91	Чиди Аджуфо	Chidi Ajufo	Актёр	https://www.kinopoisk.ru/name/3002651/	2023-04-25 21:44:13.394+03	2023-04-25 21:44:13.394+03
92	Саймон Р. Баркер	Simon R. Barker	Актёр	https://www.kinopoisk.ru/name/5968202/	2023-04-25 21:44:13.425+03	2023-04-25 21:44:13.425+03
93	Джон Даглиш	John Dagleish	Актёр	https://www.kinopoisk.ru/name/1850607/	2023-04-25 21:44:13.456+03	2023-04-25 21:44:13.456+03
94	Джордан Лонг	Jordan Long	Актёр	https://www.kinopoisk.ru/name/4717127/	2023-04-25 21:44:13.479+03	2023-04-25 21:44:13.479+03
95	Лили Фрайзер	Lily Frazer	Актёр	https://www.kinopoisk.ru/name/3393000/	2023-04-25 21:44:13.509+03	2023-04-25 21:44:13.509+03
96	Гершвин Эсташ мл.	Gershwyn Eustache Jnr	Актёр	https://www.kinopoisk.ru/name/3300883/	2023-04-25 21:44:13.544+03	2023-04-25 21:44:13.544+03
97	Сэмюэл Уэст	Samuel West	Актёр	https://www.kinopoisk.ru/name/13177/	2023-04-25 21:44:13.631+03	2023-04-25 21:44:13.631+03
98	Джеральдин Сомервилль	Geraldine Somerville	Актёр	https://www.kinopoisk.ru/name/40828/	2023-04-25 21:44:13.679+03	2023-04-25 21:44:13.679+03
99	Элиот Самнер	Eliot Sumner	Актёр	https://www.kinopoisk.ru/name/4679/	2023-04-25 21:44:13.721+03	2023-04-25 21:44:13.721+03
100	Франц Драмех	Franz Drameh	Актёр	https://www.kinopoisk.ru/name/1308171/	2023-04-25 21:44:13.747+03	2023-04-25 21:44:13.747+03
101	Кристофер Эвангелу	Christopher Evangelou	Актёр	https://www.kinopoisk.ru/name/4653501/	2023-04-25 21:44:13.796+03	2023-04-25 21:44:13.796+03
102	Джим Уоррен	James Warren	Актёр	https://www.kinopoisk.ru/name/23879/	2023-04-25 21:44:13.848+03	2023-04-25 21:44:13.848+03
103	Шон Сагар	Sean Sagar	Актёр	https://www.kinopoisk.ru/name/2817170/	2023-04-25 21:44:13.888+03	2023-04-25 21:44:13.888+03
104	Багзи Мэлоун	Bugzy Malone	Актёр	https://www.kinopoisk.ru/name/5931690/	2023-04-25 21:44:13.927+03	2023-04-25 21:44:13.927+03
105	Том Рис Харрис	Tom Rhys Harries	Актёр	https://www.kinopoisk.ru/name/2317698/	2023-04-25 21:44:13.951+03	2023-04-25 21:44:13.951+03
106	Дэнни Гриффин	Danny Griffin	Актёр	https://www.kinopoisk.ru/name/5325577/	2023-04-25 21:44:13.982+03	2023-04-25 21:44:13.982+03
107	Макс Беннетт	Max Bennett	Актёр	https://www.kinopoisk.ru/name/1575352/	2023-04-25 21:44:14.146+03	2023-04-25 21:44:14.146+03
108	Евгения Кузьмина	Eugenia Kuzmina	Актёр	https://www.kinopoisk.ru/name/2497432/	2023-04-25 21:44:14.201+03	2023-04-25 21:44:14.201+03
109	Брюс Чон	Bruce Chong	Актёр	https://www.kinopoisk.ru/name/3034185/	2023-04-25 21:44:14.259+03	2023-04-25 21:44:14.259+03
110	Эшли Макгуайр	Ashley McGuire	Актёр	https://www.kinopoisk.ru/name/687946/	2023-04-25 21:44:14.286+03	2023-04-25 21:44:14.286+03
111	Джордж Эспри	George Asprey	Актёр	https://www.kinopoisk.ru/name/34921/	2023-04-25 21:44:14.307+03	2023-04-25 21:44:14.307+03
112	Shanu Hazzan		Актёр	https://www.kinopoisk.ru/name/5336873/	2023-04-25 21:44:14.325+03	2023-04-25 21:44:14.325+03
113	Джек Джонс	Jack Jones	Актёр	https://www.kinopoisk.ru/name/4787983/	2023-04-25 21:44:14.348+03	2023-04-25 21:44:14.348+03
114	Сэмми Уильямс	Sammy Williams	Актёр	https://www.kinopoisk.ru/name/2442849/	2023-04-25 21:44:14.372+03	2023-04-25 21:44:14.372+03
115	Ryan Dean		Актёр	https://www.kinopoisk.ru/name/4369903/	2023-04-25 21:44:14.396+03	2023-04-25 21:44:14.396+03
116	Гай Лист	Guy List	Актёр	https://www.kinopoisk.ru/name/588830/	2023-04-25 21:44:14.427+03	2023-04-25 21:44:14.427+03
117	Марвин Кэмпбелл	Marvin Campbell	Актёр	https://www.kinopoisk.ru/name/41834/	2023-04-25 21:44:14.465+03	2023-04-25 21:44:14.465+03
118	Will Mackay		Актёр	https://www.kinopoisk.ru/name/4079056/	2023-04-25 21:44:14.494+03	2023-04-25 21:44:14.494+03
119	Matt Sherren		Актёр	https://www.kinopoisk.ru/name/4458039/	2023-04-25 21:44:14.523+03	2023-04-25 21:44:14.523+03
120	Джейсон Хунджан	Jason Hunjan	Актёр	https://www.kinopoisk.ru/name/557505/	2023-04-25 21:44:14.544+03	2023-04-25 21:44:14.544+03
121	Морис Ли	Maurice Lee	Актёр	https://www.kinopoisk.ru/name/547521/	2023-04-25 21:44:14.562+03	2023-04-25 21:44:14.562+03
122	Расселл Балог	Russell Balogh	Актёр	https://www.kinopoisk.ru/name/2329000/	2023-04-25 21:44:14.581+03	2023-04-25 21:44:14.581+03
123	Того Игава	Togo Igawa	Актёр	https://www.kinopoisk.ru/name/20327/	2023-04-25 21:44:14.6+03	2023-04-25 21:44:14.6+03
124	Jack O'Connor		Актёр	https://www.kinopoisk.ru/name/5931691/	2023-04-25 21:44:14.623+03	2023-04-25 21:44:14.623+03
125	МакКелл Дэвид	McKell David	Актёр	https://www.kinopoisk.ru/name/2748057/	2023-04-25 21:44:14.644+03	2023-04-25 21:44:14.644+03
126	Isaiah Zev		Актёр	https://www.kinopoisk.ru/name/5931692/	2023-04-25 21:44:14.66+03	2023-04-25 21:44:14.66+03
127	Дэвид Гаррик	David Garrick	Актёр	https://www.kinopoisk.ru/name/41145/	2023-04-25 21:44:14.68+03	2023-04-25 21:44:14.68+03
128	Tom Lambert		Актёр	https://www.kinopoisk.ru/name/4329998/	2023-04-25 21:44:14.705+03	2023-04-25 21:44:14.705+03
129	Энди Чунг	Andy Cheung	Актёр	https://www.kinopoisk.ru/name/1902458/	2023-04-25 21:44:14.722+03	2023-04-25 21:44:14.722+03
130	Джои МакКой	Joey McCoy	Актёр	https://www.kinopoisk.ru/name/1090645/	2023-04-25 21:44:14.742+03	2023-04-25 21:44:14.742+03
131	Нед Кэмпбелл	Ned Campbell	Актёр	https://www.kinopoisk.ru/name/5810798/	2023-04-25 21:44:14.759+03	2023-04-25 21:44:14.759+03
132	Эндрю Гринаф	Andrew Greenough	Актёр	https://www.kinopoisk.ru/name/946601/	2023-04-25 21:44:14.781+03	2023-04-25 21:44:14.781+03
133	Timothy Siddall		Актёр	https://www.kinopoisk.ru/name/5931693/	2023-04-25 21:44:14.805+03	2023-04-25 21:44:14.805+03
134	Dominic Gibbs		Актёр	https://www.kinopoisk.ru/name/3601703/	2023-04-25 21:44:14.823+03	2023-04-25 21:44:14.823+03
135	Саймон Эдкинс	Simon Adkins	Актёр	https://www.kinopoisk.ru/name/3480314/	2023-04-25 21:44:14.847+03	2023-04-25 21:44:14.847+03
136	Хлоя Эрроусмит	Chloe Arrowsmith	Актёр	https://www.kinopoisk.ru/name/1835173/	2023-04-25 21:44:14.881+03	2023-04-25 21:44:14.881+03
137	Бриттани Эшворт	Brittany Ashworth	Актёр	https://www.kinopoisk.ru/name/905431/	2023-04-25 21:44:14.915+03	2023-04-25 21:44:14.915+03
138	Стив Барнетт мл.	Steve Barnett	Актёр	https://www.kinopoisk.ru/name/1464433/	2023-04-25 21:44:14.954+03	2023-04-25 21:44:14.954+03
139	Алекс Батаряну	Alex Batareanu	Актёр	https://www.kinopoisk.ru/name/5497185/	2023-04-25 21:44:15.014+03	2023-04-25 21:44:15.014+03
140	Эль Блэк	Elle Black	Актёр	https://www.kinopoisk.ru/name/3602713/	2023-04-25 21:44:15.079+03	2023-04-25 21:44:15.079+03
141	Майк Боднар	Mike Bodnar	Актёр	https://www.kinopoisk.ru/name/1238483/	2023-04-25 21:44:15.132+03	2023-04-25 21:44:15.132+03
142	Лука Де Масси	Luca De Massis	Актёр	https://www.kinopoisk.ru/name/6730963/	2023-04-25 21:44:15.176+03	2023-04-25 21:44:15.176+03
143	Troy Dixon		Актёр	https://www.kinopoisk.ru/name/6141924/	2023-04-25 21:44:15.212+03	2023-04-25 21:44:15.212+03
144	Амор Эванс	Amor Evans	Актёр	https://www.kinopoisk.ru/name/5642270/	2023-04-25 21:44:15.26+03	2023-04-25 21:44:15.26+03
145	Nicholle Hembra		Актёр	https://www.kinopoisk.ru/name/5409079/	2023-04-25 21:44:15.338+03	2023-04-25 21:44:15.338+03
146	Олег Хилл	Oleg Hill	Актёр	https://www.kinopoisk.ru/name/1853976/	2023-04-25 21:44:15.38+03	2023-04-25 21:44:15.38+03
147	Eugene Lin		Актёр	https://www.kinopoisk.ru/name/6944928/	2023-04-25 21:44:15.411+03	2023-04-25 21:44:15.411+03
148	Джейсон Лайнс	Jason Lines	Актёр	https://www.kinopoisk.ru/name/4661041/	2023-04-25 21:44:15.436+03	2023-04-25 21:44:15.436+03
149	Гай Ричи	Guy Ritchie	Актёр	https://www.kinopoisk.ru/name/45159/	2023-04-25 21:44:15.463+03	2023-04-25 21:44:15.463+03
150	Рубенс Сабойа	Rubens Saboia	Актёр	https://www.kinopoisk.ru/name/3552856/	2023-04-25 21:44:15.492+03	2023-04-25 21:44:15.492+03
151	Tom Sandell		Актёр	https://www.kinopoisk.ru/name/6359063/	2023-04-25 21:44:15.514+03	2023-04-25 21:44:15.514+03
152	Стив Сондерс	Steve Saunders	Актёр	https://www.kinopoisk.ru/name/3748122/	2023-04-25 21:44:15.544+03	2023-04-25 21:44:15.544+03
153	Alistair White		Актёр	https://www.kinopoisk.ru/name/6882736/	2023-04-25 21:44:15.579+03	2023-04-25 21:44:15.579+03
154	Джон Сюэ Чжан	Jon Xue Zhang	Актёр	https://www.kinopoisk.ru/name/4053452/	2023-04-25 21:44:15.629+03	2023-04-25 21:44:15.629+03
155	Мэттью Андерсон	Matthew Anderson	Продюсер	https://www.kinopoisk.ru/name/6032456/	2023-04-25 21:44:15.688+03	2023-04-25 21:44:15.688+03
156	Айван Эткинсон	Ivan Atkinson	Продюсер	https://www.kinopoisk.ru/name/4984694/	2023-04-25 21:44:15.714+03	2023-04-25 21:44:15.714+03
157	Билл Блок	Bill Block	Продюсер	https://www.kinopoisk.ru/name/51810/	2023-04-25 21:44:15.744+03	2023-04-25 21:44:15.744+03
158	Адам Фогельсон	Adam Fogelson	Продюсер	https://www.kinopoisk.ru/name/4360695/	2023-04-25 21:44:15.794+03	2023-04-25 21:44:15.794+03
159	Эндрю Голов	Andrew Golov	Продюсер	https://www.kinopoisk.ru/name/267517/	2023-04-25 21:44:15.844+03	2023-04-25 21:44:15.844+03
160	Макс Кин	Max Keene	Продюсер	https://www.kinopoisk.ru/name/63891/	2023-04-25 21:44:15.893+03	2023-04-25 21:44:15.893+03
161	Louise Killin		Продюсер	https://www.kinopoisk.ru/name/6984615/	2023-04-25 21:44:15.922+03	2023-04-25 21:44:15.922+03
162	Мэттью МакКонахи	Matthew McConaughey	Продюсер	https://www.kinopoisk.ru/name/797/	2023-04-25 21:44:15.944+03	2023-04-25 21:44:15.944+03
163	Боб Ошер	Bob Osher	Продюсер	https://www.kinopoisk.ru/name/25236/	2023-04-25 21:44:15.963+03	2023-04-25 21:44:15.963+03
164	Гай Ричи	Guy Ritchie	Продюсер	https://www.kinopoisk.ru/name/45159/	2023-04-25 21:44:15.982+03	2023-04-25 21:44:15.982+03
165	Роберт Симондз	Robert Simonds	Продюсер	https://www.kinopoisk.ru/name/715/	2023-04-25 21:44:16.013+03	2023-04-25 21:44:16.013+03
166	Алан Дж. Уондс	Alan J. Wands	Продюсер	https://www.kinopoisk.ru/name/25993/	2023-04-25 21:44:16.041+03	2023-04-25 21:44:16.041+03
167	Гай Ричи	Guy Ritchie	Сценарист	https://www.kinopoisk.ru/name/45159/	2023-04-25 21:44:16.065+03	2023-04-25 21:44:16.065+03
168	Айван Эткинсон	Ivan Atkinson	Сценарист	https://www.kinopoisk.ru/name/4984694/	2023-04-25 21:44:16.093+03	2023-04-25 21:44:16.093+03
169	Марн Дэвис	Marn Davies	Сценарист	https://www.kinopoisk.ru/name/1910756/	2023-04-25 21:44:16.115+03	2023-04-25 21:44:16.115+03
170	Лорен Бонд	Lauren Bond	Сценарист	https://www.kinopoisk.ru/name/1266524/	2023-04-25 21:44:16.156+03	2023-04-25 21:44:16.156+03
171	Алан Стюарт	Alan Stewart	Оператор	https://www.kinopoisk.ru/name/643927/	2023-04-25 21:44:16.187+03	2023-04-25 21:44:16.187+03
172	Александр Вартанов		Переводчик	https://www.kinopoisk.ru/name/739980/	2023-04-25 21:44:16.213+03	2023-04-25 21:44:16.213+03
173	Василий Дахненко		Актёр дубляжа	https://www.kinopoisk.ru/name/1078858/	2023-04-25 21:44:16.243+03	2023-04-25 21:44:16.243+03
174	Сергей Смирнов		Актёр дубляжа	https://www.kinopoisk.ru/name/2340955/	2023-04-25 21:44:16.263+03	2023-04-25 21:44:16.263+03
175	Филипп Бледный		Актёр дубляжа	https://www.kinopoisk.ru/name/1646082/	2023-04-25 21:44:16.289+03	2023-04-25 21:44:16.289+03
176	Алексей Иващенко		Актёр дубляжа	https://www.kinopoisk.ru/name/304577/	2023-04-25 21:44:16.31+03	2023-04-25 21:44:16.31+03
177	Татьяна Шитова		Актёр дубляжа	https://www.kinopoisk.ru/name/1641154/	2023-04-25 21:44:16.331+03	2023-04-25 21:44:16.331+03
178	Александр Вартанов		Актёр дубляжа	https://www.kinopoisk.ru/name/739980/	2023-04-25 21:44:16.358+03	2023-04-25 21:44:16.358+03
179	Алексей Багдасаров		Актёр дубляжа	https://www.kinopoisk.ru/name/1714171/	2023-04-25 21:44:16.377+03	2023-04-25 21:44:16.377+03
180	Илья Барабанов		Актёр дубляжа	https://www.kinopoisk.ru/name/1634102/	2023-04-25 21:44:16.396+03	2023-04-25 21:44:16.396+03
181	Наталья Сапецкая		Актёр дубляжа	https://www.kinopoisk.ru/name/1896171/	2023-04-25 21:44:16.426+03	2023-04-25 21:44:16.426+03
182	Андрей Казанцев		Актёр дубляжа	https://www.kinopoisk.ru/name/1649884/	2023-04-25 21:44:16.456+03	2023-04-25 21:44:16.456+03
183	Денис Некрасов		Актёр дубляжа	https://www.kinopoisk.ru/name/1948766/	2023-04-25 21:44:16.49+03	2023-04-25 21:44:16.49+03
184	Сергей Шайдаков		Актёр дубляжа	https://www.kinopoisk.ru/name/2441191/	2023-04-25 21:44:16.511+03	2023-04-25 21:44:16.511+03
185	Артур Бесчастный		Актёр дубляжа	https://www.kinopoisk.ru/name/2363725/	2023-04-25 21:44:16.538+03	2023-04-25 21:44:16.538+03
186	Григорий Калинин		Актёр дубляжа	https://www.kinopoisk.ru/name/1324756/	2023-04-25 21:44:16.561+03	2023-04-25 21:44:16.561+03
187	Алексей Маслодудов		Актёр дубляжа	https://www.kinopoisk.ru/name/1925461/	2023-04-25 21:44:16.588+03	2023-04-25 21:44:16.588+03
188	Александр Вартанов		Режиссёр дубляжа	https://www.kinopoisk.ru/name/739980/	2023-04-25 21:44:16.61+03	2023-04-25 21:44:16.61+03
189	Кристофер Бенстед	Christopher Benstead	Композитор	https://www.kinopoisk.ru/name/3604626/	2023-04-25 21:44:16.645+03	2023-04-25 21:44:16.645+03
190	Джеймс Херберт	James Herbert	Монтажёр	https://www.kinopoisk.ru/name/1987046/	2023-04-25 21:44:16.665+03	2023-04-25 21:44:16.665+03
191	Пол Мачлисс	Paul Machliss	Монтажёр	https://www.kinopoisk.ru/name/1986047/	2023-04-25 21:44:16.694+03	2023-04-25 21:44:16.694+03
192	Джемма Джексон	Gemma Jackson	Художник	https://www.kinopoisk.ru/name/1996197/	2023-04-25 21:44:16.719+03	2023-04-25 21:44:16.719+03
193	Рэйчел Олтон	Rachel Aulton	Художник	https://www.kinopoisk.ru/name/5204254/	2023-04-25 21:44:16.741+03	2023-04-25 21:44:16.741+03
194	Оливер Кэрролл	Oliver Carroll	Художник	https://www.kinopoisk.ru/name/3960382/	2023-04-25 21:44:16.762+03	2023-04-25 21:44:16.762+03
195	Фиона Гэвин	Fiona Gavin	Художник	https://www.kinopoisk.ru/name/1997136/	2023-04-25 21:44:16.793+03	2023-04-25 21:44:16.793+03
196	Майкл Уилкинсон	Michael Wilkinson	Художник	https://www.kinopoisk.ru/name/1986750/	2023-04-25 21:44:16.824+03	2023-04-25 21:44:16.824+03
197	Нил Флойд	Neil Floyd	Художник	https://www.kinopoisk.ru/name/2174208/	2023-04-25 21:44:16.859+03	2023-04-25 21:44:16.859+03
198	Сара Уиттл	Sarah Whittle	Художник	https://www.kinopoisk.ru/name/1996199/	2023-04-25 21:44:16.892+03	2023-04-25 21:44:16.892+03
199	Мартин Скорсезе	Martin Scorsese	Режиссёр	https://www.kinopoisk.ru/name/10988/	2023-04-25 21:45:52.307+03	2023-04-25 21:45:52.307+03
200	Леонардо ДиКаприо	Leonardo DiCaprio	Актёр	https://www.kinopoisk.ru/name/37859/	2023-04-25 21:45:52.342+03	2023-04-25 21:45:52.342+03
201	Джона Хилл	Jonah Hill	Актёр	https://www.kinopoisk.ru/name/581340/	2023-04-25 21:45:52.369+03	2023-04-25 21:45:52.369+03
202	Марго Робби	Margot Robbie	Актёр	https://www.kinopoisk.ru/name/1682023/	2023-04-25 21:45:52.391+03	2023-04-25 21:45:52.391+03
203	Кайл Чандлер	Kyle Chandler	Актёр	https://www.kinopoisk.ru/name/28949/	2023-04-25 21:45:52.419+03	2023-04-25 21:45:52.419+03
204	Роб Райнер	Rob Reiner	Актёр	https://www.kinopoisk.ru/name/5899/	2023-04-25 21:45:52.487+03	2023-04-25 21:45:52.487+03
205	П.Дж. Бирн	P.J. Byrne	Актёр	https://www.kinopoisk.ru/name/32376/	2023-04-25 21:45:52.635+03	2023-04-25 21:45:52.635+03
206	Джон Бернтал	Jon Bernthal	Актёр	https://www.kinopoisk.ru/name/551260/	2023-04-25 21:45:52.676+03	2023-04-25 21:45:52.676+03
207	Кристин Милиоти	Cristin Milioti	Актёр	https://www.kinopoisk.ru/name/1098850/	2023-04-25 21:45:52.708+03	2023-04-25 21:45:52.708+03
208	Жан Дюжарден	Jean Dujardin	Актёр	https://www.kinopoisk.ru/name/383195/	2023-04-25 21:45:52.726+03	2023-04-25 21:45:52.726+03
209	Кеннет Чои	Kenneth Choi	Актёр	https://www.kinopoisk.ru/name/14936/	2023-04-25 21:45:52.792+03	2023-04-25 21:45:52.792+03
210	Джон Фавро	Jon Favreau	Актёр	https://www.kinopoisk.ru/name/9559/	2023-04-25 21:45:52.818+03	2023-04-25 21:45:52.818+03
211	Джоанна Ламли	Joanna Lumley	Актёр	https://www.kinopoisk.ru/name/15524/	2023-04-25 21:45:52.837+03	2023-04-25 21:45:52.837+03
212	Кристин Эберсоул	Christine Ebersole	Актёр	https://www.kinopoisk.ru/name/22962/	2023-04-25 21:45:52.856+03	2023-04-25 21:45:52.856+03
213	Шей Уигэм	Shea Whigham	Актёр	https://www.kinopoisk.ru/name/34780/	2023-04-25 21:45:52.873+03	2023-04-25 21:45:52.873+03
214	Катарина Час	Katarina Cas	Актёр	https://www.kinopoisk.ru/name/778797/	2023-04-25 21:45:52.892+03	2023-04-25 21:45:52.892+03
215	Брайан Сакка	Brian Sacca	Актёр	https://www.kinopoisk.ru/name/1444771/	2023-04-25 21:45:52.911+03	2023-04-25 21:45:52.911+03
216	Генри Жебровский	Henry Zebrowski	Актёр	https://www.kinopoisk.ru/name/1896513/	2023-04-25 21:45:52.952+03	2023-04-25 21:45:52.952+03
217	Итан Сапли	Ethan Suplee	Актёр	https://www.kinopoisk.ru/name/9702/	2023-04-25 21:45:53.017+03	2023-04-25 21:45:53.017+03
218	Бэрри Ротбарт	Barry Rothbart	Актёр	https://www.kinopoisk.ru/name/1242167/	2023-04-25 21:45:53.061+03	2023-04-25 21:45:53.061+03
219	Джейк Хоффман	Jake Hoffman	Актёр	https://www.kinopoisk.ru/name/27388/	2023-04-25 21:45:53.122+03	2023-04-25 21:45:53.122+03
220	Маккензи Миэн	MacKenzie Meehan	Актёр	https://www.kinopoisk.ru/name/2413467/	2023-04-25 21:45:53.155+03	2023-04-25 21:45:53.155+03
221	Бо Дитл	Bo Dietl	Актёр	https://www.kinopoisk.ru/name/25415/	2023-04-25 21:45:53.176+03	2023-04-25 21:45:53.176+03
222	Джон Спиногатти	Jon Spinogatti	Актёр	https://www.kinopoisk.ru/name/582759/	2023-04-25 21:45:53.211+03	2023-04-25 21:45:53.211+03
223	Ая Кэш	Aya Cash	Актёр	https://www.kinopoisk.ru/name/1174528/	2023-04-25 21:45:53.243+03	2023-04-25 21:45:53.243+03
224	Ризван Манжи	Rizwan Manji	Актёр	https://www.kinopoisk.ru/name/40348/	2023-04-25 21:45:53.272+03	2023-04-25 21:45:53.272+03
225	Стефани Курцуба	Stephanie Kurtzuba	Актёр	https://www.kinopoisk.ru/name/61195/	2023-04-25 21:45:53.294+03	2023-04-25 21:45:53.294+03
226	Дж.С. МакКензи	J.C. MacKenzie	Актёр	https://www.kinopoisk.ru/name/4094/	2023-04-25 21:45:53.37+03	2023-04-25 21:45:53.37+03
227	Эшли Эткинсон	Ashlie Atkinson	Актёр	https://www.kinopoisk.ru/name/732978/	2023-04-25 21:45:53.409+03	2023-04-25 21:45:53.409+03
228	Томас Миддлдитч	Thomas Middleditch	Актёр	https://www.kinopoisk.ru/name/1615667/	2023-04-25 21:45:53.448+03	2023-04-25 21:45:53.448+03
229	Стефан Канкен	Stephen Kunken	Актёр	https://www.kinopoisk.ru/name/11086/	2023-04-25 21:45:53.502+03	2023-04-25 21:45:53.502+03
230	Эдвард Херрманн	Edward Herrmann	Актёр	https://www.kinopoisk.ru/name/8075/	2023-04-25 21:45:53.527+03	2023-04-25 21:45:53.527+03
231	Джордан Белфорт	Jordan Belfort	Актёр	https://www.kinopoisk.ru/name/88348/	2023-04-25 21:45:53.561+03	2023-04-25 21:45:53.561+03
232	Тед Гриффин	Ted Griffin	Актёр	https://www.kinopoisk.ru/name/23434/	2023-04-25 21:45:53.606+03	2023-04-25 21:45:53.606+03
233	Фран Лебовиц	Fran Lebowitz	Актёр	https://www.kinopoisk.ru/name/131234/	2023-04-25 21:45:53.639+03	2023-04-25 21:45:53.639+03
234	Роберт Клохесси	Robert Clohessy	Актёр	https://www.kinopoisk.ru/name/1959656/	2023-04-25 21:45:53.674+03	2023-04-25 21:45:53.674+03
235	Наташа Ньюман Томас	Natasha Newman-Thomas	Актёр	https://www.kinopoisk.ru/name/3019947/	2023-04-25 21:45:53.709+03	2023-04-25 21:45:53.709+03
236	Сандра Нельсон	Sandra Nelson	Актёр	https://www.kinopoisk.ru/name/37373/	2023-04-25 21:45:53.771+03	2023-04-25 21:45:53.771+03
237	Джонни Мэй	Johnnie Mae	Актёр	https://www.kinopoisk.ru/name/741585/	2023-04-25 21:45:53.808+03	2023-04-25 21:45:53.808+03
238	Кристина Джэффс	Christina Jeffs	Актёр	https://www.kinopoisk.ru/name/2378564/	2023-04-25 21:45:53.907+03	2023-04-25 21:45:53.907+03
239	Сабина Масчи	Sabina Maschi	Актёр	https://www.kinopoisk.ru/name/1184031/	2023-04-25 21:45:53.945+03	2023-04-25 21:45:53.945+03
240	Зана Маркелсон	Zana Markelson	Актёр	https://www.kinopoisk.ru/name/2708113/	2023-04-25 21:45:54.017+03	2023-04-25 21:45:54.017+03
241	Уэлкер Уайт	Welker White	Актёр	https://www.kinopoisk.ru/name/67677/	2023-04-25 21:45:54.075+03	2023-04-25 21:45:54.075+03
242	Дэн Флаэрти	Dan Flaherty	Актёр	https://www.kinopoisk.ru/name/1580933/	2023-04-25 21:45:54.134+03	2023-04-25 21:45:54.134+03
243	Карла Корво	Carla Corvo	Актёр	https://www.kinopoisk.ru/name/2278445/	2023-04-25 21:45:54.159+03	2023-04-25 21:45:54.159+03
244	Дастин Кернс	Dustin Kerns	Актёр	https://www.kinopoisk.ru/name/1652648/	2023-04-25 21:45:54.191+03	2023-04-25 21:45:54.191+03
245	Эшли Бланкеншип	Ashley Blankenship	Актёр	https://www.kinopoisk.ru/name/2926238/	2023-04-25 21:45:54.223+03	2023-04-25 21:45:54.223+03
246	Мэдисон Маккинли	Madison McKinley	Актёр	https://www.kinopoisk.ru/name/1520786/	2023-04-25 21:45:54.27+03	2023-04-25 21:45:54.27+03
247	Дирдре Реймолд	Dierdre Reimold	Актёр	https://www.kinopoisk.ru/name/2947995/	2023-04-25 21:45:54.325+03	2023-04-25 21:45:54.325+03
248	Керри Маллой	Kerry Malloy	Актёр	https://www.kinopoisk.ru/name/2809223/	2023-04-25 21:45:54.391+03	2023-04-25 21:45:54.391+03
249	Фрэнк ван Путтен	Frank van Putten	Актёр	https://www.kinopoisk.ru/name/2672405/	2023-04-25 21:45:54.411+03	2023-04-25 21:45:54.411+03
250	Аарон Лазар	Aaron Lazar	Актёр	https://www.kinopoisk.ru/name/557826/	2023-04-25 21:45:54.443+03	2023-04-25 21:45:54.443+03
251	Стив Рутман	Steve Routman	Актёр	https://www.kinopoisk.ru/name/80576/	2023-04-25 21:45:54.473+03	2023-04-25 21:45:54.473+03
252	Стив Уиттинг	Steve Witting	Актёр	https://www.kinopoisk.ru/name/37873/	2023-04-25 21:45:54.507+03	2023-04-25 21:45:54.507+03
253	Чарльз Морган	Charles Morgan	Актёр	https://www.kinopoisk.ru/name/1604850/	2023-04-25 21:45:54.528+03	2023-04-25 21:45:54.528+03
254	Майкл Натансон	Michael Nathanson	Актёр	https://www.kinopoisk.ru/name/246012/	2023-04-25 21:45:54.555+03	2023-04-25 21:45:54.555+03
255	Натали Бенсел	Natalie Bensel	Актёр	https://www.kinopoisk.ru/name/3055523/	2023-04-25 21:45:54.576+03	2023-04-25 21:45:54.576+03
256	Tess Olivia		Актёр	https://www.kinopoisk.ru/name/6569718/	2023-04-25 21:45:54.605+03	2023-04-25 21:45:54.605+03
257	Жаклин Кис	Jaclyn Keys	Актёр	https://www.kinopoisk.ru/name/3089944/	2023-04-25 21:45:54.627+03	2023-04-25 21:45:54.627+03
258	Криста Эшворт	Krista Ashworth	Актёр	https://www.kinopoisk.ru/name/3485212/	2023-04-25 21:45:54.657+03	2023-04-25 21:45:54.657+03
259	Кэтлин Феллегара	Kathleen Fellegara	Актёр	https://www.kinopoisk.ru/name/50937/	2023-04-25 21:45:54.685+03	2023-04-25 21:45:54.685+03
260	John Bernard Martin		Актёр	https://www.kinopoisk.ru/name/5920984/	2023-04-25 21:45:54.707+03	2023-04-25 21:45:54.707+03
261	Жамель Дэниелс	Jamel Daniels	Актёр	https://www.kinopoisk.ru/name/2279865/	2023-04-25 21:45:54.727+03	2023-04-25 21:45:54.727+03
262	Дэн Биттнер	Dan Bittner	Актёр	https://www.kinopoisk.ru/name/1084088/	2023-04-25 21:45:54.754+03	2023-04-25 21:45:54.754+03
263	Джон Белманн	John Behlmann	Актёр	https://www.kinopoisk.ru/name/1462559/	2023-04-25 21:45:54.777+03	2023-04-25 21:45:54.777+03
264	Уорд Хортон	Ward Horton	Актёр	https://www.kinopoisk.ru/name/653249/	2023-04-25 21:45:54.84+03	2023-04-25 21:45:54.84+03
265	Брэт Шуфорд	Bret Shuford	Актёр	https://www.kinopoisk.ru/name/1919843/	2023-04-25 21:45:54.891+03	2023-04-25 21:45:54.891+03
266	Пол Монте мл.	Paul Monte Jr.	Актёр	https://www.kinopoisk.ru/name/2240849/	2023-04-25 21:45:54.926+03	2023-04-25 21:45:54.926+03
267	Эллен Секстон	Ellen Sexton	Актёр	https://www.kinopoisk.ru/name/2284642/	2023-04-25 21:45:54.959+03	2023-04-25 21:45:54.959+03
268	Брайан Твиди	Brian Tweedy	Актёр	https://www.kinopoisk.ru/name/3019952/	2023-04-25 21:45:55.008+03	2023-04-25 21:45:55.008+03
269	Дж. Т. О’Коннор	J.T. O'Connor	Актёр	https://www.kinopoisk.ru/name/1407866/	2023-04-25 21:45:55.036+03	2023-04-25 21:45:55.036+03
270	Стивен Бойер	Steven Boyer	Актёр	https://www.kinopoisk.ru/name/1221090/	2023-04-25 21:45:55.057+03	2023-04-25 21:45:55.057+03
271	Дэнни А. Абекейзер	Danny A. Abeckaser	Актёр	https://www.kinopoisk.ru/name/611226/	2023-04-25 21:45:55.077+03	2023-04-25 21:45:55.077+03
272	Трэйси Фридман	Tracy Friedman	Актёр	https://www.kinopoisk.ru/name/1728017/	2023-04-25 21:45:55.103+03	2023-04-25 21:45:55.103+03
273	Мэттью Раух	Matthew Rauch	Актёр	https://www.kinopoisk.ru/name/226041/	2023-04-25 21:45:55.125+03	2023-04-25 21:45:55.125+03
274	Майкл Искиердо	Michael Izquierdo	Актёр	https://www.kinopoisk.ru/name/1543996/	2023-04-25 21:45:55.154+03	2023-04-25 21:45:55.154+03
275	Донни Кешаварц	Donnie Keshawarz	Актёр	https://www.kinopoisk.ru/name/246472/	2023-04-25 21:45:55.174+03	2023-04-25 21:45:55.174+03
276	Джонатан Чайковский	Johnathan Tchaikovsky	Актёр	https://www.kinopoisk.ru/name/1090169/	2023-04-25 21:45:55.194+03	2023-04-25 21:45:55.194+03
277	Аарон Глейсер	Aaron Glaser	Актёр	https://www.kinopoisk.ru/name/1859246/	2023-04-25 21:45:55.234+03	2023-04-25 21:45:55.234+03
278	Бен Рамика	Ben Rameaka	Актёр	https://www.kinopoisk.ru/name/2750440/	2023-04-25 21:45:55.273+03	2023-04-25 21:45:55.273+03
279	Бен Ловинг	Ben Loving	Актёр	https://www.kinopoisk.ru/name/3019949/	2023-04-25 21:45:55.292+03	2023-04-25 21:45:55.292+03
280	Брайан Чарльз Джонсон	Brian Charles Johnson	Актёр	https://www.kinopoisk.ru/name/2940336/	2023-04-25 21:45:55.32+03	2023-04-25 21:45:55.32+03
281	Себастьян Тиллинджер	Sebastian Tillinger	Актёр	https://www.kinopoisk.ru/name/41044/	2023-04-25 21:45:55.351+03	2023-04-25 21:45:55.351+03
282	Крис Ригги	Chris Riggi	Актёр	https://www.kinopoisk.ru/name/1608311/	2023-04-25 21:45:55.393+03	2023-04-25 21:45:55.393+03
283	Дэн Хантер	Dan Hunter	Актёр	https://www.kinopoisk.ru/name/1470786/	2023-04-25 21:45:55.436+03	2023-04-25 21:45:55.436+03
284	Меган Рафферти	Meghan Rafferty	Актёр	https://www.kinopoisk.ru/name/563790/	2023-04-25 21:45:55.488+03	2023-04-25 21:45:55.488+03
285	Хосе Рамон Росарио	José Ramón Rosario	Актёр	https://www.kinopoisk.ru/name/6939/	2023-04-25 21:45:55.54+03	2023-04-25 21:45:55.54+03
286	Даврам Стифлер	Davram Stiefler	Актёр	https://www.kinopoisk.ru/name/1517092/	2023-04-25 21:45:55.576+03	2023-04-25 21:45:55.576+03
287	Дэн Дэйли	Dan Daily	Актёр	https://www.kinopoisk.ru/name/31170/	2023-04-25 21:45:55.626+03	2023-04-25 21:45:55.626+03
288	Бен Ван Берген	Ben Van Bergen	Актёр	https://www.kinopoisk.ru/name/24501/	2023-04-25 21:45:55.689+03	2023-04-25 21:45:55.689+03
289	Мэтт Осиан	Matte Osian	Актёр	https://www.kinopoisk.ru/name/74300/	2023-04-25 21:45:55.751+03	2023-04-25 21:45:55.751+03
290	Майкл Дивайн	Michael Devine	Актёр	https://www.kinopoisk.ru/name/482647/	2023-04-25 21:45:55.81+03	2023-04-25 21:45:55.81+03
291	Джейсон Фурлани	Jason Furlani	Актёр	https://www.kinopoisk.ru/name/591716/	2023-04-25 21:45:55.859+03	2023-04-25 21:45:55.859+03
292	Скотт Николсон	Scott Nicholson	Актёр	https://www.kinopoisk.ru/name/1557836/	2023-04-25 21:45:55.901+03	2023-04-25 21:45:55.901+03
293	Джереми Бобб	Jeremy Bobb	Актёр	https://www.kinopoisk.ru/name/1221205/	2023-04-25 21:45:55.942+03	2023-04-25 21:45:55.942+03
294	Дин Ауэр	Dean Auer	Актёр	https://www.kinopoisk.ru/name/539240/	2023-04-25 21:45:55.991+03	2023-04-25 21:45:55.991+03
295	Том Грир	Tom Greer	Актёр	https://www.kinopoisk.ru/name/1453656/	2023-04-25 21:45:56.025+03	2023-04-25 21:45:56.025+03
296	Шэрон Джонс	Sharon Jones	Актёр	https://www.kinopoisk.ru/name/614613/	2023-04-25 21:45:56.054+03	2023-04-25 21:45:56.054+03
297	Старр Дункан	Starr Duncan-Lowe	Актёр	https://www.kinopoisk.ru/name/3485213/	2023-04-25 21:45:56.084+03	2023-04-25 21:45:56.084+03
298	Сандра Уильямс	Saundra Williams	Актёр	https://www.kinopoisk.ru/name/1527354/	2023-04-25 21:45:56.109+03	2023-04-25 21:45:56.109+03
299	Эмили Треймейн	Emily Tremaine Fernandez	Актёр	https://www.kinopoisk.ru/name/1266939/	2023-04-25 21:45:56.142+03	2023-04-25 21:45:56.142+03
300	Зинеб Оукач	Zineb Oukach	Актёр	https://www.kinopoisk.ru/name/1478273/	2023-04-25 21:45:56.173+03	2023-04-25 21:45:56.173+03
301	Loretta O. Booz		Актёр	https://www.kinopoisk.ru/name/4242058/	2023-04-25 21:45:56.206+03	2023-04-25 21:45:56.206+03
302	Ши Коулмэн	Shea Coleman	Актёр	https://www.kinopoisk.ru/name/3055524/	2023-04-25 21:45:56.237+03	2023-04-25 21:45:56.237+03
303	Жизелль Эйзенберг	Giselle Eisenberg	Актёр	https://www.kinopoisk.ru/name/2982213/	2023-04-25 21:45:56.269+03	2023-04-25 21:45:56.269+03
304	Дима Аиткен	Deema Aitken	Актёр	https://www.kinopoisk.ru/name/1454354/	2023-04-25 21:45:56.291+03	2023-04-25 21:45:56.291+03
305	Эшли Спрингер	Ashley Springer	Актёр	https://www.kinopoisk.ru/name/742012/	2023-04-25 21:45:56.323+03	2023-04-25 21:45:56.323+03
306	Джастин Энтони Лонг	Justin Anthony Long	Актёр	https://www.kinopoisk.ru/name/3019946/	2023-04-25 21:45:56.358+03	2023-04-25 21:45:56.358+03
307	Грегори Перри	Gregory Perri	Актёр	https://www.kinopoisk.ru/name/2431321/	2023-04-25 21:45:56.387+03	2023-04-25 21:45:56.387+03
308	Вики Бойл	Viki Boyle	Актёр	https://www.kinopoisk.ru/name/2982212/	2023-04-25 21:45:56.409+03	2023-04-25 21:45:56.409+03
309	Крис Калдовино	Chris Caldovino	Актёр	https://www.kinopoisk.ru/name/83245/	2023-04-25 21:45:56.501+03	2023-04-25 21:45:56.501+03
310	Маркос Антонио Гонсалес	Marcos A. Gonzalez	Актёр	https://www.kinopoisk.ru/name/2733950/	2023-04-25 21:45:56.57+03	2023-04-25 21:45:56.57+03
311	Chris Matesevac		Актёр	https://www.kinopoisk.ru/name/3227385/	2023-04-25 21:45:56.6+03	2023-04-25 21:45:56.6+03
312	Джастин Иллэйнс	Justin Yllanes	Актёр	https://www.kinopoisk.ru/name/3181606/	2023-04-25 21:45:56.626+03	2023-04-25 21:45:56.626+03
313	Реми Беннетт	Rémy Bennett	Актёр	https://www.kinopoisk.ru/name/1647150/	2023-04-25 21:45:56.659+03	2023-04-25 21:45:56.659+03
314	Кэти Куртин	Cathy Curtin	Актёр	https://www.kinopoisk.ru/name/2289/	2023-04-25 21:45:56.69+03	2023-04-25 21:45:56.69+03
315	Пол Урсиоли	Paul Urcioli	Актёр	https://www.kinopoisk.ru/name/1151791/	2023-04-25 21:45:56.724+03	2023-04-25 21:45:56.724+03
316	Джэми О’Коннелл	Jamie O'Connell	Актёр	https://www.kinopoisk.ru/name/3485215/	2023-04-25 21:45:56.758+03	2023-04-25 21:45:56.758+03
317	Майкл О’Хара	Michael O'Hara	Актёр	https://www.kinopoisk.ru/name/1224040/	2023-04-25 21:45:56.791+03	2023-04-25 21:45:56.791+03
318	Лоуренс Лау	Lawrence Lau	Актёр	https://www.kinopoisk.ru/name/3485216/	2023-04-25 21:45:56.836+03	2023-04-25 21:45:56.836+03
319	Майкл Брайан Френч	Michael Bryan French	Актёр	https://www.kinopoisk.ru/name/41273/	2023-04-25 21:45:56.874+03	2023-04-25 21:45:56.874+03
320	Адриа Баратта	Adria Baratta	Актёр	https://www.kinopoisk.ru/name/2218530/	2023-04-25 21:45:56.92+03	2023-04-25 21:45:56.92+03
321	Армен Гаро	Armen Garo	Актёр	https://www.kinopoisk.ru/name/108328/	2023-04-25 21:45:56.967+03	2023-04-25 21:45:56.967+03
322	Гарри Пасторе	Garry Pastore	Актёр	https://www.kinopoisk.ru/name/2516/	2023-04-25 21:45:57.01+03	2023-04-25 21:45:57.01+03
323	Луис Ванариа	Louis Vanaria	Актёр	https://www.kinopoisk.ru/name/33785/	2023-04-25 21:45:57.06+03	2023-04-25 21:45:57.06+03
324	Лоуренс Смит	Lawrence Smith	Актёр	https://www.kinopoisk.ru/name/3055419/	2023-04-25 21:45:57.09+03	2023-04-25 21:45:57.09+03
325	Харди Уинбёрн	Hardy Winburn	Актёр	https://www.kinopoisk.ru/name/2241268/	2023-04-25 21:45:57.122+03	2023-04-25 21:45:57.122+03
326	Аллисон Карр	Allyson Carr	Актёр	https://www.kinopoisk.ru/name/3485218/	2023-04-25 21:45:57.153+03	2023-04-25 21:45:57.153+03
327	Питер Янгблад Хиллз	Peter Youngblood Hills	Актёр	https://www.kinopoisk.ru/name/34755/	2023-04-25 21:45:57.185+03	2023-04-25 21:45:57.185+03
328	Дэниэл Хепнер	Daniel Hepner	Актёр	https://www.kinopoisk.ru/name/589423/	2023-04-25 21:45:57.223+03	2023-04-25 21:45:57.223+03
329	Брендан Гриффин	Brendan Griffin	Актёр	https://www.kinopoisk.ru/name/1188682/	2023-04-25 21:45:57.271+03	2023-04-25 21:45:57.271+03
330	Дерек Милман	Derek Milman	Актёр	https://www.kinopoisk.ru/name/1235834/	2023-04-25 21:45:57.305+03	2023-04-25 21:45:57.305+03
331	Виктор Верхак	Victor Verhaeghe	Актёр	https://www.kinopoisk.ru/name/991923/	2023-04-25 21:45:57.336+03	2023-04-25 21:45:57.336+03
332	Джаред Хаусмен	Jared Houseman	Актёр	https://www.kinopoisk.ru/name/1671250/	2023-04-25 21:45:57.36+03	2023-04-25 21:45:57.36+03
333	Bekah Mulberg		Актёр	https://www.kinopoisk.ru/name/3454062/	2023-04-25 21:45:57.389+03	2023-04-25 21:45:57.389+03
334	Шон Аллен	Shaun Allen	Актёр	https://www.kinopoisk.ru/name/3026161/	2023-04-25 21:45:57.411+03	2023-04-25 21:45:57.411+03
335	Логан Альтен	Logan Alten	Актёр	https://www.kinopoisk.ru/name/3076654/	2023-04-25 21:45:57.444+03	2023-04-25 21:45:57.444+03
336	Дэвид Антуан	David Antoine	Актёр	https://www.kinopoisk.ru/name/3061795/	2023-04-25 21:45:57.476+03	2023-04-25 21:45:57.476+03
337	Ариэла Арнон	Ariela Arnon	Актёр	https://www.kinopoisk.ru/name/3027552/	2023-04-25 21:45:57.507+03	2023-04-25 21:45:57.507+03
338	Джордан Асиновфски	Jordan Asinofsky	Актёр	https://www.kinopoisk.ru/name/2967498/	2023-04-25 21:45:57.539+03	2023-04-25 21:45:57.539+03
339	Вик Багратуни	Vic Bagratuni	Актёр	https://www.kinopoisk.ru/name/3076661/	2023-04-25 21:45:57.569+03	2023-04-25 21:45:57.569+03
340	Филеена Барис	Fileena Bahris	Актёр	https://www.kinopoisk.ru/name/1531362/	2023-04-25 21:45:57.592+03	2023-04-25 21:45:57.592+03
341	Эри Бэркэн	Ari Barkan	Актёр	https://www.kinopoisk.ru/name/2697653/	2023-04-25 21:45:57.624+03	2023-04-25 21:45:57.624+03
342	Джанни Биазетти мл.	Gianni Biasetti Jr.	Актёр	https://www.kinopoisk.ru/name/3432631/	2023-04-25 21:45:57.659+03	2023-04-25 21:45:57.659+03
343	Basilica Bierl		Актёр	https://www.kinopoisk.ru/name/2977070/	2023-04-25 21:45:57.706+03	2023-04-25 21:45:57.706+03
344	Лиза Бинкли	Liza Binkley	Актёр	https://www.kinopoisk.ru/name/1723542/	2023-04-25 21:45:57.742+03	2023-04-25 21:45:57.742+03
345	Благо Саймон	Blago	Актёр	https://www.kinopoisk.ru/name/2685550/	2023-04-25 21:45:57.784+03	2023-04-25 21:45:57.784+03
346	Питер Блох	Peter Bloch	Актёр	https://www.kinopoisk.ru/name/532427/	2023-04-25 21:45:57.823+03	2023-04-25 21:45:57.823+03
347	Рик Боландер	Rick Bolander	Актёр	https://www.kinopoisk.ru/name/1172726/	2023-04-25 21:45:57.887+03	2023-04-25 21:45:57.887+03
348	Will Boyajian		Актёр	https://www.kinopoisk.ru/name/2986042/	2023-04-25 21:45:57.925+03	2023-04-25 21:45:57.925+03
349	Джулиан Брэнд	Julian Brand	Актёр	https://www.kinopoisk.ru/name/2108412/	2023-04-25 21:45:57.959+03	2023-04-25 21:45:57.959+03
350	Роджер Бреннер	Roger Brenner	Актёр	https://www.kinopoisk.ru/name/1888684/	2023-04-25 21:45:58.009+03	2023-04-25 21:45:58.009+03
351	Френсис Брук	Francis Brooke	Актёр	https://www.kinopoisk.ru/name/3416959/	2023-04-25 21:45:58.045+03	2023-04-25 21:45:58.045+03
352	Джером Брукс мл.	Jerome Brooks Jr.	Актёр	https://www.kinopoisk.ru/name/2357702/	2023-04-25 21:45:58.088+03	2023-04-25 21:45:58.088+03
353	Грегори М. Браун	Gregory M. Brown	Актёр	https://www.kinopoisk.ru/name/2531697/	2023-04-25 21:45:58.124+03	2023-04-25 21:45:58.124+03
354	Такер Брайан	Tucker Bryan	Актёр	https://www.kinopoisk.ru/name/2303579/	2023-04-25 21:45:58.163+03	2023-04-25 21:45:58.163+03
355	Жан Бёрнс	Jean Burns	Актёр	https://www.kinopoisk.ru/name/3600646/	2023-04-25 21:45:58.223+03	2023-04-25 21:45:58.223+03
356	Брайан Бертон	Bryan Burton	Актёр	https://www.kinopoisk.ru/name/2913062/	2023-04-25 21:45:58.338+03	2023-04-25 21:45:58.338+03
357	Стив Бушеми	Steve Buscemi	Актёр	https://www.kinopoisk.ru/name/9271/	2023-04-25 21:45:58.392+03	2023-04-25 21:45:58.392+03
358	Венди Каллард-Бооз	Wendy Callard-Booz	Актёр	https://www.kinopoisk.ru/name/3383868/	2023-04-25 21:45:58.452+03	2023-04-25 21:45:58.452+03
359	Элисон Кэмбридж	Alyson Cambridge	Актёр	https://www.kinopoisk.ru/name/1881130/	2023-04-25 21:45:58.523+03	2023-04-25 21:45:58.523+03
360	Ryan Canney		Актёр	https://www.kinopoisk.ru/name/4185024/	2023-04-25 21:45:58.624+03	2023-04-25 21:45:58.624+03
361	Кеннет Каррела	Kenneth Carrella	Актёр	https://www.kinopoisk.ru/name/3435183/	2023-04-25 21:45:58.675+03	2023-04-25 21:45:58.675+03
362	Justine Denea Cassady		Актёр	https://www.kinopoisk.ru/name/4477332/	2023-04-25 21:45:58.726+03	2023-04-25 21:45:58.726+03
363	Оскар Дж. Кастилло	Oscar J. Castillo	Актёр	https://www.kinopoisk.ru/name/1508089/	2023-04-25 21:45:58.776+03	2023-04-25 21:45:58.776+03
364	Майк Катапано	Mike Catapano	Актёр	https://www.kinopoisk.ru/name/577982/	2023-04-25 21:45:58.942+03	2023-04-25 21:45:58.942+03
365	Стив Кавано	Steve Cavanaugh	Актёр	https://www.kinopoisk.ru/name/2844076/	2023-04-25 21:45:58.992+03	2023-04-25 21:45:58.992+03
366	Эллисон Келли	Alegra Chetti	Актёр	https://www.kinopoisk.ru/name/440230/	2023-04-25 21:45:59.055+03	2023-04-25 21:45:59.055+03
367	Jose Claudio		Актёр	https://www.kinopoisk.ru/name/3079079/	2023-04-25 21:45:59.107+03	2023-04-25 21:45:59.107+03
368	Дэвид Клифт	David Clift	Актёр	https://www.kinopoisk.ru/name/3076652/	2023-04-25 21:45:59.143+03	2023-04-25 21:45:59.143+03
369	Коуди Колье	Cody Collier	Актёр	https://www.kinopoisk.ru/name/3542813/	2023-04-25 21:45:59.183+03	2023-04-25 21:45:59.183+03
370	Стив Комисар	Steve Comisar	Актёр	https://www.kinopoisk.ru/name/100112/	2023-04-25 21:45:59.226+03	2023-04-25 21:45:59.226+03
371	Тайлер Кук	Tyler Cook	Актёр	https://www.kinopoisk.ru/name/2822841/	2023-04-25 21:45:59.272+03	2023-04-25 21:45:59.272+03
372	Кортни Купер	Courtney Cooper	Актёр	https://www.kinopoisk.ru/name/2761362/	2023-04-25 21:45:59.34+03	2023-04-25 21:45:59.34+03
373	Ричард Р. Корапи	Richard R. Corapi	Актёр	https://www.kinopoisk.ru/name/2947891/	2023-04-25 21:45:59.387+03	2023-04-25 21:45:59.387+03
374	Марио Корри	Mario Corry	Актёр	https://www.kinopoisk.ru/name/1459262/	2023-04-25 21:45:59.425+03	2023-04-25 21:45:59.425+03
375	Кристофер Джеймс Каллен	Christopher James Cullen	Актёр	https://www.kinopoisk.ru/name/1113043/	2023-04-25 21:45:59.511+03	2023-04-25 21:45:59.511+03
376	Райан Кертис	Ryan Curtis	Актёр	https://www.kinopoisk.ru/name/1470531/	2023-04-25 21:45:59.644+03	2023-04-25 21:45:59.644+03
377	Кристина Дэниелс	Christina Daniels	Актёр	https://www.kinopoisk.ru/name/3320665/	2023-04-25 21:45:59.708+03	2023-04-25 21:45:59.708+03
378	Натали Дэниелс	Natalie Daniels	Актёр	https://www.kinopoisk.ru/name/4232964/	2023-04-25 21:45:59.757+03	2023-04-25 21:45:59.757+03
379	Джейсон Даунно	Jason Daunno	Актёр	https://www.kinopoisk.ru/name/2737201/	2023-04-25 21:45:59.794+03	2023-04-25 21:45:59.794+03
380	Джордж Даванцо	George Davanzo	Актёр	https://www.kinopoisk.ru/name/3442956/	2023-04-25 21:45:59.873+03	2023-04-25 21:45:59.873+03
381	Френсин Давета	Francine Daveta	Актёр	https://www.kinopoisk.ru/name/1081637/	2023-04-25 21:45:59.919+03	2023-04-25 21:45:59.919+03
382	Келси Диан	Kelsey Deanne	Актёр	https://www.kinopoisk.ru/name/2793975/	2023-04-25 21:45:59.955+03	2023-04-25 21:45:59.955+03
383	Рэй ДеФорест	Ray DeForest	Актёр	https://www.kinopoisk.ru/name/2098789/	2023-04-25 21:45:59.997+03	2023-04-25 21:45:59.997+03
384	Julian DeVincenzo		Актёр	https://www.kinopoisk.ru/name/2946577/	2023-04-25 21:46:00.152+03	2023-04-25 21:46:00.152+03
385	Мария Ди Анджелис	Maria Di Angelis	Актёр	https://www.kinopoisk.ru/name/1179451/	2023-04-25 21:46:00.327+03	2023-04-25 21:46:00.327+03
386	Жаклин Дитль	Jaclyn Dietl	Актёр	https://www.kinopoisk.ru/name/585457/	2023-04-25 21:46:00.458+03	2023-04-25 21:46:00.458+03
387	Джозеф Димартино	Joseph Dimartino	Актёр	https://www.kinopoisk.ru/name/2633032/	2023-04-25 21:46:00.642+03	2023-04-25 21:46:00.642+03
388	Susan DiStaulo		Актёр	https://www.kinopoisk.ru/name/3231937/	2023-04-25 21:46:00.705+03	2023-04-25 21:46:00.705+03
389	Филип Дордиевки	Filip Dordievski	Актёр	https://www.kinopoisk.ru/name/3818753/	2023-04-25 21:46:00.77+03	2023-04-25 21:46:00.77+03
390	Michael Dubuc		Актёр	https://www.kinopoisk.ru/name/3340172/	2023-04-25 21:46:00.84+03	2023-04-25 21:46:00.84+03
391	Aaron Dworetzky		Актёр	https://www.kinopoisk.ru/name/4185475/	2023-04-25 21:46:00.923+03	2023-04-25 21:46:00.923+03
392	Майкл Энгберг	Michael Engberg	Актёр	https://www.kinopoisk.ru/name/3277374/	2023-04-25 21:46:00.975+03	2023-04-25 21:46:00.975+03
393	Блейк Дж. Эванс	Blake J. Evans	Актёр	https://www.kinopoisk.ru/name/2801496/	2023-04-25 21:46:01.024+03	2023-04-25 21:46:01.024+03
394	Трент Фалько	Trent Falco	Актёр	https://www.kinopoisk.ru/name/4626093/	2023-04-25 21:46:01.074+03	2023-04-25 21:46:01.074+03
395	Марк Фальво	Mark Falvo	Актёр	https://www.kinopoisk.ru/name/3223192/	2023-04-25 21:46:01.118+03	2023-04-25 21:46:01.118+03
396	Джо Фарина	Joe Farina	Актёр	https://www.kinopoisk.ru/name/2808995/	2023-04-25 21:46:01.156+03	2023-04-25 21:46:01.156+03
397	Остин Фаруелл	Austin Farwell	Актёр	https://www.kinopoisk.ru/name/241844/	2023-04-25 21:46:01.206+03	2023-04-25 21:46:01.206+03
398	Nicholas Ferrara		Актёр	https://www.kinopoisk.ru/name/3758023/	2023-04-25 21:46:01.27+03	2023-04-25 21:46:01.27+03
399	Нина Флек	Corinna Jeanine Fleck	Актёр	https://www.kinopoisk.ru/name/1585786/	2023-04-25 21:46:01.305+03	2023-04-25 21:46:01.305+03
400	Брайан Колин Фоли	Brian Colin Foley	Актёр	https://www.kinopoisk.ru/name/2870646/	2023-04-25 21:46:01.339+03	2023-04-25 21:46:01.339+03
401	Феликс Дж. Майклуайт	Jesse Michael Fullington	Актёр	https://www.kinopoisk.ru/name/4429023/	2023-04-25 21:46:01.376+03	2023-04-25 21:46:01.376+03
402	Стив Гарфанти	Steve Garfanti	Актёр	https://www.kinopoisk.ru/name/2870938/	2023-04-25 21:46:01.418+03	2023-04-25 21:46:01.418+03
403	Райан Генуальди	Ryan Genualdi	Актёр	https://www.kinopoisk.ru/name/1778887/	2023-04-25 21:46:01.453+03	2023-04-25 21:46:01.453+03
404	Робин Джордж	Robin George	Актёр	https://www.kinopoisk.ru/name/4474018/	2023-04-25 21:46:01.488+03	2023-04-25 21:46:01.488+03
405	Мэттью Гули	Matthew Gooley	Актёр	https://www.kinopoisk.ru/name/1505532/	2023-04-25 21:46:01.528+03	2023-04-25 21:46:01.528+03
406	Дрю Грегори	Drew Gregory	Актёр	https://www.kinopoisk.ru/name/4309424/	2023-04-25 21:46:01.584+03	2023-04-25 21:46:01.584+03
407	Джули Гудзь	Julie Gudz	Актёр	https://www.kinopoisk.ru/name/3026987/	2023-04-25 21:46:01.637+03	2023-04-25 21:46:01.637+03
408	Лондон Холл	London Hall	Актёр	https://www.kinopoisk.ru/name/3336310/	2023-04-25 21:46:01.699+03	2023-04-25 21:46:01.699+03
409	Джон Хартли	Jon Hartley	Актёр	https://www.kinopoisk.ru/name/4221764/	2023-04-25 21:46:01.752+03	2023-04-25 21:46:01.752+03
410	Лиэнн Хейуорд	Leanne Hayward	Актёр	https://www.kinopoisk.ru/name/2578276/	2023-04-25 21:46:01.819+03	2023-04-25 21:46:01.819+03
411	Клинт Хэдли	Clint Headley	Актёр	https://www.kinopoisk.ru/name/1942176/	2023-04-25 21:46:01.856+03	2023-04-25 21:46:01.856+03
412	Мэттью Херингтон	Matthew Herington	Актёр	https://www.kinopoisk.ru/name/1175636/	2023-04-25 21:46:01.892+03	2023-04-25 21:46:01.892+03
413	Билл Хоббс	Bill Hobbs	Актёр	https://www.kinopoisk.ru/name/3076653/	2023-04-25 21:46:01.933+03	2023-04-25 21:46:01.933+03
414	Alex Hodgins		Актёр	https://www.kinopoisk.ru/name/3917500/	2023-04-25 21:46:01.969+03	2023-04-25 21:46:01.969+03
415	Колин Холмс	Colin Holmes	Актёр	https://www.kinopoisk.ru/name/2376972/	2023-04-25 21:46:02.007+03	2023-04-25 21:46:02.007+03
416	Жаклин Хонулик	Jacqueline Honulik	Актёр	https://www.kinopoisk.ru/name/4302439/	2023-04-25 21:46:02.042+03	2023-04-25 21:46:02.042+03
417	Розмари Ховард	Rosemary Howard	Актёр	https://www.kinopoisk.ru/name/1419232/	2023-04-25 21:46:02.079+03	2023-04-25 21:46:02.079+03
418	Джеймс М. Хаффман	James Huffman	Актёр	https://www.kinopoisk.ru/name/1492895/	2023-04-25 21:46:02.121+03	2023-04-25 21:46:02.121+03
419	Marisa Hunter		Актёр	https://www.kinopoisk.ru/name/4907828/	2023-04-25 21:46:02.157+03	2023-04-25 21:46:02.157+03
420	Дэвид Ичкавиц	David Itchkawitz	Актёр	https://www.kinopoisk.ru/name/3066325/	2023-04-25 21:46:02.193+03	2023-04-25 21:46:02.193+03
421	Kimberly L. Jackson		Актёр	https://www.kinopoisk.ru/name/4174013/	2023-04-25 21:46:02.234+03	2023-04-25 21:46:02.234+03
422	Кеннет Яковиц	Ken Jacowitz	Актёр	https://www.kinopoisk.ru/name/2733972/	2023-04-25 21:46:02.277+03	2023-04-25 21:46:02.277+03
423	Майкл Джефферсон	Michael Jefferson	Актёр	https://www.kinopoisk.ru/name/2260154/	2023-04-25 21:46:02.337+03	2023-04-25 21:46:02.337+03
424	Дэррил Жермен	Darryle Jermaine	Актёр	https://www.kinopoisk.ru/name/2885202/	2023-04-25 21:46:02.391+03	2023-04-25 21:46:02.391+03
425	Мэттью Уильям Джонс	Matthew William Jones	Актёр	https://www.kinopoisk.ru/name/3359011/	2023-04-25 21:46:02.46+03	2023-04-25 21:46:02.46+03
426	Спайк Джонс	Spike Jonze	Актёр	https://www.kinopoisk.ru/name/21039/	2023-04-25 21:46:02.521+03	2023-04-25 21:46:02.521+03
427	Drew Jordan		Актёр	https://www.kinopoisk.ru/name/2911984/	2023-04-25 21:46:02.568+03	2023-04-25 21:46:02.568+03
428	Сильвия Каль	Silvia Kal	Актёр	https://www.kinopoisk.ru/name/3188597/	2023-04-25 21:46:02.617+03	2023-04-25 21:46:02.617+03
429	Кристи Кэйн	Christie Kane	Актёр	https://www.kinopoisk.ru/name/2239433/	2023-04-25 21:46:02.653+03	2023-04-25 21:46:02.653+03
430	Адам Кастер	Adam Kaster	Актёр	https://www.kinopoisk.ru/name/3423732/	2023-04-25 21:46:02.689+03	2023-04-25 21:46:02.689+03
431	Брайан Килти	Brian Kealty	Актёр	https://www.kinopoisk.ru/name/3342566/	2023-04-25 21:46:02.722+03	2023-04-25 21:46:02.722+03
432	Саманта Келли	Samantha Kelly	Актёр	https://www.kinopoisk.ru/name/1682982/	2023-04-25 21:46:02.755+03	2023-04-25 21:46:02.755+03
433	Крис Керсон	Chris Kerson	Актёр	https://www.kinopoisk.ru/name/866882/	2023-04-25 21:46:02.787+03	2023-04-25 21:46:02.787+03
434	Стасс Классен	Stass Klassen	Актёр	https://www.kinopoisk.ru/name/1350212/	2023-04-25 21:46:02.818+03	2023-04-25 21:46:02.818+03
435	Наташа Коич	Nataša Kojić	Актёр	https://www.kinopoisk.ru/name/3728692/	2023-04-25 21:46:02.858+03	2023-04-25 21:46:02.858+03
436	Кеннет Кополович	Kenneth Kopolovicz	Актёр	https://www.kinopoisk.ru/name/2977295/	2023-04-25 21:46:02.893+03	2023-04-25 21:46:02.893+03
437	Алекс Корик	Alex Korik	Актёр	https://www.kinopoisk.ru/name/2876104/	2023-04-25 21:46:02.938+03	2023-04-25 21:46:02.938+03
438	James Korloch		Актёр	https://www.kinopoisk.ru/name/1352556/	2023-04-25 21:46:02.988+03	2023-04-25 21:46:02.988+03
439	Дэвид Кубика	David Kubicka	Актёр	https://www.kinopoisk.ru/name/3084737/	2023-04-25 21:46:03.035+03	2023-04-25 21:46:03.035+03
440	Джордж Лалов	George LaLov	Актёр	https://www.kinopoisk.ru/name/3049037/	2023-04-25 21:46:03.086+03	2023-04-25 21:46:03.086+03
441	Дэвид Лэнсон	David Lanson	Актёр	https://www.kinopoisk.ru/name/1875355/	2023-04-25 21:46:03.135+03	2023-04-25 21:46:03.135+03
442	Alec Lawless		Актёр	https://www.kinopoisk.ru/name/4652760/	2023-04-25 21:46:03.19+03	2023-04-25 21:46:03.19+03
443	Камрон Леаль	Kamron Leal	Актёр	https://www.kinopoisk.ru/name/2707855/	2023-04-25 21:46:03.269+03	2023-04-25 21:46:03.269+03
444	Бен Лишур	Benjamin Leasure	Актёр	https://www.kinopoisk.ru/name/2801613/	2023-04-25 21:46:03.389+03	2023-04-25 21:46:03.389+03
445	Билли Ли	Billy Lee	Актёр	https://www.kinopoisk.ru/name/1964776/	2023-04-25 21:46:03.452+03	2023-04-25 21:46:03.452+03
446	Адам Леонг	Adam Leong	Актёр	https://www.kinopoisk.ru/name/2682186/	2023-04-25 21:46:03.504+03	2023-04-25 21:46:03.504+03
447	Пол Джуд Летерски	Paul Jude Letersky	Актёр	https://www.kinopoisk.ru/name/2210181/	2023-04-25 21:46:03.555+03	2023-04-25 21:46:03.555+03
448	Фентон Ли	Fenton Li	Актёр	https://www.kinopoisk.ru/name/2993362/	2023-04-25 21:46:03.626+03	2023-04-25 21:46:03.626+03
449	Jerry Lobrow		Актёр	https://www.kinopoisk.ru/name/2763203/	2023-04-25 21:46:03.686+03	2023-04-25 21:46:03.686+03
450	Леонард Логсдэйл	Leonard Logsdail	Актёр	https://www.kinopoisk.ru/name/1179066/	2023-04-25 21:46:03.751+03	2023-04-25 21:46:03.751+03
451	Эндрю Дж. Лонсдэйл	Andrew J. Lonsdale	Актёр	https://www.kinopoisk.ru/name/2697656/	2023-04-25 21:46:03.807+03	2023-04-25 21:46:03.807+03
452	Alexander LoVerde		Актёр	https://www.kinopoisk.ru/name/6569719/	2023-04-25 21:46:03.855+03	2023-04-25 21:46:03.855+03
453	Рик Ловетт	Rick Lovett	Актёр	https://www.kinopoisk.ru/name/3289503/	2023-04-25 21:46:03.91+03	2023-04-25 21:46:03.91+03
454	Эрика Линн	Erika Lynn	Актёр	https://www.kinopoisk.ru/name/2547936/	2023-04-25 21:46:03.964+03	2023-04-25 21:46:03.964+03
455	Уилл МакАдам	Will MacAdam	Актёр	https://www.kinopoisk.ru/name/1507511/	2023-04-25 21:46:04.008+03	2023-04-25 21:46:04.008+03
456	Стивен Макари	Stephen Macari	Актёр	https://www.kinopoisk.ru/name/3442957/	2023-04-25 21:46:04.069+03	2023-04-25 21:46:04.069+03
457	Evelyn Madera		Актёр	https://www.kinopoisk.ru/name/4730560/	2023-04-25 21:46:04.136+03	2023-04-25 21:46:04.136+03
458	Майк Мальваньо	Mike Malvagno	Актёр	https://www.kinopoisk.ru/name/3139405/	2023-04-25 21:46:04.174+03	2023-04-25 21:46:04.174+03
459	Стефани Манеску	Stephanie Manescu	Актёр	https://www.kinopoisk.ru/name/3400563/	2023-04-25 21:46:04.255+03	2023-04-25 21:46:04.255+03
460	Шавлини Манджунатх-Холбрук	Shawlini Manjunath-Holbrook	Актёр	https://www.kinopoisk.ru/name/3198084/	2023-04-25 21:46:04.303+03	2023-04-25 21:46:04.303+03
461	Judah McFadden		Актёр	https://www.kinopoisk.ru/name/3463591/	2023-04-25 21:46:04.343+03	2023-04-25 21:46:04.343+03
462	Кирк МакГи	Kirk McGee	Актёр	https://www.kinopoisk.ru/name/1127160/	2023-04-25 21:46:04.391+03	2023-04-25 21:46:04.391+03
463	Макс МакЛафлин	Max McLaughlin	Актёр	https://www.kinopoisk.ru/name/4134130/	2023-04-25 21:46:04.441+03	2023-04-25 21:46:04.441+03
464	Тиффани Мессам	Tiffany Messam	Актёр	https://www.kinopoisk.ru/name/3035114/	2023-04-25 21:46:04.505+03	2023-04-25 21:46:04.505+03
465	Зак Мико	Zach Miko	Актёр	https://www.kinopoisk.ru/name/2705507/	2023-04-25 21:46:04.552+03	2023-04-25 21:46:04.552+03
466	Брайан А. Миранда	Bryan A. Miranda	Актёр	https://www.kinopoisk.ru/name/3258236/	2023-04-25 21:46:04.605+03	2023-04-25 21:46:04.605+03
467	Alexander Moitzi		Актёр	https://www.kinopoisk.ru/name/3483302/	2023-04-25 21:46:04.656+03	2023-04-25 21:46:04.656+03
468	Бен Монахэн	Ben Monahan	Актёр	https://www.kinopoisk.ru/name/3473907/	2023-04-25 21:46:04.708+03	2023-04-25 21:46:04.708+03
469	Келлен Мориарти	Kellen Moriarty	Актёр	https://www.kinopoisk.ru/name/2916851/	2023-04-25 21:46:04.77+03	2023-04-25 21:46:04.77+03
470	Карен Моррис	Karen Morris	Актёр	https://www.kinopoisk.ru/name/4361461/	2023-04-25 21:46:04.819+03	2023-04-25 21:46:04.819+03
471	Рон Накахара	Ron Nakahara	Актёр	https://www.kinopoisk.ru/name/1207191/	2023-04-25 21:46:04.869+03	2023-04-25 21:46:04.869+03
472	Lee Navlen		Актёр	https://www.kinopoisk.ru/name/3184495/	2023-04-25 21:46:04.913+03	2023-04-25 21:46:04.913+03
473	Николь Нойман	Nicole Neuman	Актёр	https://www.kinopoisk.ru/name/2886830/	2023-04-25 21:46:04.973+03	2023-04-25 21:46:04.973+03
474	Крис Нунес	Chris Nunez	Актёр	https://www.kinopoisk.ru/name/1141515/	2023-04-25 21:46:05.054+03	2023-04-25 21:46:05.054+03
475	Ниэлл Сегура	Nyell	Актёр	https://www.kinopoisk.ru/name/2303188/	2023-04-25 21:46:05.108+03	2023-04-25 21:46:05.108+03
476	Seregon O'Dassey		Актёр	https://www.kinopoisk.ru/name/568414/	2023-04-25 21:46:05.176+03	2023-04-25 21:46:05.176+03
477	Джозеф Оливейра	Joseph Oliveira	Актёр	https://www.kinopoisk.ru/name/3324459/	2023-04-25 21:46:05.258+03	2023-04-25 21:46:05.258+03
478	Дэниэл Олсон	Daniel Olson	Актёр	https://www.kinopoisk.ru/name/3602490/	2023-04-25 21:46:05.337+03	2023-04-25 21:46:05.337+03
479	Эрик Олссен	Erik Olssen	Актёр	https://www.kinopoisk.ru/name/3153011/	2023-04-25 21:46:05.405+03	2023-04-25 21:46:05.405+03
480	Jennifer Ortiz		Актёр	https://www.kinopoisk.ru/name/3703604/	2023-04-25 21:46:05.488+03	2023-04-25 21:46:05.488+03
481	Энд Палладино	And Palladino	Актёр	https://www.kinopoisk.ru/name/2924708/	2023-04-25 21:46:05.559+03	2023-04-25 21:46:05.559+03
482	Рокко Пальмиери	Rocco Palmieri	Актёр	https://www.kinopoisk.ru/name/3055521/	2023-04-25 21:46:05.623+03	2023-04-25 21:46:05.623+03
483	Thomas Patrick		Актёр	https://www.kinopoisk.ru/name/4322581/	2023-04-25 21:46:05.673+03	2023-04-25 21:46:05.673+03
484	Джеффри Пэйн	Geoffrey Payne	Актёр	https://www.kinopoisk.ru/name/1733961/	2023-04-25 21:46:05.724+03	2023-04-25 21:46:05.724+03
485	Джон Л. Пикок	Jon L Peacock	Актёр	https://www.kinopoisk.ru/name/3848030/	2023-04-25 21:46:05.788+03	2023-04-25 21:46:05.788+03
486	Andrew Penabad		Актёр	https://www.kinopoisk.ru/name/4138361/	2023-04-25 21:46:05.841+03	2023-04-25 21:46:05.841+03
487	Катрина Префонтейн	Katrina Prefontaine	Актёр	https://www.kinopoisk.ru/name/1554214/	2023-04-25 21:46:05.89+03	2023-04-25 21:46:05.89+03
488	Майк Перкинс	Mike Perkins	Актёр	https://www.kinopoisk.ru/name/2044945/	2023-04-25 21:46:05.972+03	2023-04-25 21:46:05.972+03
489	Michael Perrie Jr.		Актёр	https://www.kinopoisk.ru/name/2484444/	2023-04-25 21:46:06.025+03	2023-04-25 21:46:06.025+03
490	Джозеф Пьяцца	Joseph Piazza	Актёр	https://www.kinopoisk.ru/name/3645834/	2023-04-25 21:46:06.193+03	2023-04-25 21:46:06.193+03
491	Diane Poulos		Актёр	https://www.kinopoisk.ru/name/3190292/	2023-04-25 21:46:06.293+03	2023-04-25 21:46:06.293+03
492	Майкл Пауэр	Michael Power	Актёр	https://www.kinopoisk.ru/name/2107125/	2023-04-25 21:46:06.368+03	2023-04-25 21:46:06.368+03
493	Emma Powers		Актёр	https://www.kinopoisk.ru/name/4914718/	2023-04-25 21:46:06.438+03	2023-04-25 21:46:06.438+03
494	Томас Раймондо	Thomas Raimondo	Актёр	https://www.kinopoisk.ru/name/1843412/	2023-04-25 21:46:06.524+03	2023-04-25 21:46:06.524+03
495	Дженнифер Диксон	Jennifer Rainey	Актёр	https://www.kinopoisk.ru/name/2191018/	2023-04-25 21:46:06.575+03	2023-04-25 21:46:06.575+03
496	Джон Дуглас Рейни	Jon Douglas Rainey	Актёр	https://www.kinopoisk.ru/name/1135153/	2023-04-25 21:46:06.624+03	2023-04-25 21:46:06.624+03
497	Нил Риз	Neil Reese	Актёр	https://www.kinopoisk.ru/name/3508733/	2023-04-25 21:46:06.687+03	2023-04-25 21:46:06.687+03
498	Abbie Richards		Актёр	https://www.kinopoisk.ru/name/3769426/	2023-04-25 21:46:06.737+03	2023-04-25 21:46:06.737+03
499	Бриттни Роуз	Brittney Parker Rose	Актёр	https://www.kinopoisk.ru/name/1884049/	2023-04-25 21:46:06.781+03	2023-04-25 21:46:06.781+03
500	Джэми Розен	Jamie Rosen	Актёр	https://www.kinopoisk.ru/name/2940758/	2023-04-25 21:46:06.827+03	2023-04-25 21:46:06.827+03
501	Рэйчел Россин	Rachel Rossin	Актёр	https://www.kinopoisk.ru/name/2985033/	2023-04-25 21:46:06.876+03	2023-04-25 21:46:06.876+03
502	Тайлер Ивэн Роу	Tyler Evan Rowe	Актёр	https://www.kinopoisk.ru/name/3678586/	2023-04-25 21:46:06.926+03	2023-04-25 21:46:06.926+03
503	Николь Рутильяно	Nicole Rutigliano	Актёр	https://www.kinopoisk.ru/name/1835232/	2023-04-25 21:46:07.024+03	2023-04-25 21:46:07.024+03
504	Меки Салдана	Meki Saldana	Актёр	https://www.kinopoisk.ru/name/3055520/	2023-04-25 21:46:07.085+03	2023-04-25 21:46:07.085+03
505	Принцесс Реймундо	Princess Reymundo	Актёр	https://www.kinopoisk.ru/name/402456/	2023-04-25 21:46:07.139+03	2023-04-25 21:46:07.139+03
506	Чак Шанаманн	Chuck Schanamann	Актёр	https://www.kinopoisk.ru/name/1052303/	2023-04-25 21:46:07.193+03	2023-04-25 21:46:07.193+03
507	Макс Колби	Martin Schöndorfer	Актёр	https://www.kinopoisk.ru/name/2930760/	2023-04-25 21:46:07.244+03	2023-04-25 21:46:07.244+03
508	Вин Скьялла	Vin Scialla	Актёр	https://www.kinopoisk.ru/name/3067187/	2023-04-25 21:46:07.296+03	2023-04-25 21:46:07.296+03
509	Джей Скотт	Jay Scott	Актёр	https://www.kinopoisk.ru/name/3084736/	2023-04-25 21:46:07.359+03	2023-04-25 21:46:07.359+03
510	Кит П. Скотт	Keith P. Scott	Актёр	https://www.kinopoisk.ru/name/968576/	2023-04-25 21:46:07.442+03	2023-04-25 21:46:07.442+03
511	Terra Kimberly Scott		Актёр	https://www.kinopoisk.ru/name/3767817/	2023-04-25 21:46:07.527+03	2023-04-25 21:46:07.527+03
512	Гэбриел Сикел	Gabriel Sickel	Актёр	https://www.kinopoisk.ru/name/3105457/	2023-04-25 21:46:07.62+03	2023-04-25 21:46:07.62+03
513	Роберт Скелли	Robert Skelly	Актёр	https://www.kinopoisk.ru/name/3224307/	2023-04-25 21:46:07.707+03	2023-04-25 21:46:07.707+03
514	Крис Скерис	Chris Skeries	Актёр	https://www.kinopoisk.ru/name/2763469/	2023-04-25 21:46:07.767+03	2023-04-25 21:46:07.767+03
515	Келли Сауферлэнд	Kelly Southerland	Актёр	https://www.kinopoisk.ru/name/2382034/	2023-04-25 21:46:07.837+03	2023-04-25 21:46:07.837+03
516	Такер Спаркман	Tucker Sparkman	Актёр	https://www.kinopoisk.ru/name/3076659/	2023-04-25 21:46:07.886+03	2023-04-25 21:46:07.886+03
517	Мередит Райли Стюарт	Meredith Riley Stewart	Актёр	https://www.kinopoisk.ru/name/953154/	2023-04-25 21:46:07.936+03	2023-04-25 21:46:07.936+03
518	Мэтт Стриклэнд	Matt Strickland	Актёр	https://www.kinopoisk.ru/name/1561337/	2023-04-25 21:46:08.021+03	2023-04-25 21:46:08.021+03
519	Герард Салливан	Gerard Sullivan	Актёр	https://www.kinopoisk.ru/name/2817336/	2023-04-25 21:46:08.104+03	2023-04-25 21:46:08.104+03
520	Rafael Svarin		Актёр	https://www.kinopoisk.ru/name/2962692/	2023-04-25 21:46:08.175+03	2023-04-25 21:46:08.175+03
521	Мэриэнн Татум	Marianne Tatum	Актёр	https://www.kinopoisk.ru/name/161331/	2023-04-25 21:46:08.273+03	2023-04-25 21:46:08.273+03
522	Билли Кларк Тейлор	Billy Clark Taylor	Актёр	https://www.kinopoisk.ru/name/4023790/	2023-04-25 21:46:08.375+03	2023-04-25 21:46:08.375+03
523	Temple University Diamond Marching Band	Temple University Diamond Marching Band	Актёр	https://www.kinopoisk.ru/name/3416160/	2023-04-25 21:46:08.574+03	2023-04-25 21:46:08.574+03
524	Адам Тепер	Adam Teper	Актёр	https://www.kinopoisk.ru/name/2611592/	2023-04-25 21:46:08.674+03	2023-04-25 21:46:08.674+03
525	Николас Тети	Nicky Teti	Актёр	https://www.kinopoisk.ru/name/2394148/	2023-04-25 21:46:08.772+03	2023-04-25 21:46:08.772+03
526	Дэйв Томпсон	Dave Thompson	Актёр	https://www.kinopoisk.ru/name/173037/	2023-04-25 21:46:08.831+03	2023-04-25 21:46:08.831+03
527	Логан Торо	Logan Thoreau	Актёр	https://www.kinopoisk.ru/name/2972735/	2023-04-25 21:46:08.898+03	2023-04-25 21:46:08.898+03
528	Пол Торнтон	Paul Thornton	Актёр	https://www.kinopoisk.ru/name/696393/	2023-04-25 21:46:08.99+03	2023-04-25 21:46:08.99+03
529	Ryan Timberlake		Актёр	https://www.kinopoisk.ru/name/3375797/	2023-04-25 21:46:09.088+03	2023-04-25 21:46:09.088+03
530	Касси Торрес	Cassi Torres	Актёр	https://www.kinopoisk.ru/name/3310586/	2023-04-25 21:46:09.173+03	2023-04-25 21:46:09.173+03
531	Kathleen Tripp		Актёр	https://www.kinopoisk.ru/name/4487588/	2023-04-25 21:46:09.265+03	2023-04-25 21:46:09.265+03
532	Джош Тровато	Josh Trovato	Актёр	https://www.kinopoisk.ru/name/3921775/	2023-04-25 21:46:09.337+03	2023-04-25 21:46:09.337+03
533	Alex Van Zeelandt		Актёр	https://www.kinopoisk.ru/name/4098271/	2023-04-25 21:46:09.393+03	2023-04-25 21:46:09.393+03
534	Реджинальд ВелДжонсон	Reginald VelJohnson	Актёр	https://www.kinopoisk.ru/name/39709/	2023-04-25 21:46:09.459+03	2023-04-25 21:46:09.459+03
535	Стефано Вильябона	Stefano Villabona	Актёр	https://www.kinopoisk.ru/name/3086308/	2023-04-25 21:46:09.523+03	2023-04-25 21:46:09.523+03
536	Мадлен Уэйд	Madeleine Wade	Актёр	https://www.kinopoisk.ru/name/18691/	2023-04-25 21:46:09.606+03	2023-04-25 21:46:09.606+03
537	Сильвия Вардашка	Sylwia Wardaszka	Актёр	https://www.kinopoisk.ru/name/1860939/	2023-04-25 21:46:09.676+03	2023-04-25 21:46:09.676+03
538	Sky Watersend		Актёр	https://www.kinopoisk.ru/name/3382863/	2023-04-25 21:46:09.74+03	2023-04-25 21:46:09.74+03
539	Fredrick Weiss		Актёр	https://www.kinopoisk.ru/name/4199819/	2023-04-25 21:46:09.803+03	2023-04-25 21:46:09.803+03
540	Дэвид Вензел	David Wenzel	Актёр	https://www.kinopoisk.ru/name/59019/	2023-04-25 21:46:09.857+03	2023-04-25 21:46:09.857+03
541	Джэлил Уайт	Jaleel White	Актёр	https://www.kinopoisk.ru/name/36897/	2023-04-25 21:46:09.917+03	2023-04-25 21:46:09.917+03
542	Даррен Уитфилд	Darren Whitfield	Актёр	https://www.kinopoisk.ru/name/3262636/	2023-04-25 21:46:09.975+03	2023-04-25 21:46:09.975+03
543	Ben Paul Williams		Актёр	https://www.kinopoisk.ru/name/5276070/	2023-04-25 21:46:10.04+03	2023-04-25 21:46:10.04+03
544	Эдвард Вудворд	Edward Woodward	Актёр	https://www.kinopoisk.ru/name/46366/	2023-04-25 21:46:10.138+03	2023-04-25 21:46:10.138+03
545	Николас Вёрманн	Nicholas Wuehrmann	Актёр	https://www.kinopoisk.ru/name/2763343/	2023-04-25 21:46:10.204+03	2023-04-25 21:46:10.204+03
546	Перри Янив	Perri Yaniv	Актёр	https://www.kinopoisk.ru/name/1661085/	2023-04-25 21:46:10.27+03	2023-04-25 21:46:10.27+03
547	Джо Засо	Joe Zaso	Актёр	https://www.kinopoisk.ru/name/230292/	2023-04-25 21:46:10.355+03	2023-04-25 21:46:10.355+03
548	Nenad Zezelj		Актёр	https://www.kinopoisk.ru/name/3142355/	2023-04-25 21:46:10.458+03	2023-04-25 21:46:10.458+03
549	Джереми Зиро	Jeremy Zierau	Актёр	https://www.kinopoisk.ru/name/2982099/	2023-04-25 21:46:10.555+03	2023-04-25 21:46:10.555+03
550	Риза Азиз	Riza Aziz	Продюсер	https://www.kinopoisk.ru/name/2357901/	2023-04-25 21:46:10.661+03	2023-04-25 21:46:10.661+03
551	Леонардо ДиКаприо	Leonardo DiCaprio	Продюсер	https://www.kinopoisk.ru/name/37859/	2023-04-25 21:46:10.742+03	2023-04-25 21:46:10.742+03
552	Мартин Скорсезе	Martin Scorsese	Продюсер	https://www.kinopoisk.ru/name/10988/	2023-04-25 21:46:10.842+03	2023-04-25 21:46:10.842+03
553	Эмма Тиллинджер Коскофф	Emma Tillinger Koskoff	Продюсер	https://www.kinopoisk.ru/name/1140340/	2023-04-25 21:46:10.904+03	2023-04-25 21:46:10.904+03
554	Ричард Баратта	Richard Baratta	Продюсер	https://www.kinopoisk.ru/name/30138/	2023-04-25 21:46:10.974+03	2023-04-25 21:46:10.974+03
555	Марианн Бауэр	Marianne Bower	Продюсер	https://www.kinopoisk.ru/name/910596/	2023-04-25 21:46:11.054+03	2023-04-25 21:46:11.054+03
556	Дэнни Димборт	Danny Dimbort	Продюсер	https://www.kinopoisk.ru/name/280/	2023-04-25 21:46:11.109+03	2023-04-25 21:46:11.109+03
557	Джоэль Готлер	Joel Gotler	Продюсер	https://www.kinopoisk.ru/name/573108/	2023-04-25 21:46:11.176+03	2023-04-25 21:46:11.176+03
558	Тед Гриффин	Ted Griffin	Продюсер	https://www.kinopoisk.ru/name/23434/	2023-04-25 21:46:11.242+03	2023-04-25 21:46:11.242+03
559	Джорджия Касандес	Georgia Kacandes	Продюсер	https://www.kinopoisk.ru/name/22306/	2023-04-25 21:46:11.304+03	2023-04-25 21:46:11.304+03
560	Джои МакФарланд	Joey McFarland	Продюсер	https://www.kinopoisk.ru/name/1276047/	2023-04-25 21:46:11.369+03	2023-04-25 21:46:11.369+03
561	Александра Милчэн	Alexandra Milchan	Продюсер	https://www.kinopoisk.ru/name/22145/	2023-04-25 21:46:11.425+03	2023-04-25 21:46:11.425+03
562	Адам Сомнер	Adam Somner	Продюсер	https://www.kinopoisk.ru/name/3068764/	2023-04-25 21:46:11.526+03	2023-04-25 21:46:11.526+03
563	Ирвин Уинклер	Irwin Winkler	Продюсер	https://www.kinopoisk.ru/name/9853/	2023-04-25 21:46:11.623+03	2023-04-25 21:46:11.623+03
564	Рик Йорн	Rick Yorn	Продюсер	https://www.kinopoisk.ru/name/41551/	2023-04-25 21:46:11.74+03	2023-04-25 21:46:11.74+03
565	Теренс Уинтер	Terence Winter	Сценарист	https://www.kinopoisk.ru/name/226920/	2023-04-25 21:46:11.841+03	2023-04-25 21:46:11.841+03
566	Джордан Белфорт	Jordan Belfort	Сценарист	https://www.kinopoisk.ru/name/88348/	2023-04-25 21:46:11.942+03	2023-04-25 21:46:11.942+03
567	Родриго Прието	Rodrigo Prieto	Оператор	https://www.kinopoisk.ru/name/608106/	2023-04-25 21:46:12.057+03	2023-04-25 21:46:12.057+03
568	Сергей Бурунов		Актёр дубляжа	https://www.kinopoisk.ru/name/1193331/	2023-04-25 21:46:12.204+03	2023-04-25 21:46:12.204+03
569	Диомид Виноградов		Актёр дубляжа	https://www.kinopoisk.ru/name/1781077/	2023-04-25 21:46:12.273+03	2023-04-25 21:46:12.273+03
570	Вадим Медведев		Актёр дубляжа	https://www.kinopoisk.ru/name/1629080/	2023-04-25 21:46:12.42+03	2023-04-25 21:46:12.42+03
571	Владимир Левашёв		Актёр дубляжа	https://www.kinopoisk.ru/name/2956583/	2023-04-25 21:46:12.52+03	2023-04-25 21:46:12.52+03
572	Михаил Тихонов		Актёр дубляжа	https://www.kinopoisk.ru/name/273498/	2023-04-25 21:46:12.603+03	2023-04-25 21:46:12.603+03
573	Александр Носков		Актёр дубляжа	https://www.kinopoisk.ru/name/1608429/	2023-04-25 21:46:12.67+03	2023-04-25 21:46:12.67+03
574	Екатерина Виноградова		Актёр дубляжа	https://www.kinopoisk.ru/name/1649302/	2023-04-25 21:46:12.738+03	2023-04-25 21:46:12.738+03
575	Радик Мухаметзянов		Актёр дубляжа	https://www.kinopoisk.ru/name/1827781/	2023-04-25 21:46:12.954+03	2023-04-25 21:46:12.954+03
576	Сергей Чихачёв		Актёр дубляжа	https://www.kinopoisk.ru/name/1539232/	2023-04-25 21:46:13.041+03	2023-04-25 21:46:13.041+03
577	Елена Войновская		Актёр дубляжа	https://www.kinopoisk.ru/name/2365021/	2023-04-25 21:46:13.221+03	2023-04-25 21:46:13.221+03
578	Даниил Эльдаров		Актёр дубляжа	https://www.kinopoisk.ru/name/1818938/	2023-04-25 21:46:13.322+03	2023-04-25 21:46:13.322+03
579	Елена Сванидзе		Актёр дубляжа	https://www.kinopoisk.ru/name/3636231/	2023-04-25 21:46:13.425+03	2023-04-25 21:46:13.425+03
580	Константин Карасик		Актёр дубляжа	https://www.kinopoisk.ru/name/1557383/	2023-04-25 21:46:13.523+03	2023-04-25 21:46:13.523+03
581	Дмитрий Поляновский		Актёр дубляжа	https://www.kinopoisk.ru/name/2406317/	2023-04-25 21:46:13.593+03	2023-04-25 21:46:13.593+03
582	Станислав Тикунов		Актёр дубляжа	https://www.kinopoisk.ru/name/1667364/	2023-04-25 21:46:13.688+03	2023-04-25 21:46:13.688+03
583	Евгения Ваган		Актёр дубляжа	https://www.kinopoisk.ru/name/3373972/	2023-04-25 21:46:13.821+03	2023-04-25 21:46:13.821+03
584	Олег Форостенко		Актёр дубляжа	https://www.kinopoisk.ru/name/590562/	2023-04-25 21:46:13.92+03	2023-04-25 21:46:13.92+03
585	Сергей Вещев		Актёр дубляжа	https://www.kinopoisk.ru/name/281190/	2023-04-25 21:46:13.992+03	2023-04-25 21:46:13.992+03
586	Василиса Воронина		Актёр дубляжа	https://www.kinopoisk.ru/name/1634448/	2023-04-25 21:46:14.071+03	2023-04-25 21:46:14.071+03
587	Александр Дасевич		Актёр дубляжа	https://www.kinopoisk.ru/name/2666011/	2023-04-25 21:46:14.137+03	2023-04-25 21:46:14.137+03
588	Александра Курагина		Актёр дубляжа	https://www.kinopoisk.ru/name/2444078/	2023-04-25 21:46:14.206+03	2023-04-25 21:46:14.206+03
589	Артем Лысков		Актёр дубляжа	https://www.kinopoisk.ru/name/1624701/	2023-04-25 21:46:14.342+03	2023-04-25 21:46:14.342+03
590	Артем Маликов		Актёр дубляжа	https://www.kinopoisk.ru/name/1557418/	2023-04-25 21:46:14.423+03	2023-04-25 21:46:14.423+03
591	Василий Стоноженко		Актёр дубляжа	https://www.kinopoisk.ru/name/1454718/	2023-04-25 21:46:14.52+03	2023-04-25 21:46:14.52+03
592	Владимир Никитин		Актёр дубляжа	https://www.kinopoisk.ru/name/304328/	2023-04-25 21:46:14.591+03	2023-04-25 21:46:14.591+03
593	Григорий Маликов		Актёр дубляжа	https://www.kinopoisk.ru/name/277571/	2023-04-25 21:46:14.673+03	2023-04-25 21:46:14.673+03
594	Ирина Виленкина		Актёр дубляжа	https://www.kinopoisk.ru/name/2723262/	2023-04-25 21:46:14.751+03	2023-04-25 21:46:14.751+03
595	Кирилл Туранский		Актёр дубляжа	https://www.kinopoisk.ru/name/2887091/	2023-04-25 21:46:14.837+03	2023-04-25 21:46:14.837+03
596	Никита Прозоровский		Актёр дубляжа	https://www.kinopoisk.ru/name/273180/	2023-04-25 21:46:14.92+03	2023-04-25 21:46:14.92+03
597	Николай Маликов		Актёр дубляжа	https://www.kinopoisk.ru/name/277572/	2023-04-25 21:46:15.023+03	2023-04-25 21:46:15.023+03
598	Олег Новиков		Актёр дубляжа	https://www.kinopoisk.ru/name/2638367/	2023-04-25 21:46:15.139+03	2023-04-25 21:46:15.139+03
599	Олег Щербинин		Актёр дубляжа	https://www.kinopoisk.ru/name/298651/	2023-04-25 21:46:15.24+03	2023-04-25 21:46:15.24+03
600	Павел Кузьмин		Актёр дубляжа	https://www.kinopoisk.ru/name/1873754/	2023-04-25 21:46:15.371+03	2023-04-25 21:46:15.371+03
601	Полина Сапегина		Актёр дубляжа	https://www.kinopoisk.ru/name/2456314/	2023-04-25 21:46:15.477+03	2023-04-25 21:46:15.477+03
602	Серафим Носков		Актёр дубляжа	https://www.kinopoisk.ru/name/4215377/	2023-04-25 21:46:15.56+03	2023-04-25 21:46:15.56+03
603	Софья Горшкова		Актёр дубляжа	https://www.kinopoisk.ru/name/298198/	2023-04-25 21:46:15.638+03	2023-04-25 21:46:15.638+03
604	Татьяна Шарко		Актёр дубляжа	https://www.kinopoisk.ru/name/2911540/	2023-04-25 21:46:15.709+03	2023-04-25 21:46:15.709+03
605	Александр Яцковский		Актёр дубляжа	https://www.kinopoisk.ru/name/2837635/	2023-04-25 21:46:15.888+03	2023-04-25 21:46:15.888+03
606	Елена Ивасишина		Актёр дубляжа	https://www.kinopoisk.ru/name/1650216/	2023-04-25 21:46:16.053+03	2023-04-25 21:46:16.053+03
607	Ирина Пономарева		Актёр дубляжа	https://www.kinopoisk.ru/name/317772/	2023-04-25 21:46:16.137+03	2023-04-25 21:46:16.137+03
608	Сергей Чурбаков		Актёр дубляжа	https://www.kinopoisk.ru/name/281227/	2023-04-25 21:46:16.286+03	2023-04-25 21:46:16.286+03
609	Тимофей Спивак		Актёр дубляжа	https://www.kinopoisk.ru/name/277509/	2023-04-25 21:46:16.369+03	2023-04-25 21:46:16.369+03
610	Юрий Маляров		Актёр дубляжа	https://www.kinopoisk.ru/name/280829/	2023-04-25 21:46:16.455+03	2023-04-25 21:46:16.455+03
611	Анастасия Лапина		Актёр дубляжа	https://www.kinopoisk.ru/name/1234051/	2023-04-25 21:46:16.721+03	2023-04-25 21:46:16.721+03
612	Александр Гаврилин		Актёр дубляжа	https://www.kinopoisk.ru/name/1649303/	2023-04-25 21:46:16.823+03	2023-04-25 21:46:16.823+03
613	Всеволод Кузнецов		Актёр дубляжа	https://www.kinopoisk.ru/name/1616407/	2023-04-25 21:46:16.975+03	2023-04-25 21:46:16.975+03
614	Ольга Кузнецова		Актёр дубляжа	https://www.kinopoisk.ru/name/281329/	2023-04-25 21:46:17.088+03	2023-04-25 21:46:17.088+03
615	Дина Бобылёва		Актёр дубляжа	https://www.kinopoisk.ru/name/3149106/	2023-04-25 21:46:17.203+03	2023-04-25 21:46:17.203+03
616	Наталья Грачёва		Актёр дубляжа	https://www.kinopoisk.ru/name/1824212/	2023-04-25 21:46:17.288+03	2023-04-25 21:46:17.288+03
617	Максим Шишков		Актёр дубляжа	https://www.kinopoisk.ru/name/1621697/	2023-04-25 21:46:17.49+03	2023-04-25 21:46:17.49+03
618	Владимир Герасимов		Актёр дубляжа	https://www.kinopoisk.ru/name/1620788/	2023-04-25 21:46:17.59+03	2023-04-25 21:46:17.59+03
619	Егор Евдокимов		Актёр дубляжа	https://www.kinopoisk.ru/name/4166618/	2023-04-25 21:46:17.706+03	2023-04-25 21:46:17.706+03
620	Антон Эльдаров		Актёр дубляжа	https://www.kinopoisk.ru/name/1557066/	2023-04-25 21:46:17.786+03	2023-04-25 21:46:17.786+03
621	Денис Беспалый		Актёр дубляжа	https://www.kinopoisk.ru/name/1040432/	2023-04-25 21:46:17.886+03	2023-04-25 21:46:17.886+03
622	Тельма Скунмейкер	Thelma Schoonmaker	Монтажёр	https://www.kinopoisk.ru/name/318813/	2023-04-25 21:46:18.089+03	2023-04-25 21:46:18.089+03
623	Боб Шоу	Bob Shaw	Художник	https://www.kinopoisk.ru/name/1221803/	2023-04-25 21:46:18.208+03	2023-04-25 21:46:18.208+03
624	Крис Шрайвер	Chris Shriver	Художник	https://www.kinopoisk.ru/name/1986068/	2023-04-25 21:46:18.338+03	2023-04-25 21:46:18.338+03
625	Dave Asling		Художник	https://www.kinopoisk.ru/name/3826494/	2023-04-25 21:46:18.516+03	2023-04-25 21:46:18.516+03
626	Сэнди Пауэлл	Sandy Powell	Художник	https://www.kinopoisk.ru/name/126258/	2023-04-25 21:46:18.722+03	2023-04-25 21:46:18.722+03
627	Эллен Кристиансен	Ellen Christiansen	Художник	https://www.kinopoisk.ru/name/159227/	2023-04-25 21:46:18.886+03	2023-04-25 21:46:18.886+03
\.


--
-- Name: genres_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.genres_id_seq', 5, true);


--
-- Name: images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.images_id_seq', 124, true);


--
-- Name: movie_genres_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.movie_genres_id_seq', 10, true);


--
-- Name: movie_people_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.movie_people_id_seq', 641, true);


--
-- Name: movies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.movies_id_seq', 3, true);


--
-- Name: people_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.people_id_seq', 627, true);


--
-- Name: genres genres_genre_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genres
    ADD CONSTRAINT genres_genre_key UNIQUE (genre);


--
-- Name: genres genres_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genres
    ADD CONSTRAINT genres_pkey PRIMARY KEY (id);


--
-- Name: images images_image_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_image_key UNIQUE (image);


--
-- Name: images images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_pkey PRIMARY KEY (id);


--
-- Name: movie_genres movie_genres_genreId_movieId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_genres
    ADD CONSTRAINT "movie_genres_genreId_movieId_key" UNIQUE ("genreId", "movieId");


--
-- Name: movie_genres movie_genres_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_genres
    ADD CONSTRAINT movie_genres_pkey PRIMARY KEY (id);


--
-- Name: movie_people movie_people_peopleId_movieId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_people
    ADD CONSTRAINT "movie_people_peopleId_movieId_key" UNIQUE ("peopleId", "movieId");


--
-- Name: movie_people movie_people_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_people
    ADD CONSTRAINT movie_people_pkey PRIMARY KEY (id);


--
-- Name: movies movies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT movies_pkey PRIMARY KEY (id);


--
-- Name: people people_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.people
    ADD CONSTRAINT people_pkey PRIMARY KEY (id);


--
-- Name: images images_movieId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT "images_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES public.movies(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: movie_genres movie_genres_genreId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_genres
    ADD CONSTRAINT "movie_genres_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES public.genres(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: movie_genres movie_genres_movieId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_genres
    ADD CONSTRAINT "movie_genres_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES public.movies(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: movie_people movie_people_movieId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_people
    ADD CONSTRAINT "movie_people_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES public.movies(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: movie_people movie_people_peopleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.movie_people
    ADD CONSTRAINT "movie_people_peopleId_fkey" FOREIGN KEY ("peopleId") REFERENCES public.people(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

