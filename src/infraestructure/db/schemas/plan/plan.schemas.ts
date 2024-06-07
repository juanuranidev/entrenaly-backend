import {
  serial,
  boolean,
  varchar,
  pgTable,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";
import { users } from "../user/user.schemas";
import { clients } from "../client/client.schema";
import { relations } from "drizzle-orm";
import { exercises } from "../exercise/exercise.schemas";

export const plansCategories = pgTable("plans_categories", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 256 }).notNull(),
});

export const plansTypes = pgTable("plans_types", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 256 }).notNull(),
});

export const plans = pgTable("plans", {
  id: varchar("id", { length: 256 }).primaryKey().notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  isActive: boolean("is_active").notNull().default(true),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  name: varchar("name", { length: 256 }).notNull(),
  categoryId: integer("category_id")
    .notNull()
    .references(() => plansCategories.id),
  typeId: integer("type_id")
    .notNull()
    .references(() => plansTypes.id),
  userId: varchar("user_id")
    .notNull()
    .references(() => users.id),
});

export const plansRelations = relations(plans, ({ many }) => ({
  days: many(plansDays),
  clients: many(clients),
}));

export const clientsPlans = pgTable("clients_plans", {
  id: serial("id").primaryKey().notNull(),
  clientId: varchar("client_id")
    .notNull()
    .references(() => clients.id),
  planId: varchar("plan_id")
    .notNull()
    .references(() => plans.id),
  isActive: boolean("is_active").notNull().default(true),
});

export const clientsPlansRelations = relations(clientsPlans, ({ one }) => ({
  plan: one(plans, {
    fields: [clientsPlans.planId],
    references: [plans.id],
  }),
  client: one(clients, {
    fields: [clientsPlans.clientId],
    references: [clients.id],
  }),
}));

export const plansDays = pgTable("plans_days", {
  id: serial("id").primaryKey().notNull(),
  planId: varchar("plan_id")
    .notNull()
    .references(() => plans.id),
  dayOfWeekId: integer("day_of_week_id")
    .notNull()
    .references(() => daysOfWeek.id),
  isActive: boolean("is_active").notNull().default(true),
});

export const plansExercises = pgTable("plans_exercises", {
  id: serial("id").primaryKey().notNull(),
  planDayId: integer("plan_day_id")
    .notNull()
    .references(() => plansDays.id),
  exerciseId: integer("exercise_id")
    .notNull()
    .references(() => exercises.id),
  description: varchar("description", { length: 256 }).notNull(),
  isActive: boolean("is_active").notNull().default(true),
});

export const daysOfWeek = pgTable("days_of_week", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  order: integer("order").notNull(),
});
