import {
  plans,
  variants,
  exercises,
  plansDays,
  daysOfWeek,
  plansTypes,
  clientsPlans,
  plansExercises,
  plansCategories,
  exercisesCategories,
  daysCircuit,
} from "../../db/schemas";
import { ExerciseCategoryEntity } from "../../../domain/entities/exercise/exercise-category.entity";
import { UpdateCircuitPlanDto } from "../../../domain/dtos/plan/update-circuit-plan.dto";
import { CreateCircuitPlanDto } from "../../../domain/dtos/plan/create-circuit-plan.dto";
import { CreateWeeklyPlanDto } from "../../../domain/dtos/plan/create-weekly-plan.dto";
import { UpdateWeeklyPlanDto } from "../../../domain/dtos/plan/update-weekly-plan.dto";
import { PlanCategoryEntity } from "../../../domain/entities/plan/plan-category.entity";
import { PLANS_CONSTANTS } from "../../../domain/constants/plan/plan.constants";
import { DayOfWeekEntity } from "../../../domain/entities/plan/day-of-week.entity";
import { PlanRepository } from "../../../domain/repositories/plan/plan.repository";
import { PlanTypeEntity } from "../../../domain/entities/plan/plan-type.entity";
import { ExerciseEntity } from "../../../domain/entities/exercise/exercise.entity";
import { PlanDayEntity } from "../../../domain/entities/plan/plan-day.entity";
import { VariantEntity } from "../../../domain/entities/exercise/variant.entity";
import { and, desc, eq } from "drizzle-orm";
import { CustomError } from "../../../domain/errors/custom.error";
import { uuidAdapter } from "../../../config/adapters/uuid.adapter";
import { PlanEntity } from "../../../domain/entities/plan/plan.entity";
import { db } from "../../db";
import { PlanCircuitEntity } from "../../../domain/entities/plan/plan-circuit.entity";

