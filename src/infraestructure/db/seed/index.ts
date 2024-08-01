import { db } from "..";
import { eq } from "drizzle-orm";
import { CustomError } from "../../../domain/errors/custom.error";
import {
  appReleases,
  roles,
  subscriptionPlans,
} from "../schemas/user/user.schemas";
import {
  exercises,
  daysOfWeek,
  plansTypes,
  plansCategories,
  exercisesCategories,
} from "../schemas";
import {
  rolesSeed,
  exercisesSeed,
  daysOfWeekSeed,
  plansTypesSeed,
  appReleasesSeed,
  plansCategoriesSeed,
  subscriptionPlansSeed,
  exercisesCategoriesSeed,
} from "./data";

async function createRoles(tx: typeof db = db) {
  try {
    for (const role of rolesSeed) {
      const [roleExist] = await tx
        .select()
        .from(roles)
        .where(eq(roles.name, role.name));

      if (!roleExist) {
        await tx.insert(roles).values(role);
      }
    }
  } catch (error) {
    throw CustomError.internalServer(`Error creating roles. ${error} 🚫`);
  }
  console.log("Roles created successfuly ✅");
}

async function createSubscriptionPlans(tx: typeof db = db) {
  try {
    for (const subscriptionPlan of subscriptionPlansSeed) {
      const [subscriptionPlanExist] = await tx
        .select()
        .from(subscriptionPlans)
        .where(eq(subscriptionPlans.name, subscriptionPlan.name));

      if (!subscriptionPlanExist) {
        await tx.insert(subscriptionPlans).values(subscriptionPlan);
      }
    }
  } catch (error) {
    throw CustomError.internalServer(
      `Error creating subscription plans. ${error} 🚫`
    );
  }
  console.log("Subscription plans created successfuly ✅");
}

async function createAppReleases(tx: typeof db = db) {
  try {
    for (const appRelease of appReleasesSeed) {
      const [appReleaseExist] = await tx
        .select()
        .from(appReleases)
        .where(eq(appReleases.version, appRelease.version));

      if (!appReleaseExist) {
        await tx.insert(appReleases).values(appRelease);
      }
    }
  } catch (error) {
    throw CustomError.internalServer(
      `Error creating app releases. ${error} 🚫`
    );
  }
  console.log("App releases plans created successfuly ✅");
}

async function createExercisesCategories(tx: typeof db = db) {
  try {
    for (const exerciseCategory of exercisesCategoriesSeed) {
      const [exerciseCategoryExist] = await tx
        .select()
        .from(exercisesCategories)
        .where(eq(exercisesCategories.name, exerciseCategory.name));

      if (!exerciseCategoryExist) {
        await tx.insert(exercisesCategories).values(exerciseCategory);
      }
    }
  } catch (error) {
    throw CustomError.internalServer(
      `Error creating exercises categories. ${error} 🚫`
    );
  }
  console.log("Exercises categories created successfuly ✅");
}

async function createExercises(tx: typeof db = db) {
  try {
    for (const exercise of exercisesSeed) {
      const [exerciseExist] = await tx
        .select()
        .from(exercises)
        .where(eq(exercises.name, exercise.name));

      if (!exerciseExist) {
        const [exerciseCategory] = await tx
          .select()
          .from(exercisesCategories)
          .where(eq(exercisesCategories.name, exercise.category));

        await tx
          .insert(exercises)
          .values({ ...exercise, categoryId: exerciseCategory.id });
      }
    }
  } catch (error) {
    throw CustomError.internalServer(`Error creating exercises. ${error} 🚫`);
  }
  console.log("Exercises created successfuly ✅");
}

async function createPlanCategories(tx: typeof db = db) {
  try {
    for (const planCategory of plansCategoriesSeed) {
      const [planCategoryExist] = await tx
        .select()
        .from(plansCategories)
        .where(eq(plansCategories.name, planCategory.name));

      if (!planCategoryExist) {
        await tx.insert(plansCategories).values(planCategory);
      }
    }
  } catch (error) {
    throw CustomError.internalServer(
      `Error creating plans categories. ${error} 🚫`
    );
  }
  console.log("Plans categories created successfuly ✅");
}

async function createPlansTypes(tx: typeof db = db) {
  try {
    for (const planType of plansTypesSeed) {
      const [planTypeExist] = await tx
        .select()
        .from(plansTypes)
        .where(eq(plansTypes.name, planType.name));

      if (!planTypeExist) {
        await tx.insert(plansTypes).values(planType);
      }
    }
  } catch (error) {
    throw CustomError.internalServer(`Error creating plans types. ${error} 🚫`);
  }
  console.log("Plans types created successfuly ✅");
}

async function createDaysOfWeek(tx: typeof db = db) {
  try {
    for (const dayOfWeek of daysOfWeekSeed) {
      const [dayOfWeekExist] = await tx
        .select()
        .from(daysOfWeek)
        .where(eq(daysOfWeek.name, dayOfWeek.name));

      if (!dayOfWeekExist) {
        await tx.insert(daysOfWeek).values(dayOfWeek);
      }
    }
  } catch (error) {
    throw CustomError.internalServer(
      `Error creating days of week. ${error} 🚫`
    );
  }
  console.log("Days of week created successfuly ✅");
}

(async () => {
  await db.transaction(async (tx: typeof db) => {
    await createRoles(tx);
    await createSubscriptionPlans(tx);
    await createAppReleases(tx);
    await createExercisesCategories(tx);
    await createExercises(tx);
    await createPlanCategories(tx);
    await createDaysOfWeek(tx);
    await createPlansTypes(tx);
  });
  process.exit();
})();
