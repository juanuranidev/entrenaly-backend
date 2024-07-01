import { Router } from "express";
import { UserController } from "./controller";
import { UserMiddleware } from "../middlewares/user.middleware";
import { UserRepositoryImpl } from "../../infraestructure/repositories/user/user.repository.impl";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const userRepositoryImpl = new UserRepositoryImpl();
    const userController = new UserController(userRepositoryImpl);

    router.post("/v1/create", userController.createUser);
    router.post("/v1/create/google", userController.createUserWithGoogleAuth);
    router.get("/v1/read/authId", userController.readUserByAuthId);
    router.get(
      "/v1/read",
      [UserMiddleware.validateToken],
      userController.readUser
    );

    return router;
  }
}
