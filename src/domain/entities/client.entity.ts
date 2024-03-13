export class ClientEntity {
  constructor(
    public id: number,
    public name: string,
    public user: number,
    public image?: string
  ) {}

  public static fromObject(object: { [key: string]: any }): ClientEntity {
    const { id, name, user, image } = object;

    if (!id) throw "id is required";
    if (!name) throw "name is required";
    if (!user) throw "user is required";

    return new ClientEntity(id, name, user, image);
  }
}
