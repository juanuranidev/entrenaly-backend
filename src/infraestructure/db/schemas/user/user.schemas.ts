import {
  serial,
  varchar,
  integer,
  pgTable,
  timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: varchar("id", { length: 256 }).primaryKey().notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  image: varchar("image", { length: 256 }),
  authId: varchar("auth_id", { length: 256 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  roleId: integer("role_id")
    .notNull()
    .references(() => roles.id),
});

export const roles = pgTable("roles", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 256 }).notNull(),
});
