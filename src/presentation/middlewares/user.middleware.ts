import {
  roles,
  users,
  clients,
  subscriptionPlans,
} from "../../infraestructure/db/schemas";
import { NextFunction, Request, Response } from "express";
import { SubscriptionPlanEntity } from "../../domain/entities/user/subscription-plan.entity";
import { ClientEntity } from "../../domain/entities/client/client.entity";
import { UserEntity } from "../../domain/entities/user/user.entity";
import { RoleEntity } from "../../domain/entities/user/role.entity";
import { eq } from "drizzle-orm";
import { db } from "../../infraestructure/db";

export class UserMiddleware {
  static async validateToken(req: Request, res: Response, next: NextFunction) {
    try {
      const authorization = req.header("Authorization");

      if (!authorization)
        return res.status(401).json({ error: "No token provided" });
      if (!authorization.startsWith("Bearer "))
        return res.status(401).json({ error: "Invalid Bearer token" });

      const userId = authorization.split(" ").at(1) || "";

      const [userFound] = await db
        .select({
          role: roles,
          clientInfo: clients,
          mainInformation: users,
          subscriptionPlan: subscriptionPlans,
        })
        .from(users)
        .where(eq(users.authId, userId))
        .leftJoin(clients, eq(clients.userId, users.id))
        .leftJoin(roles, eq(roles.id, users.roleId))
        .leftJoin(
          subscriptionPlans,
          eq(subscriptionPlans.id, users.subscriptionPlanId)
        );

      if (!userFound)
        return res.status(401).json({ error: "User not authenticated" });

      req.body.user = UserEntity.create({
        ...userFound.mainInformation,
        role: userFound.role ? RoleEntity.create(userFound.role) : null,
        subscriptionPlan: userFound.subscriptionPlan
          ? SubscriptionPlanEntity.create(userFound.subscriptionPlan)
          : null,
        clientInfo: userFound.clientInfo
          ? ClientEntity.create({
              ...userFound.clientInfo,
              id: userFound?.mainInformation?.id,
              name: userFound?.mainInformation?.name,
              email: userFound?.mainInformation?.email,
            })
          : null,
      });

      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
