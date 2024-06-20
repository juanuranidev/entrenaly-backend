import { eq } from "drizzle-orm";
import { db } from "../../infraestructure/db";
import { UserEntity } from "../../domain/entities/user/user.entity";
import { roles, users } from "../../infraestructure/db/schemas";
import { NextFunction, Request, Response } from "express";

export class UserMiddleware {
  static async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const authorization = req.header("Authorization");

      if (!authorization)
        return res.status(401).json({ error: "No token provided" });
      if (!authorization.startsWith("Bearer "))
        return res.status(401).json({ error: "Invalid Bearer token" });

      const userId = authorization.split(" ").at(1) || "";

      const [user] = await db
        .select({
          main: users,
          role: roles,
        })
        .from(users)
        .where(eq(users.authId, userId))
        .leftJoin(roles, eq(roles.id, users.roleId));

      if (!user)
        return res.status(401).json({ error: "User not authenticated" });

      req.body.user = UserEntity.create({
        ...user.main,
        role: user.role,
      });

      next();
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
