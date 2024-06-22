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

  public static create(data: { [key: string]: any }): UserEntity {
    const {
      id,
      name,
      role,
      email,
      authId,
      subscriptionPlan,
      image,
      clientInfo,
    } = data;

    if (!id) throw "id is required";
    if (!name) throw "name is required";
    if (!role) throw "role is required";
    if (!(role instanceof RoleEntity)) throw "bad format of role";
    if (!email) throw "email is required";
    if (!authId) throw "authId is required";
    if (!subscriptionPlan) throw "subscriptionPlan is required";
    if (!(subscriptionPlan instanceof SubscriptionPlanEntity))
      throw "bad format of subscriptionPlan";
    if (clientInfo && !(clientInfo instanceof ClientEntity))
      throw "bad format of clientInfo";

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
