export class RoleEntity {
  constructor(public id: number, public name: string) {}

  public static fromObject(object: { [key: string]: any }): RoleEntity {
    const { id, name } = object;

    if (!id) throw "id in RoleEntity is required";
    if (!name) throw "name in RoleEntity is required";

    return new RoleEntity(id, name);
  }
}
