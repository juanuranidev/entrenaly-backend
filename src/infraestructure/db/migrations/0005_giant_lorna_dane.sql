CREATE TABLE IF NOT EXISTS "plans_circuit" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"plan_day_id" integer
);
--> statement-breakpoint
ALTER TABLE "plans_exercises" ALTER COLUMN "plan_day_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "plans_exercises" ADD COLUMN "plan_circuit_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "plans_exercises" ADD CONSTRAINT "plans_exercises_plan_circuit_id_plans_circuit_id_fk" FOREIGN KEY ("plan_circuit_id") REFERENCES "plans_circuit"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "plans_circuit" ADD CONSTRAINT "plans_circuit_plan_day_id_plans_days_id_fk" FOREIGN KEY ("plan_day_id") REFERENCES "plans_days"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
