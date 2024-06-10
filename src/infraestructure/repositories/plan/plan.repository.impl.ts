import {
  plans,
  users,
  clients,
  exercises,
  plansDays,
  daysOfWeek,
  plansTypes,
  clientsPlans,
  plansExercises,
  plansCategories,
  variants,
} from "../../db/schemas";
import { CreateWeeklyPlanDto } from "../../../domain/dtos/plan/create-weekly-plan.dto";
import { UpdateWeeklyPlanDto } from "../../../domain/dtos/plan/update-weekly-plan.dto";
import { PlanCategoryEntity } from "../../../domain/entities/plan/plan-category.entity";
import { PLANS_CONSTANTS } from "../../../domain/constants/plan/plan.constants";
import { DayOfWeekEntity } from "../../../domain/entities/plan/day-of-week.entity";
import { PlanRepository } from "../../../domain/repositories/plan/plan.repository";
import { PlanTypeEntity } from "../../../domain/entities/plan/plan-type.entity";
import { and, desc, eq } from "drizzle-orm";
import { CustomError } from "../../../domain/errors/custom.error";
import { uuidAdapter } from "../../../config/adapters/uuid.adapter";
import { PlanEntity } from "../../../domain/entities/plan/plan.entity";
import { db } from "../../db";

export class PlanRepositoryImpl implements PlanRepository {
  async createWeeklyPlan(
    createWeeklyPlanDto: CreateWeeklyPlanDto
  ): Promise<PlanEntity | CustomError> {
    try {
      return await db.transaction(async (tx) => {
        const [planTypeFound] = await tx
          .select()
          .from(plansTypes)
          .where(eq(plansTypes.name, PLANS_CONSTANTS.TYPES.WEEKLY));

        const planUuid = uuidAdapter.generate();
        const [planCreated] = await tx
          .insert(plans)
          .values({
            id: planUuid,
            typeId: planTypeFound.id,
            name: createWeeklyPlanDto.name,
            userId: createWeeklyPlanDto.trainerId,
            categoryId: createWeeklyPlanDto.categoryId,
          })
          .returning();

        for (const day of createWeeklyPlanDto.days) {
          const [planDayCreated] = await tx
            .insert(plansDays)
            .values({
              planId: planCreated?.id,
              dayOfWeekId: day.dayOfWeekId,
            })
            .returning();

          for (const exercise of day.exercises) {
            await tx
              .insert(plansExercises)
              .values({
                planDayId: planDayCreated.id,
                exerciseId: exercise.id,
                description: exercise.description,
              })
              .returning();
          }
        }

        for (const client of createWeeklyPlanDto.clientsIds) {
          await tx
            .insert(clientsPlans)
            .values({
              planId: planCreated.id,
              clientId: client,
            })
            .returning();
        }

        return PlanEntity.fromObject({
          ...planCreated,
          type: planCreated?.typeId,
          category: planCreated?.categoryId,
        });
      });
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async readPlansTypes(): Promise<PlanTypeEntity[] | CustomError> {
    try {
      const plansTypesList = await db.select().from(plansTypes);

      return plansTypesList.map((planType) =>
        PlanTypeEntity.fromObject(planType)
      );
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async readDaysOfWeek(): Promise<DayOfWeekEntity[] | CustomError> {
    try {
      const daysOfWeekList = await db.select().from(daysOfWeek);

      return daysOfWeekList.map((dayOfWeek: any) =>
        DayOfWeekEntity.fromObject(dayOfWeek)
      );
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async readPlansCategories(): Promise<PlanCategoryEntity[] | CustomError> {
    try {
      const planCategoriesList = await db.select().from(plansCategories);

      return planCategoriesList.map((planCategory) =>
        PlanCategoryEntity.fromObject(planCategory)
      );
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async readPlansByUserId(userId: string): Promise<PlanEntity[] | CustomError> {
    try {
      const plansList = await db
        .select({
          plan: plans,
          category: plansCategories,
          type: plansTypes,
        })
        .from(plans)
        .where(and(eq(plans.userId, userId), eq(plans.isActive, true)))
        .orderBy(desc(plans.createdAt))
        .leftJoin(plansTypes, eq(plansTypes.id, plans.typeId))
        .leftJoin(plansCategories, eq(plansCategories.id, plans.categoryId));

      return plansList.map((plan: any) =>
        PlanEntity.fromObject({
          ...plan.plan,
          category: plan.category,
          type: plan.type,
        })
      );
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async readPlansByClientId(
    clientId: string
  ): Promise<PlanEntity[] | CustomError> {
    try {
      const plansList = await db
        .select({
          mainInfo: plans,
          category: plansCategories,
          type: plansTypes,
        })
        .from(clientsPlans)
        .where(
          and(
            eq(clientsPlans.clientId, clientId),
            eq(clientsPlans.isActive, true)
          )
        )
        .leftJoin(plans, eq(plans.id, clientsPlans.planId))
        .leftJoin(plansTypes, eq(plansTypes.id, plans.typeId))
        .leftJoin(plansCategories, eq(plansCategories.id, plans.categoryId));

      return plansList.map((plan: any) =>
        PlanEntity.fromObject({
          ...plan.mainInfo,
          category: plan.category,
          type: plan.type,
        })
      );
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async readWeeklyPlan(planId: string): Promise<PlanEntity | CustomError> {
    try {
      const [planFound] = await db
        .select({
          id: plans.id,
          name: plans.name,
          type: plansTypes,
          userId: plans.userId,
          category: plansCategories,
          createdAt: plans.createdAt,
        })
        .from(plans)
        .where(and(eq(plans.id, planId), eq(plans.isActive, true)))
        .leftJoin(plansTypes, eq(plansTypes.id, plans.typeId))
        .leftJoin(plansCategories, eq(plansCategories.id, plans.categoryId));

      const clientsPlansList = await db
        .select({ id: clientsPlans.clientId })
        .from(clientsPlans)
        .where(eq(clientsPlans.planId, planFound.id));

      const planDaysList = await db
        .select({
          exerciseId: exercises.id,
          exerciseVariant: variants,
          category: plansCategories,
          plansDaysId: plansDays.id,
          dayOfWeekId: daysOfWeek.id,
          exerciseName: exercises.name,
          exerciseImage: exercises.image,
          exerciseVideo: exercises.video,
          dayOfWeekName: daysOfWeek.name,
          dayOfWeekOrder: daysOfWeek.order,
          exerciseDescription: plansExercises.description,
        })
        .from(plansDays)
        .where(
          and(eq(plansDays.planId, planFound.id), eq(plansDays.isActive, true))
        )
        .leftJoin(daysOfWeek, eq(daysOfWeek.id, plansDays.dayOfWeekId))
        .leftJoin(
          plansExercises,
          and(
            eq(plansExercises.isActive, true),
            eq(plansExercises.planDayId, plansDays.id)
          )
        )
        .leftJoin(
          exercises,
          and(
            eq(exercises.isActive, true),
            eq(exercises.id, plansExercises.exerciseId)
          )
        )
        .leftJoin(
          variants,
          and(
            eq(variants.isActive, true),
            eq(variants.exerciseId, plansExercises.exerciseId),
            eq(variants.userId, planFound.userId)
          )
        )
        .leftJoin(
          plansCategories,
          eq(plansCategories.id, exercises.categoryId)
        );

      const exercisesByDay: any = {};
      planDaysList.forEach((exercise: any) => {
        const { dayOfWeekId, dayOfWeekName, dayOfWeekOrder, plansDaysId } =
          exercise;

        if (!exercisesByDay[dayOfWeekId]) {
          exercisesByDay[dayOfWeekId] = {
            dayOfWeekId,
            dayOfWeekName,
            dayOfWeekOrder,
            plansDaysId,
            exercises: [],
          };
        }

        exercisesByDay[dayOfWeekId].exercises.unshift({
          exerciseId: exercise.exerciseId,
          exerciseName: exercise.exerciseName,
          exerciseVideo: exercise.exerciseVideo,
          exerciseImage: exercise.exerciseImage,
          exerciseVariant: exercise.exerciseVariant,
          exerciseDescription: exercise.exerciseDescription,
          hasVariant: Boolean(exercise.exerciseVariant),
        });
      });

      const formattedExercisesByDay = Object.values(exercisesByDay);

      return PlanEntity.fromObject({
        ...planFound,
        days: formattedExercisesByDay,
        clients: clientsPlansList.map((client: any) => client.id),
      });
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async updateWeeklyPlan(
    updateWeeklyPlanDto: UpdateWeeklyPlanDto
  ): Promise<PlanEntity | CustomError> {
    try {
      return await db.transaction(async (tx) => {
        const [planUpdated] = await tx
          .update(plans)
          .set({
            name: updateWeeklyPlanDto.name,
            categoryId: updateWeeklyPlanDto.categoryId,
          })
          .where(eq(plans.id, updateWeeklyPlanDto.planId))
          .returning();

        const plansDaysList = await tx
          .select({ id: plansDays.id })
          .from(plansDays)
          .where(eq(plansDays.planId, planUpdated.id));

        for (const day of plansDaysList) {
          await tx
            .update(plansExercises)
            .set({ isActive: false })
            .where(eq(plansExercises.planDayId, day?.id));

          await tx
            .update(plansDays)
            .set({ isActive: false })
            .where(eq(plansDays.id, day?.id));
        }

        for (const day of updateWeeklyPlanDto.days) {
          const [dayOfWeekFound] = await tx
            .select()
            .from(daysOfWeek)
            .where(eq(daysOfWeek.id, day.dayOfWeekId));

          const [planDayCreated] = await tx
            .insert(plansDays)
            .values({
              planId: planUpdated?.id,
              dayOfWeekId: dayOfWeekFound.id,
            })
            .returning();

          for (const exercise of day.exercises) {
            const [exerciseFound] = await tx
              .select()
              .from(exercises)
              .where(eq(exercises.id, exercise.id));

            await tx
              .insert(plansExercises)
              .values({
                planDayId: planDayCreated.id,
                exerciseId: exerciseFound.id,
                description: exercise.description,
              })
              .returning();
          }
        }

        const allClientsPlans: { id: string }[] = await tx
          .select({ id: clientsPlans.clientId })
          .from(clientsPlans)
          .where(eq(clientsPlans.planId, planUpdated.id));

        for (const client of allClientsPlans) {
          await tx
            .update(clientsPlans)
            .set({ isActive: false })
            .where(
              and(
                eq(clientsPlans.clientId, client.id),
                eq(clientsPlans.planId, planUpdated.id)
              )
            );
        }

        for (const client of updateWeeklyPlanDto.clientsIds) {
          await tx
            .insert(clientsPlans)
            .values({
              planId: planUpdated.id,
              clientId: client,
            })
            .returning();
        }

        for (const client of updateWeeklyPlanDto.clientsIds) {
          await tx.insert(clientsPlans).values({
            planId: planUpdated.id,
            clientId: client,
          });
        }

        return PlanEntity.fromObject({
          ...planUpdated,
          type: planUpdated?.typeId,
          category: planUpdated?.categoryId,
        });
      });
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async deleteWeeklyPlan(
    planId: string,
    userId: string
  ): Promise<PlanEntity | CustomError> {
    try {
      return await db.transaction(async (tx) => {
        const [planUpdated] = await tx
          .update(plans)
          .set({ isActive: false })
          .where(and(eq(plans.id, planId), eq(plans.userId, userId)))
          .returning();

        const plansDaysList = await tx
          .select({ id: plansDays.id })
          .from(plansDays)
          .where(eq(plansDays.planId, planUpdated.id));

        for (const day of plansDaysList) {
          await tx
            .update(plansExercises)
            .set({ isActive: false })
            .where(eq(plansExercises.planDayId, day?.id));

          await tx
            .update(plansDays)
            .set({ isActive: false })
            .where(eq(plansDays.id, day?.id));
        }

        const allClientsPlans: { id: string }[] = await tx
          .select({ id: clientsPlans.clientId })
          .from(clientsPlans)
          .where(eq(clientsPlans.planId, planUpdated.id));

        for (const client of allClientsPlans) {
          await tx
            .update(clientsPlans)
            .set({ isActive: false })
            .where(
              and(
                eq(clientsPlans.clientId, client.id),
                eq(clientsPlans.planId, planUpdated.id)
              )
            );
        }

        return PlanEntity.fromObject(planUpdated);
      });
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
