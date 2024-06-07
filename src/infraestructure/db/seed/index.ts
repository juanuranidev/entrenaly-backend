import { db } from "..";
import { eq } from "drizzle-orm";
import { roles } from "../schemas/user/user.schemas";
import { CustomError } from "../../../domain/errors/custom.error";
import {
  exercises,
  daysOfWeek,
  plansCategories,
  exercisesCategories,
  plansTypes,
} from "../schemas";
import {
  rolesSeed,
  exercisesSeed,
  daysOfWeekSeed,
  plansCategoriesSeed,
  exercisesCategoriesSeed,
  plansTypesSeed,
} from "./data";

async function createRoles() {
  try {
    for (const role of rolesSeed) {
      const [roleExist] = await db
        .select()
        .from(roles)
        .where(eq(roles.name, role.name));

      if (!roleExist) {
        await db.insert(roles).values(role);
      }
    }
  } catch (error) {
    throw CustomError.internalServer(`Error creating roles: ${error} 🚫`);
  }
  console.log("Roles created successfuly ✅");
}

async function createExercisesCategories() {
  try {
    for (const exerciseCategory of exercisesCategoriesSeed) {
      const [exerciseCategoryExist] = await db
        .select()
        .from(exercisesCategories)
        .where(eq(exercisesCategories.name, exerciseCategory.name));

      if (!exerciseCategoryExist) {
        await db.insert(exercisesCategories).values(exerciseCategory);
      }
    }
  } catch (error) {
    throw CustomError.internalServer(
      `Error creating exercises categories: ${error} 🚫`
    );
  }
  console.log("Exercises categories created successfuly ✅");
}

async function createExercises() {
  try {
    for (const exercise of exercisesSeed) {
      const [exerciseExist] = await db
        .select()
        .from(exercises)
        .where(eq(exercises.name, exercise.name));

      if (!exerciseExist) {
        const [exerciseCategory] = await db
          .select()
          .from(exercisesCategories)
          .where(eq(exercisesCategories.name, exercise.category));

        await db
          .insert(exercises)
          .values({ ...exercise, categoryId: exerciseCategory.id });
      }
    }
  } catch (error) {
    throw CustomError.internalServer(`Error creating exercises: ${error} 🚫`);
  }
  console.log("Exercises created successfuly ✅");
}

async function createPlanCategories() {
  try {
    for (const planCategory of plansCategoriesSeed) {
      const [planCategoryExist] = await db
        .select()
        .from(plansCategories)
        .where(eq(plansCategories.name, planCategory.name));

      if (!planCategoryExist) {
        await db.insert(plansCategories).values(planCategory);
      }
    }
  } catch (error) {
    throw CustomError.internalServer(
      `Error creating plans categories: ${error} 🚫`
    );
  }
  console.log("Plans categories created successfuly ✅");
}

async function createPlansTypes() {
  try {
    for (const planType of plansTypesSeed) {
      const [planTypeExist] = await db
        .select()
        .from(plansTypes)
        .where(eq(plansTypes.name, planType.name));

      if (!planTypeExist) {
        await db.insert(plansTypes).values(planType);
      }
    }
  } catch (error) {
    throw CustomError.internalServer(`Error creating plans types: ${error} 🚫`);
  }
  console.log("Plans types created successfuly ✅");
}

async function createDaysOfWeek() {
  try {
    for (const dayOfWeek of daysOfWeekSeed) {
      const [dayOfWeekExist] = await db
        .select()
        .from(daysOfWeek)
        .where(eq(daysOfWeek.name, dayOfWeek.name));

      if (!dayOfWeekExist) {
        await db.insert(daysOfWeek).values(dayOfWeek);
      }
    }
  } catch (error) {
    throw CustomError.internalServer(
      `Error creating days of week: ${error} 🚫`
    );
  }
  console.log("Days of week created successfuly ✅");
}

(async () => {
  await createRoles();
  await createExercisesCategories();
  await createExercises();
  await createPlanCategories();
  await createDaysOfWeek();
  await createPlansTypes();
  process.exit();
})();
