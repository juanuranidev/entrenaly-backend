import { PlanRepositoryImpl } from "../../infraestructure/repositories/plan/plan.repository.impl";
import { PlanController } from "./controller";
import { UserMiddleware } from "../middlewares/user.middleware";
import { Router } from "express";

export class PlanRoutes {
  static get routes(): Router {
    const router = Router();

    const planRepositoryImpl = new PlanRepositoryImpl();
    const planController = new PlanController(planRepositoryImpl);

    router.get("/v1/get/plan-categories", planController.readPlansCategories);
    router.get("/v1/get/days-of-week", planController.readDaysOfWeek);
    router.get("/v1/get/plans-types", planController.readPlansTypes);
    router.post(
      "/v1/create/weekly-plan",
      [UserMiddleware.getUser],
      planController.createWeeklyPlan
    );
    router.get(
      "/v1/get/plans-by-user-id",
      [UserMiddleware.getUser],
      planController.readPlansByUserId
    );
    router.get(
      "/v1/get/plans-by-client-id",
      [UserMiddleware.getUser],
      planController.readPlansByClientId
    );
    router.get("/v1/get/plan-by-id", planController.readWeeklyPlanById);
    router.post(
      "/v1/update/weekly-plan",
      [UserMiddleware.getUser],
      planController.updateWeeklyPlan
    );
    router.delete(
      "/v1/delete/weekly-plan",
      [UserMiddleware.getUser],
      planController.deleteWeeklyPlan
    );

    return router;
  }
}
