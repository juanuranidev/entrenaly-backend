import { db } from "..";
import { eq } from "drizzle-orm";
import { roles } from "../schemas/user/user.schemas";
import { CustomError } from "../../../domain/errors/custom.error";
import { exercises, exercisesCategories } from "../schemas";
import { exercisesCategoriesSeed, exercisesSeed, rolesSeed } from "./data";

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

      if (exerciseExist) {
        console.log(exerciseExist);
      }

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

(async () => {
  await createRoles();
  await createExercisesCategories();
  await createExercises();
  process.exit();
})();
