
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE Table "users" (
	"id" SERIAL PRIMARY KEY,
	"username" varchar(80) UNIQUE NOT NULL,
	"password" varchar(1000) NOT NULL
);

CREATE TABLE "notes" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INTEGER REFERENCES "users",
	"car_id" INTEGER REFERENCES "cars"
);

CREATE TABLE "details" (
	"id" SERIAL PRIMARY KEY,
	"notes_id" INTEGER REFERENCES "notes",
	"type" VARCHAR(40) NOT NULL,
	"problem" VARCHAR(480),
	"solution" VARCHAR(480),
	"solved" BOOLEAN DEFAULT false,
	"text" varchar(240)
);

CREATE TABLE "images" (
	"id" SERIAL PRIMARY KEY,
	"path" varchar(240),
	"note_id" INTEGER REFERENCES "notes"
);

CREATE TABLE "cars" (
	"id" SERIAL PRIMARY KEY,
	"year" INTEGER NOT NULL,
	"make" VARCHAR(40) NOT NULL,
	"model" VARCHAR(40) NOT NULL
);