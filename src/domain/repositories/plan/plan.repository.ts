import { PlanEntity } from "../../entities/plan/plan.entity";
import { CustomError } from "../../errors/custom.error";
import { PlanTypeEntity } from "../../entities/plan/plan-type.entity";
import { DayOfWeekEntity } from "../../entities/plan/day-of-week.entity";
import { PlanCategoryEntity } from "../../entities/plan/plan-category.entity";
import { UpdateWeeklyPlanDto } from "../../dtos/plan/update-weekly-plan.dto";
import { CreateWeeklyPlanDto } from "../../dtos/plan/create-weekly-plan.dto";

export abstract class PlanRepository {
  abstract createWeeklyPlan(
    createWeeklyPlanDto: CreateWeeklyPlanDto
  ): Promise<PlanEntity | CustomError>;
  abstract readPlansTypes(): Promise<PlanTypeEntity[] | CustomError>;
  abstract readDaysOfWeek(): Promise<DayOfWeekEntity[] | CustomError>;
  abstract readPlansCategories(): Promise<PlanCategoryEntity[] | CustomError>;
  abstract readPlansByUserId(
    userId: string
  ): Promise<PlanEntity[] | CustomError>;
  abstract readPlansByClientId(
    clientId: any
  ): Promise<PlanEntity[] | CustomError>;
  abstract readWeeklyPlan(planId: any): Promise<PlanEntity | CustomError>;
  abstract updateWeeklyPlan(
    updateWeeklyPlanDto: UpdateWeeklyPlanDto
  ): Promise<PlanEntity | CustomError>;
  abstract deleteWeeklyPlan(
    planId: any,
    userId: string
  ): Promise<PlanEntity | CustomError>;
}
