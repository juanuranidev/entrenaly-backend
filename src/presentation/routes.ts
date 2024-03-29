import { Router } from "express";
import { UserRoutes } from "./user/routes";
import { ExerciseRoutes } from "./exercise/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/users", UserRoutes.routes);
    router.use("/api/exercise", ExerciseRoutes.routes);

    return router;
  }
}
