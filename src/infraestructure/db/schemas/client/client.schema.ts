import { users } from "../user/user.schemas";
import { pgTable, varchar, boolean, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { clientsPlans } from "../plan/plan.schemas";

export const clients = pgTable("clients", {
  id: varchar("id", { length: 256 }).primaryKey().notNull(),
  userId: varchar("user_id").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  trainerId: varchar("trainer_id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  weight: varchar("weight", { length: 256 }),
  height: varchar("height", { length: 256 }),
  goals: varchar("goals", { length: 256 }),
  injuries: varchar("injuries", { length: 256 }),
  medicalConditions: varchar("medicalConditions", { length: 256 }),
  hasCompletedOnboarding: boolean("has_completed_onboarding")
    .notNull()
    .default(false),
  typeOfBody: varchar("type_of_body", { length: 256 }),
});

export const clientsRelations = relations(clients, ({ one, many }) => ({
  trainer: one(users, {
    fields: [clients.trainerId],
    references: [users.id],
  }),
  user: one(users, {
    fields: [clients.userId],
    references: [users.id],
  }),
  plans: many(clientsPlans),
}));

export const invites = pgTable("invites", {
  id: varchar("id", { length: 256 }).primaryKey().notNull(),
  userId: varchar("user_id").notNull().unique(),
});

export const invitesRelations = relations(invites, ({ one }) => ({
  user: one(users, {
    fields: [invites.userId],
    references: [users.id],
  }),
}));
