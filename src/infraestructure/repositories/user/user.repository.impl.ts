import {
  roles,
  users,
  clients,
  invites,
  subscriptionPlans,
  appReleases,
} from "../../db/schemas";
import { CreateUserWithGoogleDto } from "../../../domain/dtos/user/create-user-with-google.dto";
import { SubscriptionPlanEntity } from "../../../domain/entities/user/subscription-plan.entity";
import { USER_CONSTANTS } from "../../../domain/constants/user/user.constants";
import { UserRepository } from "../../../domain/repositories/user/user.repository";
import { CreateUserDto } from "../../../domain/dtos/user/create-user.dto";
import { ClientEntity } from "../../../domain/entities/client/client.entity";
import { uuidAdapter } from "../../../config/adapters/uuid.adapter";
import { CustomError } from "../../../domain/errors/custom.error";
import { RoleEntity } from "../../../domain/entities/user/role.entity";
import { UserEntity } from "../../../domain/entities/user/user.entity";
import { eq } from "drizzle-orm";
import { db } from "../../db";
import { AppReleaseEntity } from "../../../domain/entities/plan/app-release";

export class UserRepositoryImpl implements UserRepository {
  async createUser(
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
            .where(eq(roles.name, USER_CONSTANTS.ROLES.NAMES.CLIENT));

          role = clientRole;
        } else {
          const [adminRole] = await tx
            .select()
            .from(roles)
            .where(eq(roles.name, USER_CONSTANTS.ROLES.NAMES.TRAINER));

          role = adminRole;
        }

        const userUuid = uuidAdapter.generate();
        const [subscriptionPlanFound] = await tx
          .select()
          .from(subscriptionPlans)
          .where(
            eq(
              subscriptionPlans.name,
              USER_CONSTANTS.SUBSCRIPTION_PLANS.NAMES.INITIAL
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
      console.log(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async createUserWithGoogleAuth(
    googleUserDto: CreateUserWithGoogleDto
  ): Promise<UserEntity | CustomError> {
    try {
      const userExist = await this.readUserByAuthId(googleUserDto.authId);

      if (!userExist) {
        const [error, registerUserDto] = CreateUserDto.create(googleUserDto);
        if (error) {
          throw CustomError.internalServer(error);
        }
        const userRegistered = await this.createUser(registerUserDto!);

        return userRegistered;
      }

      return userExist;
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
  async readAppReleases(): Promise<AppReleaseEntity[] | CustomError> {
    try {
      const appReleaseList = await db.select().from(appReleases);

      return appReleaseList.map((appRelease) =>
        AppReleaseEntity.create(appRelease)
      );
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
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
        role: RoleEntity.create(userFound.role!),
        subscriptionPlan: SubscriptionPlanEntity.create(
          userFound.subscriptionPlan!
        ),
        clientInfo: userFound.clientInfo
          ? ClientEntity.create(userFound.clientInfo)
          : null,
      });
    } catch (error: unknown) {
      console.log(error);
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
        role: RoleEntity.create(userFound.role!),
        subscriptionPlan: SubscriptionPlanEntity.create(
          userFound.subscriptionPlan!
        ),
        clientInfo: userFound.clientInfo
          ? ClientEntity.create({
              ...userFound.clientInfo,
              name: userFound?.mainInformation?.name,
              image: userFound?.mainInformation?.image,
              email: userFound?.mainInformation?.email,
            })
          : null,
      });
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
