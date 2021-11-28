CREATE TABLE "users" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "entries" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"date" DATE NOT NULL DEFAULT 'now()',
	"description" TEXT NOT NULL,
	"value" money NOT NULL,
	CONSTRAINT "entries_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "entries" ADD CONSTRAINT "entries_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
