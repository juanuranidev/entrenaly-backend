import { Router } from "express";
import { UserRoutes } from "./user/routes";
import { PlanRoutes } from "./plan/routes";
import { ClientRoutes } from "./client/routes";
import { ExerciseRoutes } from "./exercise/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/users", UserRoutes.routes);
    router.use("/api/exercise", ExerciseRoutes.routes);
    router.use("/api/client", ClientRoutes.routes);
    router.use("/api/plan", PlanRoutes.routes);

    return router;
  }
}
