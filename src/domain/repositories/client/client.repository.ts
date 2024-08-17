import { ClientEntity } from "../../entities/client/client.entity";
import { InviteEntity } from "../../entities/client/invite.entity";
import { UpdateClientMedicalInformationDto } from "../../dtos/client/update-medical-information.dto";

export abstract class ClientRepository {
  abstract readClient(clientId: any): Promise<ClientEntity>;
  abstract readClients(userId: string): Promise<ClientEntity[]>;
  abstract readInvite(userId: any): Promise<InviteEntity>;
  abstract readInviteInformation(invite: any): Promise<InviteEntity>;
  abstract updateClientMedicalInformation(
    updateClientMedicalInformationDto: UpdateClientMedicalInformationDto
  ): Promise<ClientEntity>;
  abstract updateClientOnboardingStatus(
    clientId: string,
    onboardingStatus: boolean
  ): Promise<ClientEntity>;
}
