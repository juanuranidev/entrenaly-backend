CREATE TABLE IF NOT EXISTS "app_releases" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" timestamp NOT NULL,
	"version" varchar(256) NOT NULL,
	"description" varchar(500) NOT NULL
);
