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
  public readInviteByUserId = async (req: Request, res: Response) => {
    try {
      const { id } = req.body.user;

      const invite = await this.clientRepository.readInviteByUserId(id);

      return res.status(200).json(invite);
    } catch (error) {
      console.log(error);
      this.handleError(error, res);
    }
  };
  public readClient = async (req: Request, res: Response) => {
    try {
      const { id: trainerId } = req.body.user;
      const { clientId }: any = req.query;

      const clients = await this.clientRepository.readClient(
        clientId,
        trainerId
      );

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
  public readInvite = async (req: Request, res: Response) => {
    try {
      const { inviteId }: any = req.query;

      const inviteInformation = await this.clientRepository.readInvite(
        inviteId
      );

      return res.status(200).json(inviteInformation);
    } catch (error) {
      console.log(error);
      this.handleError(error, res);
    }
  };
}
