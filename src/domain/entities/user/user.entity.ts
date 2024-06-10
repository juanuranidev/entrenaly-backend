export class UserEntity {
  constructor(
    public id: number,
    public name: string,
    public role: any,
    public email: string,
    public authId: string,
    public subscriptionPlan?: any,
    public image?: string,
    public clientInfo?: any
  ) {}

  public static fromObject(object: { [key: string]: any }): UserEntity {
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

    if (!id) throw "id in UserEntity is required";
    if (!name) throw "name in UserEntity is required";
    if (!role) throw "roleId in UserEntity is required";
    if (!email) throw "email in UserEntity is required";
    if (!authId) throw "authId in UserEntity is required";

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
