import { Router } from "express";
import { UserController } from "./controller";
import { UserMiddleware } from "../middlewares/user.middleware";
import { UserRepositoryImpl } from "../../infraestructure/repositories/user/user.repository.impl";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const userRepositoryImpl = new UserRepositoryImpl();
    const userController = new UserController(userRepositoryImpl);

    router.post("/v1/post", userController.postUser);
    router.post("/v1/post/google", userController.postUserWithGoogleAuth);
    router.get("/v1/get/authId", userController.readUserByAuthId);
    router.get("/v1/get", [UserMiddleware.getUser], userController.readUser);

    return router;
  }
}
