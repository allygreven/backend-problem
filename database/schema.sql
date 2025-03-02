set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."users" (
  "userId" serial PRIMARY KEY,
  "username" text unique,
  "hashedPassword" text
);

create table "public"."movies" (
  "movieId"      serial PRIMARY KEY,
  "title"        text,
  "summary"     text,
  "link"        text,
  "rating"   integer
);

COMMENT ON COLUMN "movies"."rating" IS 'values: 1, 2, 3, 4, 5';
