import { UpdateClientMedicalInformationDto } from "../../domain/dtos/client/update-medical-information.dto";
import { Request, Response } from "express";
import { ClientRepository } from "../../domain/repositories/client/client.repository";
import { CustomError } from "../../domain/errors/custom.error";

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
  public readClientsByUserId = async (req: Request, res: Response) => {
    try {
      const { id } = req.body.user;

      const clients = await this.clientRepository.readClientsByUserId(id);

      return res.status(200).json(clients);
    } catch (error) {
      console.log(error);
      this.handleError(error, res);
    }
  };
  public readClientById = async (req: Request, res: Response) => {
    try {
      const { id: trainerId } = req.body.user;
      const { clientId }: any = req.query;

      const clients = await this.clientRepository.readClientById(
        clientId,
        trainerId
      );

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
  };
  public readInviteInformation = async (req: Request, res: Response) => {
    try {
      const { inviteId }: any = req.query;

      const inviteInformation =
        await this.clientRepository.readInviteInformation(inviteId);

      return res.status(200).json(inviteInformation);
    } catch (error) {
      console.log(error);
      this.handleError(error, res);
    }
  };
}
