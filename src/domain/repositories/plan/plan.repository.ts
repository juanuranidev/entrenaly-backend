import { PlanEntity } from "../../entities/plan/plan.entity";
import { PlanTypeEntity } from "../../entities/plan/plan-type.entity";
import { DayOfWeekEntity } from "../../entities/plan/day-of-week.entity";
import { PlanCategoryEntity } from "../../entities/plan/plan-category.entity";
import { UpdateWeeklyPlanDto } from "../../dtos/plan/update-weekly-plan.dto";
import { CreateWeeklyPlanDto } from "../../dtos/plan/create-weekly-plan.dto";
import { CreateCircuitPlanDto } from "../../dtos/plan/create-circuit-plan.dto";
import { UpdateCircuitPlanDto } from "../../dtos/plan/update-circuit-plan.dto";

export abstract class PlanRepository {
  abstract createWeeklyPlan(
    createWeeklyPlanDto: CreateWeeklyPlanDto
  ): Promise<PlanEntity>;
  abstract createCircuitPlan(
    createCircuitPlanDto: CreateCircuitPlanDto
  ): Promise<PlanEntity>;
  abstract readPlansTypes(): Promise<PlanTypeEntity[]>;
  abstract readDaysOfWeek(): Promise<DayOfWeekEntity[]>;
  abstract readPlansCategories(): Promise<PlanCategoryEntity[]>;
  abstract readPlansByUserId(userId: string): Promise<PlanEntity[]>;
  abstract readPlansByClientId(clientId: any): Promise<PlanEntity[]>;
  abstract readWeeklyPlan(planId: any): Promise<PlanEntity>;
  abstract readCircuitPlan(planId: any): Promise<PlanEntity>;
  abstract updateWeeklyPlan(
    updateWeeklyPlanDto: UpdateWeeklyPlanDto
  ): Promise<PlanEntity>;
  abstract updateCircuitPlan(
    updateCircuitPlanDto: UpdateCircuitPlanDto
  ): Promise<PlanEntity>;
  abstract deleteWeeklyPlan(planId: any, userId: string): Promise<PlanEntity>;
}
