import { db } from "../../db";
import { and, eq } from "drizzle-orm";
import { CustomError } from "../../../domain/errors/custom.error";
import { uuidAdapter } from "../../../config/adapters/uuid.adapter";
import { ClientEntity } from "../../../domain/entities/client/client.entity";
import { InviteEntity } from "../../../domain/entities/client/invite.entity";
import { ClientRepository } from "../../../domain/repositories/client/client.repository";
import { clients, invites, users } from "../../db/schemas";
import { UpdateClientMedicalInformationDto } from "../../../domain/dtos/client/update-medical-information.dto";
export class ClientRepositoryImpl implements ClientRepository {
  async readClient(clientId: string): Promise<ClientEntity> {
    try {
      const [clientFound] = await db
        .select({
          name: users.name,
          image: users.image,
          email: users.email,
          mainInformation: clients,
        })
        .from(clients)
        .where(and(eq(clients.id, clientId)))
        .leftJoin(users, eq(users.id, clients.userId));

      if (!clientFound) {
        throw CustomError.notFound("Client not found");
      }

      return ClientEntity.create({
        ...clientFound.mainInformation,
        name: clientFound?.name,
        image: clientFound?.image,
        email: clientFound?.email,
      });
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async readClients(userId: string): Promise<ClientEntity[]> {
    try {
      const clientsList = await db
        .select({
          name: users.name,
          image: users.image,
          email: users.email,
          mainInformation: clients,
        })
        .from(clients)
        .where(and(eq(clients.trainerId, userId), eq(clients.isActive, true)))
        .leftJoin(users, eq(users.id, clients.userId));

      return clientsList.map((client) =>
        ClientEntity.create({
          ...client?.mainInformation,
          name: client?.name,
          image: client?.image,
          email: client?.email,
        })
      );
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async readInvite(userId: string): Promise<InviteEntity> {
    try {
      const [inviteExist] = await db
        .select({ id: invites.id })
        .from(invites)
        .where(eq(invites.userId, userId));

      if (inviteExist) {
        return InviteEntity.create(inviteExist);
      }

      const uuid = uuidAdapter.generate();
      const [inviteCreated] = await db
        .insert(invites)
        .values({
          id: uuid,
          userId,
        })
        .returning();

      if (!inviteCreated) {
        throw CustomError.internalServer("Error creating the invite");
      }

      return InviteEntity.create(inviteCreated);
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async readInviteInformation(invite: string): Promise<InviteEntity> {
    try {
      const [inviteFound] = await db
        .select({
          mainInformation: invites,
          trainerName: users.name,
          trainerImage: users.image,
        })
        .from(invites)
        .where(eq(invites.id, invite))
        .leftJoin(users, eq(users.id, invites.userId));

      if (!inviteFound) {
        throw CustomError.notFound("Invite not found");
      }

      return InviteEntity.create({
        ...inviteFound.mainInformation,
        trainerName: inviteFound?.trainerName,
        trainerImage: inviteFound?.trainerImage,
      });
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async updateClientMedicalInformation(
    updateClientMedicalInformationDto: UpdateClientMedicalInformationDto
  ): Promise<ClientEntity> {
    try {
      const {
        goals,
        weight,
        height,
        injuries,
        clientId,
        medicalConditions,
        typeOfBody,
      } = updateClientMedicalInformationDto;

      const [updatedClient] = await db
        .update(clients)
        .set({
          weight: weight,
          height: height,
          goals: goals,
          injuries: injuries,
          medicalConditions: medicalConditions,
          typeOfBody: typeOfBody,
        })
        .where(and(eq(clients.id, clientId)))
        .returning();

      const client = await this.readClient(updatedClient.id);

      return client;
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async updateClientOnboardingStatus(
    clientId: string,
    onboardingStatus: boolean
  ): Promise<ClientEntity> {
    try {
      const [updatedClient] = await db
        .update(clients)
        .set({ hasCompletedOnboarding: onboardingStatus })
        .where(and(eq(clients.id, clientId)))
        .returning();

      const client = await this.readClient(updatedClient.id);

      return client;
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
