import { Router } from "express";
import { UserController } from "./controller";
import { UserMiddleware } from "../middlewares/user.middleware";
import { UserRepositoryImpl } from "../../infraestructure/repositories/user/user.repository.impl";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const userRepositoryImpl = new UserRepositoryImpl();
    const userController = new UserController(userRepositoryImpl);

    router.post("/v1/register", userController.createUser);
    router.post("/v1/google/auth", userController.createUserWithGoogleAuth);
    router.get("/v1/get/authId", userController.readUserByAuthId);
    router.get("/v1/get", [UserMiddleware.getUser], userController.getUser);

    return router;
  }
}
