import { SubscriptionPlanEntity } from "./subscription-plan.entity";
import { ClientEntity } from "../client/client.entity";
import { RoleEntity } from "./role.entity";

export class UserEntity {
  constructor(
    public id: number,
    public name: string,
    public role: RoleEntity,
    public email: string,
    public authId: string,
    public subscriptionPlan: SubscriptionPlanEntity,
    public image?: string,
    public clientInfo?: ClientEntity | null
  ) {}

  public static create(object: { [key: string]: any }): UserEntity {
    const {
      id,
      name,
      role,
      email,
      authId,
      subscriptionPlan,
      image,
      clientInfo,
    } = object;

    if (!id) throw "id is required";
    if (!name) throw "name is required";
    if (!role) throw "roleId is required";
    if (!email) throw "email is required";
    if (!authId) throw "authId is required";

    return new UserEntity(
      id,
      name,
      role,
      email,
      authId,
      subscriptionPlan,
      image,
      clientInfo
    );
  }
}
