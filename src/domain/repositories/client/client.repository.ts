import { CustomError } from "../../errors/custom.error";
import { ClientEntity } from "../../entities/client/client.entity";
import { InviteEntity } from "../../entities/client/invite.entity";
import { UpdateClientMedicalInformationDto } from "../../dtos/client/update-medical-information.dto";

export abstract class ClientRepository {
  abstract readClient(clientId: any): Promise<ClientEntity | CustomError>;
  abstract readClients(userId: string): Promise<ClientEntity[] | CustomError>;
  abstract readInvite(userId: any): Promise<InviteEntity | CustomError>;
  abstract readInviteInformation(
    invite: any
  ): Promise<InviteEntity | CustomError>;
  abstract updateClientMedicalInformation(
    updateClientMedicalInformationDto: UpdateClientMedicalInformationDto
  ): Promise<ClientEntity | CustomError>;
}
