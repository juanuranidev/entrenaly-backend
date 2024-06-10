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
  async readClient(clientId: string): Promise<ClientEntity | CustomError> {
    try {
      const [clientFound] = await db
        .select({
          id: clients.id,
          name: users.name,
          image: users.image,
          email: users.email,
          goals: clients.goals,
          weight: clients.weight,
          height: clients.height,
          injuries: clients.injuries,
          createdAt: clients.createdAt,
          medicalConditions: clients.medicalConditions,
        })
        .from(clients)
        .where(and(eq(clients.id, clientId)))
        .leftJoin(users, eq(users.id, clients.userId));

      if (!clientFound) {
        throw CustomError.notFound("Client not found");
      }

      return ClientEntity.fromObject({
        id: clientFound?.id,
        name: clientFound?.name,
        goals: clientFound?.goals,
        image: clientFound?.image,
        email: clientFound?.email,
        weight: clientFound?.weight,
        height: clientFound?.height,
        injuries: clientFound?.injuries,
        createdAt: clientFound?.createdAt,
        medicalConditions: clientFound?.medicalConditions,
      });
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async readClients(userId: string): Promise<ClientEntity[] | CustomError> {
    try {
      const clientsList = await db
        .select({
          id: clients.id,
          name: users.name,
          image: users.image,
          email: users.email,
          goals: clients.goals,
          weight: clients.weight,
          height: clients.height,
          injuries: clients.injuries,
          createdAt: clients.createdAt,
          medicalConditions: clients.medicalConditions,
        })
        .from(clients)
        .where(and(eq(clients.trainerId, userId), eq(clients.isActive, true)))
        .leftJoin(users, eq(users.id, clients.userId));

      return clientsList.map((client) => ClientEntity.fromObject(client));
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async readInvite(userId: string): Promise<InviteEntity | CustomError> {
    try {
      const [inviteExist] = await db
        .select({ id: invites.id })
        .from(invites)
        .where(eq(invites.userId, userId));

      if (inviteExist) {
        return InviteEntity.fromObject(inviteExist);
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

      return InviteEntity.fromObject(inviteCreated);
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async readInviteInformation(
    invite: string
  ): Promise<InviteEntity | CustomError> {
    try {
      const [inviteFound] = await db
        .select({
          id: invites.id,
          trainerName: users.name,
          trainerImage: users.image,
        })
        .from(invites)
        .where(eq(invites.id, invite))
        .leftJoin(users, eq(users.id, invites.userId));

      return InviteEntity.fromObject({
        ...inviteFound,
        trainer: inviteFound.trainerImage,
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
  ): Promise<ClientEntity | CustomError> {
    try {
      const {
        goals,
        weight,
        height,
        injuries,
        clientId,
        trainerId,
        medicalConditions,
      } = updateClientMedicalInformationDto;

      const [updatedClient] = await db
        .update(clients)
        .set({
          weight: weight,
          height: height,
          goals: goals,
          injuries: injuries,
          medicalConditions: medicalConditions,
        })
        .where(and(eq(clients.id, clientId), eq(clients.trainerId, trainerId)))
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
