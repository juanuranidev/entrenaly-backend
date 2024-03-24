import { relations } from "drizzle-orm";
import {
  serial,
  varchar,
  integer,
  pgTable,
  timestamp,
  primaryKey,
} from "drizzle-orm/pg-core";

export const exercises = pgTable("exercises", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  video: varchar("video", { length: 256 }).notNull(),
  categoryId: integer("category_id")
    .notNull()
    .references(() => exercisesCategories.id),
});

export const exercisesRelations = relations(exercises, ({ many }) => ({
  exercisesToVariants: many(exercisesToVariants),
}));

export const variants = pgTable("variants", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  video: varchar("video", { length: 256 }).notNull(),
  categoryId: integer("category_id")
    .notNull()
    .references(() => exercisesCategories.id),
});

export const variantsRelations = relations(variants, ({ many }) => ({
  exercisesToVariants: many(exercisesToVariants),
}));

export const exercisesToVariants = pgTable(
  "exercises_to_variants",
  {
    exerciseId: integer("exercise_id")
      .notNull()
      .references(() => exercises.id),
    variantId: integer("variant_id")
      .notNull()
      .references(() => variants.id),
  },
  (table) => ({
    pk: primaryKey(table.exerciseId, table.variantId),
  })
);

export const exercisesToVariantsRelations = relations(
  exercisesToVariants,
  ({ one }) => ({
    exercise: one(exercises, {
      fields: [exercisesToVariants.exerciseId],
      references: [exercises.id],
    }),
    exerciseVariant: one(variants, {
      fields: [exercisesToVariants.variantId],
      references: [variants.id],
    }),
  })
);

export const exercisesCategories = pgTable("exercises_categories", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 256 }).notNull(),
});
