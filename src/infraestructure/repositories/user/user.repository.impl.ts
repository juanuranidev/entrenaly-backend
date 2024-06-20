import {
  roles,
  users,
  clients,
  invites,
  subscriptionPlans,
} from "../../db/schemas";
import { SUBSCRIPTION_PLANS_CONSTANTS } from "../../../domain/constants/user/subscription-plans.constants";
import { SubscriptionPlanEntity } from "../../../domain/entities/user/subscription-plan.entity";
import { CreateGoogleUserDto } from "../../../domain/dtos/user/create-google-user.dto";
import { ROLES_CONSTANTS } from "../../../domain/constants/user/role.constants";
import { UserRepository } from "../../../domain/repositories/user/user.repository";
import { CreateUserDto } from "../../../domain/dtos/user/create-user.dto";
import { ClientEntity } from "../../../domain/entities/client/client.entity";
import { uuidAdapter } from "../../../config/adapters/uuid.adapter";
import { CustomError } from "../../../domain/errors/custom.error";
import { RoleEntity } from "../../../domain/entities/user/role.entity";
import { UserEntity } from "../../../domain/entities/user/user.entity";
import { eq } from "drizzle-orm";
import { db } from "../../db";

export class UserRepositoryImpl implements UserRepository {
  async readUser(id: string): Promise<UserEntity | CustomError> {
    try {
      const [userFound] = await db
        .select({
          role: roles,
          clientInfo: clients,
          mainInformation: users,
          subscriptionPlan: subscriptionPlans,
        })
        .from(users)
        .where(eq(users.id, id))
        .leftJoin(clients, eq(clients.userId, users.id))
        .leftJoin(roles, eq(roles.id, users.roleId))
        .leftJoin(
          subscriptionPlans,
          eq(subscriptionPlans.id, users.subscriptionPlanId)
        );

      return UserEntity.create({
        ...userFound.mainInformation,
        role: userFound.role ? RoleEntity.create(userFound.role) : null,
        subscriptionPlan: userFound.subscriptionPlan
          ? SubscriptionPlanEntity.create(userFound.subscriptionPlan)
          : null,
        clientInfo: userFound.clientInfo
          ? ClientEntity.fromObject(userFound.clientInfo)
          : null,
      });
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async readUserByAuthId(authId: string): Promise<any> {
    try {
      const [userFound] = await db
        .select({
          role: roles,
          clientInfo: clients,
          mainInformation: users,
          subscriptionPlan: subscriptionPlans,
        })
        .from(users)
        .where(eq(users.authId, authId))
        .leftJoin(clients, eq(clients.userId, users.id))
        .leftJoin(roles, eq(roles.id, users.roleId))
        .leftJoin(
          subscriptionPlans,
          eq(subscriptionPlans.id, users.subscriptionPlanId)
        );

      if (!userFound) {
        return null;
      }

      return UserEntity.create({
        ...userFound.mainInformation,
        role: userFound.role ? RoleEntity.create(userFound.role) : null,
        subscriptionPlan: userFound.subscriptionPlan
          ? SubscriptionPlanEntity.create(userFound.subscriptionPlan)
          : null,
        clientInfo: userFound.clientInfo
          ? ClientEntity.fromObject(userFound.clientInfo)
          : null,
      });
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async postUser(
    registerUserDto: CreateUserDto
  ): Promise<UserEntity | CustomError> {
    try {
      return await db.transaction(async (tx) => {
        let role;
        const hasInvite: boolean = registerUserDto.invite ? true : false;

        if (hasInvite) {
          const [clientRole] = await tx
            .select()
            .from(roles)
            .where(eq(roles.name, ROLES_CONSTANTS.NAMES.CLIENT));

          role = clientRole;
        } else {
          const [adminRole] = await tx
            .select()
            .from(roles)
            .where(eq(roles.name, ROLES_CONSTANTS.NAMES.TRAINER));

          role = adminRole;
        }

        const userUuid = uuidAdapter.generate();
        const [subscriptionPlanFound] = await tx
          .select()
          .from(subscriptionPlans)
          .where(
            eq(
              subscriptionPlans.name,
              SUBSCRIPTION_PLANS_CONSTANTS.NAMES.INITIAL
            )
          );

        const [newUser] = await tx
          .insert(users)
          .values({
            ...registerUserDto,
            roleId: role.id,
            id: userUuid,
            subscriptionPlanId: subscriptionPlanFound.id,
          })
          .returning();
        if (!newUser) {
          throw CustomError.internalServer("Error creating the user");
        }

        if (hasInvite) {
          const [inviteInfo] = await tx
            .select({
              trainerId: invites.userId,
            })
            .from(invites)
            .where(eq(invites.id, registerUserDto.invite!))
            .leftJoin(users, eq(users.id, invites.userId));

          const clientUuid = uuidAdapter.generate();
          await tx.insert(clients).values({
            id: clientUuid,
            userId: newUser.id,
            trainerId: inviteInfo?.trainerId,
          });
        }

        return UserEntity.create({
          ...newUser,
          role: RoleEntity.create(role),
          subscriptionPlan: SubscriptionPlanEntity.create(
            subscriptionPlanFound
          ),
        });
      });
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async postUserWithGoogleAuth(
    googleUserDto: CreateGoogleUserDto
  ): Promise<UserEntity | CustomError> {
    try {
      const userExist = await this.readUserByAuthId(googleUserDto.authId);

      if (!userExist) {
        const [error, registerUserDto] = CreateUserDto.create(googleUserDto);
        if (error) {
          throw CustomError.internalServer(error);
        }
        const userRegistered = await this.postUser(registerUserDto!);

        return userRegistered;
      }

      return userExist;
    } catch (error: unknown) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
