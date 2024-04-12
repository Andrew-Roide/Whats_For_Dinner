set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "users" (
  "id" serial PRIMARY KEY,
  "created_at" timestamp
);

CREATE TABLE "dishes" (
  "id" serial PRIMARY KEY,
  "userId" integer,
  "title" text,
  "photoUrl" text,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "dishIngredients" (
  "id" serial PRIMARY KEY,
  "dishId" integer,
  "ingredientId" integer
);

CREATE TABLE "ingredients" (
  "id" serial PRIMARY KEY,
  "name" text,
  "created_at" timestamp
);


ALTER TABLE "dishes" ADD FOREIGN KEY ("userId") REFERENCES "users" ("id");

ALTER TABLE "dishIngredients" ADD FOREIGN KEY ("dishId") REFERENCES "dishes" ("id");

ALTER TABLE "dishIngredients" ADD FOREIGN KEY ("ingredientId") REFERENCES "ingredients" ("id");
