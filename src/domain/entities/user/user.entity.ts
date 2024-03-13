export class UserEntity {
  constructor(
    public id: number,
    public name: string,
    public role: number,
    public email: string,
    public password: string,
    public image?: string
  ) {}

  public static fromObject(object: { [key: string]: any }): UserEntity {
    const { id, name, role, email, password, image } = object;

    if (!id) throw "id is required";
    if (!name) throw "name is required";
    if (!role) throw "role is required";
    if (!email) throw "email is required";
    if (!image) throw "image is required";
    if (!password) throw "password is required";

    return new UserEntity(id, name, role, email, password, image);
  }
}
