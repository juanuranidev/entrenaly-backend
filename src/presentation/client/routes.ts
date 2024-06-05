import { Router } from "express";
import { UserMiddleware } from "../middlewares/user.middleware";
import { ClientController } from "./controller";
import { ClientRepositoryImpl } from "../../infraestructure/repositories/client/client.repository.impl";

export class ClientRoutes {
  static get routes(): Router {
    const router = Router();

    const clientRepositoryImpl = new ClientRepositoryImpl();
    const exerciseController = new ClientController(clientRepositoryImpl);

    router.get(
      "/v1/get-invite",
      [UserMiddleware.getUser],
      exerciseController.readInviteByUserId
    );
    router.get(
      "/v1/get-clients-by-user-id",
      [UserMiddleware.getUser],
      exerciseController.readClientsByUserId
    );
    router.get(
      "/v1/get-client-by-id",
      [UserMiddleware.getUser],
      exerciseController.readClientById
    );
    router.post(
      "/v1/update-client-medical-information",
      [UserMiddleware.getUser],
      exerciseController.updateClientMedicalInformation
    );
    router.get(
      "/v1/read/invite-information",
      exerciseController.readInviteInformation
    );

    return router;
  }
}
