import { CustomError } from "../../domain/errors/custom.error";
import { ClientRepository } from "../../domain/repositories/client/client.repository";
import { Request, Response } from "express";
import { UpdateClientMedicalInformationDto } from "../../domain/dtos/client/update-medical-information.dto";

export class ClientController {
  constructor(private readonly clientRepository: ClientRepository) {}
  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  };
  public readClient = async (req: Request, res: Response) => {
    try {
      const { clientId } = req.query;

      const clients = await this.clientRepository.readClient(clientId);

      return res.status(200).json(clients);
    } catch (error) {
      console.log(error);
      this.handleError(error, res);
    }
  };
  public readClients = async (req: Request, res: Response) => {
    try {
      const { id } = req.body.user;

      const clients = await this.clientRepository.readClients(id);

      return res.status(200).json(clients);
    } catch (error) {
      console.log(error);
      this.handleError(error, res);
    }
  };
  public readInvite = async (req: Request, res: Response) => {
    try {
      const { id } = req.body.user;

      const invite = await this.clientRepository.readInvite(id);

      return res.status(200).json(invite);
    } catch (error) {
      console.log(error);
      this.handleError(error, res);
    }
  };
  public readInviteInformation = async (req: Request, res: Response) => {
    try {
      const { inviteId } = req.query;

      const invite =
        await this.clientRepository.readInviteInformation(inviteId);

      return res.status(200).json(invite);
    } catch (error) {
      console.log(error);
      this.handleError(error, res);
    }
  };
  public updateClientMedicalInformation = async (
    req: Request,
    res: Response
  ) => {
    try {
      const { data } = req.body;
      const { id: trainerId } = req.body.user;

      const [error, updateClientMedicalInformationDto] =
        UpdateClientMedicalInformationDto.create({ ...data, trainerId });
      if (error) {
        return res.status(400).json({ error });
      }

      const user = await this.clientRepository.updateClientMedicalInformation(
        updateClientMedicalInformationDto!
      );

      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      this.handleError(error, res);
    }
  };
  public updateClientOnboardingStatus = async (req: Request, res: Response) => {
    try {
      const { clientId, onboardingStatus } = req.query;

      if (!clientId) {
        return res.status(400).json({ error: "Invalid or missing clientId" });
      }

      if (!onboardingStatus) {
        return res
          .status(400)
          .json({ error: "Invalid or missing onboardingStatus" });
      }

      const user = await this.clientRepository.updateClientOnboardingStatus(
        String(clientId),
        Boolean(onboardingStatus)
      );

      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      this.handleError(error, res);
    }
  };
}