export class PlanRepositoryImpl implements PlanRepository {
  async createWeeklyPlan(
    createWeeklyPlanDto: CreateWeeklyPlanDto
  ): Promise<PlanEntity> {
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
              dayOfWeekId: day.dayOfWeek?.id,
            })
            .returning();

          for (const exercise of day.exercises) {
            await tx
              .insert(plansExercises)
              .values({
                planDayId: planDayCreated.id,
                exerciseId: exercise.id,
                description: exercise.description,
                superset: exercise.superset,
              })
              .returning();
          }
        }

        for (const client of createWeeklyPlanDto.clients) {
          await tx
            .insert(clientsPlans)
            .values({
              planId: planCreated.id,
              clientId: client.id,
            })
            .returning();
        }

        const [planCategoryFound] = await tx
          .select()
          .from(plansCategories)
          .where(eq(plansCategories.id, planCreated.categoryId));

        return PlanEntity.create({
          ...planCreated,
          type: PlanTypeEntity.create(planTypeFound),
          category: PlanCategoryEntity.create(planCategoryFound),
        });
      });
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async createCircuitPlan(
    createCircuitPlanDto: CreateCircuitPlanDto
  ): Promise<PlanEntity> {
    try {
      return await db.transaction(async (tx) => {
        const [planTypeFound] = await tx
          .select()
          .from(plansTypes)
          .where(eq(plansTypes.name, PLANS_CONSTANTS.TYPES.CIRCUIT));

        const planUuid = uuidAdapter.generate();
        const [planCreated] = await tx
          .insert(plans)
          .values({
            id: planUuid,
            typeId: planTypeFound.id,
            name: createCircuitPlanDto.name,
            userId: createCircuitPlanDto.trainerId,
            categoryId: createCircuitPlanDto.categoryId,
          })
          .returning();

        for (const day of createCircuitPlanDto.days) {
          const [planDayCreated] = await tx
            .insert(plansDays)
            .values({
              planId: planCreated?.id,
              dayOfWeekId: day.dayOfWeek?.id,
            })
            .returning();

          for (const circuit of day.circuits) {
            const [circuitCreated] = await tx
              .insert(daysCircuit)
              .values({
                description: circuit.description,
                order: circuit.order,
                planDayId: planDayCreated.id,
              })
              .returning();

            for (const exercise of circuit.exercises) {
              await tx
                .insert(plansExercises)
                .values({
                  exerciseId: exercise.id,
                  description: exercise.description,
                  superset: exercise.superset,
                  planCircuitId: circuitCreated.id,
                })
                .returning();
            }
          }
        }

        for (const client of createCircuitPlanDto.clients) {
          await tx
            .insert(clientsPlans)
            .values({
              planId: planCreated.id,
              clientId: client.id,
            })
            .returning();
        }

        const [planCategoryFound] = await tx
          .select()
          .from(plansCategories)
          .where(eq(plansCategories.id, planCreated.categoryId));

        return PlanEntity.create({
          ...planCreated,
          type: PlanTypeEntity.create(planTypeFound),
          category: PlanCategoryEntity.create(planCategoryFound),
        });
      });
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async readPlansTypes(): Promise<PlanTypeEntity[]> {
    try {
      const plansTypesList = await db.select().from(plansTypes);

      return plansTypesList.map((planType) => PlanTypeEntity.create(planType));
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async readDaysOfWeek(): Promise<DayOfWeekEntity[]> {
    try {
      const daysOfWeekList = await db.select().from(daysOfWeek);

      return daysOfWeekList.map((dayOfWeek: any) =>
        DayOfWeekEntity.create(dayOfWeek)
      );
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async readPlansCategories(): Promise<PlanCategoryEntity[]> {
    try {
      const planCategoriesList = await db.select().from(plansCategories);

      return planCategoriesList.map((planCategory) =>
        PlanCategoryEntity.create(planCategory)
      );
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async readPlansByUserId(userId: string): Promise<PlanEntity[]> {
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
        PlanEntity.create({
          ...plan.plan,
          category: PlanCategoryEntity.create(plan.category),
          type: PlanTypeEntity.create(plan.type),
        })
      );
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async readPlansByClientId(clientId: string): Promise<PlanEntity[]> {
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
        PlanEntity.create({
          ...plan.mainInfo,
          category: PlanCategoryEntity.create(plan.category),
          type: PlanTypeEntity.create(plan.type),
        })
      );
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async readWeeklyPlan(planId: string): Promise<PlanEntity> {
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
        .where(
          and(
            eq(clientsPlans.planId, planFound.id),
            eq(clientsPlans.isActive, true)
          )
        );

      const planDaysList = await db
        .select({
          id: plansDays.id,
          dayOfWeek: daysOfWeek,
          exercises: exercises,
          variants: variants,
          exercisesCategories: exercisesCategories,
          description: plansExercises.description,
          superset: plansExercises.superset,
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
        .leftJoin(plansCategories, eq(plansCategories.id, exercises.categoryId))
        .leftJoin(
          exercisesCategories,
          eq(exercisesCategories.id, exercises.categoryId)
        );

      const exercisesByDay: any = {};
      planDaysList.forEach((planDay: any) => {
        const {
          variants,
          superset,
          dayOfWeek,
          exercises,
          description,
          exercisesCategories,
        } = planDay;
        if (!exercisesByDay[dayOfWeek.id]) {
          exercisesByDay[dayOfWeek.id] = {
            dayOfWeek: DayOfWeekEntity.create(dayOfWeek),
            exercises: [],
          };
        }

        exercisesByDay[dayOfWeek.id].exercises.unshift({
          ...(exercises
            ? ExerciseEntity.create({
              ...exercises,
              category: ExerciseCategoryEntity.create(exercisesCategories),
              variant: variants
                ? VariantEntity.create({
                  ...variants,
                  category:
                    ExerciseCategoryEntity.create(exercisesCategories),
                })
                : null,
            })
            : null),
          description: description,
          hasVariant: Boolean(variants),
          superset: superset,
        });
      });

      const formattedExercisesByDay = Object.values(exercisesByDay).map(
        (day: any) =>
          PlanDayEntity.create({
            id: day.dayOfWeek.id,
            planId: planFound.id,
            dayOfWeek: DayOfWeekEntity.create(day.dayOfWeek),
            exercises: day.exercises,
          })
      );
      return PlanEntity.create({
        ...planFound,
        category: PlanCategoryEntity.create(planFound.category!),
        type: PlanTypeEntity.create(planFound.type!),
        days: formattedExercisesByDay,
        clients: clientsPlansList.map((client: any) => client.id),
      });
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async readCircuitPlan(planId: string): Promise<PlanEntity> {
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
        .select({ clientId: clientsPlans.clientId })
        .from(clientsPlans)
        .where(
          and(
            eq(clientsPlans.planId, planFound.id),
            eq(clientsPlans.isActive, true)
          )
        );

      const planDaysList = await db
        .select({
          planDayId: plansDays.id,
          dayOfWeek: daysOfWeek,
          circuitId: daysCircuit.id,
          circuit: daysCircuit,
          exercises: exercises,
          variants: variants,
          exercisesCategories: exercisesCategories,
          exerciseDescription: plansExercises.description,
        })
        .from(plansDays)
        .leftJoin(daysOfWeek, eq(plansDays.dayOfWeekId, daysOfWeek.id))
        .leftJoin(daysCircuit, eq(plansDays.id, daysCircuit.planDayId))
        .leftJoin(
          plansExercises,
          and(
            eq(plansExercises.isActive, true),
            eq(plansExercises.planCircuitId, daysCircuit.id)
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
        .leftJoin(plansCategories, eq(plansCategories.id, exercises.categoryId))
        .leftJoin(
          exercisesCategories,
          eq(exercisesCategories.id, exercises.categoryId)
        )
        .where(
          and(eq(plansDays.planId, planFound.id), eq(plansDays.isActive, true))
        );

      let circuitsByDay: any = {};

      planDaysList.forEach((planDay: any) => {
        const {
          circuit,
          planDayId,
          dayOfWeek,
          exercises,
          variants,
          exerciseDescription,
          exercisesCategories,
        } = planDay;

        if (!circuitsByDay[planDayId]) {
          circuitsByDay[planDayId] = {
            dayOfWeek: dayOfWeek,
            planDayId: planDayId,
            circuits: [],
          };
        }

        if (circuit?.id) {
          let existingCircuit = circuitsByDay[planDayId].circuits.find(
            (obj: any) => obj.id === circuit.id
          );

          if (!existingCircuit) {
            existingCircuit = {
              ...circuit,
              exercises: [],
            };
            circuitsByDay[planDayId].circuits.unshift(existingCircuit);
          }

          if (exercises) {
            existingCircuit.exercises.unshift({
              ...ExerciseEntity.create({
                ...exercises,
                category: ExerciseCategoryEntity.create(exercisesCategories),
                variant: variants
                  ? VariantEntity.create({
                    ...variants,
                    category:
                      ExerciseCategoryEntity.create(exercisesCategories),
                  })
                  : null,
                description: exerciseDescription,
              }),
              hasVariant: Boolean(variants),
            });
          }
        }
      });

      circuitsByDay = Object.values(circuitsByDay).map((day: any) => {
        return PlanDayEntity.create({
          ...day,
          id: day.planDayId,
          planId: planFound.id,
          exercises: [],
          dayOfWeek: DayOfWeekEntity.create(day.dayOfWeek),
          circuits: day.circuits.map((circuit: any) =>
            PlanCircuitEntity.create(circuit)
          ),
        });
      });

      // // Buscar los ejercicios asociados a cada circuito
      // const planExercisesList = await db
      //   .select({
      //     planDayId: plansExercises.planDayId,
      //     planCircuitId: plansExercises.planCircuitId,
      //     exerciseId: plansExercises.exerciseId,
      //     description: plansExercises.description,
      //     superset: plansExercises.superset,
      //   })
      //   .from(plansExercises)
      //   .leftJoin(exercises, eq(exercises.id, plansExercises.exerciseId))
      //   .leftJoin(plansDays, eq(plansExercises.planDayId, plansDays.id))
      //   .leftJoin(daysCircuit, eq(plansExercises.planCircuitId, daysCircuit.id))
      //   .where(
      //     and(
      //       eq(plansDays.planId, planFound.id),
      //       eq(plansDays.isActive, true),
      //       eq(plansExercises.isActive, true)
      //     )
      //   );

      // // Agregar los ejercicios a sus respectivos circuitos
      // planExercisesList.forEach((exercise) => {
      //   const { planDayId, planCircuitId, exerciseId, description, superset } =
      //     exercise;

      //   if (circuitsByDay[planDayId!]) {
      //     const circuit = circuitsByDay[planDayId!].circuits.find(
      //       (c) => c.id === planCircuitId
      //     );

      //     if (circuit) {
      //       circuit.exercises.push({
      //         id: exerciseId,
      //         description,
      //         superset,
      //         // Otros campos del ejercicio pueden ser añadidos aquí
      //       });
      //     }
      //   }
      // });

      // // Formatear los resultados
      // const formattedDays = Object.values(circuitsByDay).map((day) => ({
      //   id: day.dayOfWeek.id,
      //   planId: planFound.id,
      //   dayOfWeek: day.dayOfWeek,
      //   circuits: day.circuits,
      // }));

      return PlanEntity.create({
        id: planFound.id,
        name: planFound.name,
        createdAt: planFound.createdAt,
        clients: clientsPlansList.map((client) => client.clientId),
        type: PlanTypeEntity.create(planFound.type!),
        category: PlanCategoryEntity.create(planFound.category!),
        days: circuitsByDay,
      });
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async updateWeeklyPlan(
    updateWeeklyPlanDto: UpdateWeeklyPlanDto
  ): Promise<PlanEntity> {
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
            .where(eq(daysOfWeek.id, day.dayOfWeek?.id));

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
                superset: exercise.superset,
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

        for (const client of updateWeeklyPlanDto.clients) {
          await tx.insert(clientsPlans).values({
            planId: planUpdated.id,
            clientId: client.id,
          });
        }

        const [planTypeFound] = await tx
          .select()
          .from(plansTypes)
          .where(eq(plansTypes.id, planUpdated.typeId));

        const [planCategoryFound] = await tx
          .select()
          .from(plansCategories)
          .where(eq(plansCategories.id, planUpdated.categoryId));

        return PlanEntity.create({
          ...planUpdated,
          category: PlanCategoryEntity.create(planCategoryFound),
          type: PlanTypeEntity.create(planTypeFound),
        });
      });
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async updateCircuitPlan(
    updateCircuitPlanDto: UpdateCircuitPlanDto
  ): Promise<PlanEntity> {
    try {
      return await db.transaction(async (tx) => {
        const [planUpdated] = await tx
          .update(plans)
          .set({
            name: updateCircuitPlanDto.name,
            categoryId: updateCircuitPlanDto.categoryId,
          })
          .where(eq(plans.id, updateCircuitPlanDto.planId))
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
            .update(daysCircuit)
            .set({ isActive: false })
            .where(eq(daysCircuit.planDayId, day?.id));

          await tx
            .update(plansDays)
            .set({ isActive: false })
            .where(eq(plansDays.id, day?.id));
        }

        for (const day of updateCircuitPlanDto.days) {
          const [planDayCreated] = await tx
            .insert(plansDays)
            .values({
              planId: planUpdated?.id,
              dayOfWeekId: day.dayOfWeek?.id,
            })
            .returning();

          for (const circuit of day.circuits) {
            const [circuitCreated] = await tx
              .insert(daysCircuit)
              .values({
                description: circuit.description,
                order: circuit.order,
                planDayId: planDayCreated.id,
              })
              .returning();

            for (const exercise of circuit.exercises) {
              await tx
                .insert(plansExercises)
                .values({
                  exerciseId: exercise.id,
                  description: exercise.description,
                  superset: exercise.superset,
                  planCircuitId: circuitCreated.id,
                })
                .returning();
            }
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

        for (const client of updateCircuitPlanDto.clients) {
          await tx.insert(clientsPlans).values({
            planId: planUpdated.id,
            clientId: client.id,
          });
        }

        const [planTypeFound] = await tx
          .select()
          .from(plansTypes)
          .where(eq(plansTypes.id, planUpdated.typeId));

        const [planCategoryFound] = await tx
          .select()
          .from(plansCategories)
          .where(eq(plansCategories.id, planUpdated.categoryId));

        return PlanEntity.create({
          ...planUpdated,
          category: PlanCategoryEntity.create(planCategoryFound),
          type: PlanTypeEntity.create(planTypeFound),
        });
      });
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async deleteWeeklyPlan(planId: string, userId: string): Promise<PlanEntity> {
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

        const [planTypeFound] = await tx
          .select()
          .from(plansTypes)
          .where(eq(plansTypes.id, planUpdated.typeId));

        const [planCategoryFound] = await tx
          .select()
          .from(plansCategories)
          .where(eq(plansCategories.id, planUpdated.categoryId));

        return PlanEntity.create({
          ...planUpdated,
          category: PlanCategoryEntity.create(planCategoryFound),
          type: PlanTypeEntity.create(planTypeFound),
        });
      });
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
