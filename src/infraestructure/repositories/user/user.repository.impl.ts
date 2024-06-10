import {
  clients,
  invites,
  roles,
  subscriptionPlans,
  users,
} from "../../db/schemas";
import { SUBSCRIPTION_PLANS_CONSTANTS } from "../../../domain/constants/user/subscription-plans.constants";
import { CreateGoogleUserDto } from "../../../domain/dtos/user/create-google-user.dto";
import { ROLES_CONSTANTS } from "../../../domain/constants/user/role.constants";
import { UserRepository } from "../../../domain/repositories/user/user.repository";
import { CreateUserDto } from "../../../domain/dtos/user/create-user.dto";
import { uuidAdapter } from "../../../config/adapters/uuid.adapter";
import { CustomError } from "../../../domain/errors/custom.error";
import { UserEntity } from "../../../domain/entities/user/user.entity";
import { eq } from "drizzle-orm";
import { db } from "../../db";

export class UserRepositoryImpl implements UserRepository {
  async readUser(id: string): Promise<UserEntity | CustomError> {
    try {
      const [userFound] = await db
        .select({
          main: users,
          role: roles,
          clientInfo: clients,
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

      return UserEntity.fromObject({
        ...userFound.main,
        role: userFound.role,
        clientInfo: userFound.clientInfo,
        subscriptionPlan: userFound.subscriptionPlan,
      });
    } catch (error) {
      throw CustomError.internalServer(String(error));
    }
  }
  async readUserByAuthId(authId: string): Promise<any> {
    try {
      const [userFound] = await db
        .select({
          main: users,
          role: roles,
          clientInfo: clients,
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

      return UserEntity.fromObject({
        ...userFound.main,
        role: userFound.role,
        clientInfo: userFound.clientInfo,
        subscriptionPlan: userFound.subscriptionPlan,
      });
    } catch (error) {
      throw CustomError.internalServer(String(error));
    }
  }
  async postUser(
    registerUserDto: CreateUserDto
  ): Promise<UserEntity | CustomError> {
    try {
      return await db.transaction(async (tx) => {
        let role;
        const hasInvite = registerUserDto.invite ? true : false;

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
          .select({ id: subscriptionPlans.id })
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

        return UserEntity.fromObject({ ...newUser, role: role });
      });
    } catch (error) {
      throw CustomError.internalServer(String(error));
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
    } catch (error) {
      throw CustomError.internalServer(String(error));
    }
  }
}
