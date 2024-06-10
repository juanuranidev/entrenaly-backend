import { Router } from "express";
import { UserMiddleware } from "../middlewares/user.middleware";
import { ClientController } from "./controller";
import { ClientRepositoryImpl } from "../../infraestructure/repositories/client/client.repository.impl";

export class ClientRoutes {
  static get routes(): Router {
    const router = Router();

    const clientRepositoryImpl = new ClientRepositoryImpl();
    const exerciseController = new ClientController(clientRepositoryImpl);

    router.get("/v1/read/client", exerciseController.readClient);
    router.get(
      "/v1/read/clients",
      [UserMiddleware.getUser],
      exerciseController.readClients
    );
    router.get(
      "/v1/read/invite",
      [UserMiddleware.getUser],
      exerciseController.readInvite
    );
    router.get(
      "/v1/read/invite-information",
      exerciseController.readInviteInformation
    );
    router.post(
      "/v1/update/client-medical-information",
      [UserMiddleware.getUser],
      exerciseController.updateClientMedicalInformation
    );

    return router;
  }
}
