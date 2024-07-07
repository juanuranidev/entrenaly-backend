import { relations } from "drizzle-orm";
import {
  serial,
  varchar,
  integer,
  pgTable,
  boolean,
} from "drizzle-orm/pg-core";
import { users } from "../user/user.schemas";

export const exercises = pgTable("exercises", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  video: varchar("video", { length: 256 }),
  image: varchar("image", { length: 256 }),
  categoryId: integer("category_id")
    .notNull()
    .references(() => exercisesCategories.id),
  userId: varchar("user_id").references(() => users.id),
  isActive: boolean("is_active").notNull().default(true),
});

export const exercisesRelations = relations(exercises, ({ one }) => ({
  variant: one(variants, {
    fields: [exercises.id],
    references: [variants.exerciseId],
  }),
}));

export const variants = pgTable("variants", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  video: varchar("video", { length: 256 }),
  image: varchar("image", { length: 256 }),
  categoryId: integer("category_id")
    .notNull()
    .references(() => exercisesCategories.id),
  userId: varchar("user_id")
    .notNull()
    .references(() => users.id),
  exerciseId: integer("exercise_id")
    .notNull()
    .references(() => exercises.id),
  isActive: boolean("is_active").notNull().default(true),
});

export const exercisesCategories = pgTable("exercises_categories", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 256 }).notNull(),
});

export const exercisesCategoriesRelations = relations(
  exercises,
  ({ many }) => ({
    exercise: many(exercises, {
      relationName: "exercisesCategories",
    }),
  })
);

export const exercisesDescriptions = pgTable("exercises_descriptions", {
  id: serial("id").primaryKey().notNull(),
  description: varchar("description", { length: 256 }).notNull(),
  userId: varchar("user_id")
    .notNull()
    .references(() => users.id),
});
