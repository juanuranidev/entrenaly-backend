import {
  serial,
  varchar,
  integer,
  pgTable,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { clients, invites } from "../client/client.schema";

export const users = pgTable("users", {
  id: varchar("id", { length: 256 }).primaryKey().notNull().unique(),
  name: varchar("name", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull().unique(),
  image: varchar("image", { length: 256 }),
  authId: varchar("auth_id", { length: 256 }).notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  roleId: integer("role_id")
    .notNull()
    .references(() => roles.id),
  subscriptionPlanId: integer("subscription_plan")
    .notNull()
    .references(() => subscriptionPlans.id),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  client: many(clients),
  invites: one(invites),
  subscriptionPlan: one(subscriptionPlans),
}));

export const roles = pgTable("roles", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 256 }).notNull(),
});

export const rolesRelations = relations(roles, ({ many }) => ({
  users: many(users),
}));

export const subscriptionPlans = pgTable("subscription_plans", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 256 }).notNull(),
});
