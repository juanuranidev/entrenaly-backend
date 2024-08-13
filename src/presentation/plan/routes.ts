import { PlanRepositoryImpl } from "../../infraestructure/repositories/plan/plan.repository.impl";
import { PlanController } from "./controller";
import { UserMiddleware } from "../middlewares/user.middleware";
import { Router } from "express";

export class PlanRoutes {
  static get routes(): Router {
    const router = Router();

    const planRepositoryImpl = new PlanRepositoryImpl();
    const planController = new PlanController(planRepositoryImpl);

    router.post(
      "/v1/create/weekly-plan",
      [UserMiddleware.validateToken],
      planController.createWeeklyPlan
    );
    router.post(
      "/v1/create/circuit-plan",
      [UserMiddleware.validateToken],
      planController.createCircuitPlan
    );
    router.get("/v1/read/plans-types", planController.readPlansTypes);
    router.get("/v1/read/days-of-week", planController.readDaysOfWeek);
    router.get("/v1/read/plan-categories", planController.readPlansCategories);
    router.get(
      "/v1/read/plans-by-user-id",
      [UserMiddleware.validateToken],
      planController.readPlansByUserId
    );
    router.get(
      "/v1/read/plans-by-client-id",
      [UserMiddleware.validateToken],
      planController.readPlansByClientId
    );
    router.get("/v1/read/weekly-plan", planController.readWeeklyPlan);
    router.get("/v1/read/circuit-plan", planController.readCircuitPlan);
    router.post(
      "/v1/update/weekly-plan",
      [UserMiddleware.validateToken],
      planController.updateWeeklyPlan
    );
    router.delete(
      "/v1/delete/weekly-plan",
      [UserMiddleware.validateToken],
      planController.deleteWeeklyPlan
    );

    return router;
  }
}
