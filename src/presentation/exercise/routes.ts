import { ExerciseRepositoryImpl } from "../../infraestructure/repositories/exercise/exercise.repository.impl";
import { ExerciseController } from "./controller";
import { UserMiddleware } from "../middlewares/user.middleware";
import { Router } from "express";

export class ExerciseRoutes {
  static get routes(): Router {
    const router = Router();

    const exerciseRepositoryImpl = new ExerciseRepositoryImpl();
    const exerciseController = new ExerciseController(exerciseRepositoryImpl);

    router.get(
      "/v1/get",
      [UserMiddleware.getUser],
      exerciseController.readExercises
    );
    router.post(
      "/v1/create/variant",
      [UserMiddleware.getUser],
      exerciseController.createVariant
    );
    router.post(
      "/v1/update/variant",
      [UserMiddleware.getUser],
      exerciseController.updateVariant
    );
    router.get(
      "/v1/get/categories",
      exerciseController.readExercisesCategories
    );
    router.get(
      "/v1/get/exercises-descriptions",
      [UserMiddleware.getUser],
      exerciseController.readExercisesDescriptions
    );
    router.post(
      "/v1/post/exercise-description",
      [UserMiddleware.getUser],
      exerciseController.createExerciseDescription
    );
    router.post(
      "/v1/create",
      [UserMiddleware.getUser],
      exerciseController.createExercise
    );

    return router;
  }
}
