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
  async readPlansTypes(): Promise<PlanTypeEntity[] | CustomError> {
    try {
      const plansTypesList = await db.select().from(plansTypes);

      return plansTypesList.map((planType: any) =>
        PlanTypeEntity.fromObject(planType)
      );
    } catch (error: any) {
      throw CustomError.internalServer(error);
    }
  }
  async readDaysOfWeek(): Promise<DayOfWeekEntity[] | CustomError> {
    try {
      const daysOfWeekList = await db.select().from(daysOfWeek);

      return daysOfWeekList.map((dayOfWeek: any) =>
        DayOfWeekEntity.fromObject(dayOfWeek)
      );
    } catch (error: any) {
      throw CustomError.internalServer(error);
    }
  }
  async readPlansCategories(): Promise<PlanCategoryEntity[] | CustomError> {
    try {
      const planCategoriesList = await db.select().from(plansCategories);

      return planCategoriesList.map((planCategory) =>
        PlanCategoryEntity.fromObject(planCategory)
      );
    } catch (error: any) {
      throw CustomError.internalServer(error);
    }
  }
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
    } catch (error: any) {
      console.log(error);
      throw CustomError.internalServer(error);
    }
  }
  async readPlansByUserId(userId: string): Promise<PlanEntity[] | CustomError> {
    try {
      const plansList = await db
        .select()
        .from(plans)
        .where(
          and(
            eq(plans.userId, userId),
            eq(plans.isActive, true),
            eq(plans.isActive, true)
          )
        )
        .orderBy(desc(plans.createdAt))
        .leftJoin(plansTypes, eq(plansTypes.id, plans.typeId))
        .leftJoin(plansCategories, eq(plansCategories.id, plans.categoryId));

      return plansList.map((plan: any) =>
        PlanEntity.fromObject({
          ...plan.plans,
          user: plan.plans.userId,
          category: plan.plans_categories.name,
          type: plan.plans_types.name,
        })
      );
    } catch (error: any) {
      throw CustomError.internalServer(error);
    }
  }
  async readPlansByClientId(
    clientId: string
  ): Promise<PlanEntity[] | CustomError> {
    try {
      const [clientFound] = await db
        .select()
        .from(clients)
        .where(and(eq(clients.id, clientId)));

      const clientPlans = await db
        .select()
        .from(clientsPlans)
        .where(
          and(
            eq(clientsPlans.clientId, clientFound.id),
            eq(plans.isActive, true)
          )
        )
        .leftJoin(plans, eq(plans.id, clientsPlans.planId))
        .leftJoin(plansTypes, eq(plansTypes.id, plans.typeId))
        .leftJoin(plansCategories, eq(plansCategories.id, plans.categoryId));

      return clientPlans.map((plan: any) =>
        PlanEntity.fromObject({
          ...plan.plans,
          user: plan.plans.userId,
          category: plan.plans_categories.name,
          type: plan.plans_types.name,
        })
      );
    } catch (error: any) {
      throw CustomError.internalServer(error);
    }
  }
  async readWeeklyPlan(planId: string): Promise<PlanEntity | CustomError> {
    try {
      const [planFound] = await db
        .select({
          id: plans.id,
          name: plans.name,
          type: plansTypes,
          category: plansCategories,
          createdAt: plans.createdAt,
        })
        .from(plans)
        .where(and(eq(plans.id, planId), eq(plans.isActive, true)))
        .leftJoin(plansTypes, eq(plansTypes.id, plans.typeId))
        .leftJoin(plansCategories, eq(plansCategories.id, plans.categoryId));

      const clientsPlansList: any = await db
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
          and(eq(plansDays.planId, planFound.id), eq(plans.isActive, true))
        )
        .leftJoin(daysOfWeek, eq(daysOfWeek.id, plansDays.dayOfWeekId))
        .leftJoin(
          plansExercises,
          and(
            eq(plansExercises.planDayId, plansDays.id),
            eq(plans.isActive, true)
          )
        )
        .leftJoin(
          exercises,
          and(
            eq(exercises.id, plansExercises.exerciseId),
            eq(plans.isActive, true)
          )
        )
        .leftJoin(
          variants,
          and(
            eq(variants.exerciseId, plansExercises.exerciseId),
            eq(plans.isActive, true)
          )
        )
        .leftJoin(
          plansCategories,
          eq(plansCategories.id, exercises.categoryId)
        );

      const exercisesByDay: any = [];

      planDaysList.forEach((exercise: any) => {
        const { dayOfWeekId } = exercise;

        const existingDay = exercisesByDay.find(
          (day: any) => day.dayOfWeekId === dayOfWeekId
        );

        if (existingDay) {
          existingDay.exercises.push({
            exerciseId: exercise.exerciseId,
            exerciseName: exercise.exerciseName,
            exerciseVideo: exercise.exerciseVideo,
            exerciseImage: exercise.exerciseImage,
            exerciseVariant: exercise.exerciseVariant,
            exerciseDescription: exercise.exerciseDescription,
          });
        } else {
          exercisesByDay.push({
            dayOfWeekId: exercise.dayOfWeekId,
            dayOfWeekName: exercise.dayOfWeekName,
            dayOfWeekOrder: exercise.dayOfWeekOrder,
            plansDaysId: exercise.plansDaysId,
            exercises: [
              {
                exerciseId: exercise.exerciseId,
                exerciseName: exercise.exerciseName,
                exerciseVideo: exercise.exerciseVideo,
                exerciseImage: exercise.exerciseImage,
                exerciseVariant: exercise.exerciseVariant,
                exerciseDescription: exercise.exerciseDescription,
              },
            ],
          });
        }
      });

      return PlanEntity.fromObject({
        ...planFound,
        days: exercisesByDay,
        clients: clientsPlansList.map((client: any) => client.id),
      });
    } catch (error: any) {
      console.log(error);
      throw CustomError.internalServer(error);
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
    } catch (error: any) {
      console.log(error);
      throw CustomError.internalServer(error);
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
    } catch (error: any) {
      console.log(error);
      throw CustomError.internalServer(error);
    }
  }
}
