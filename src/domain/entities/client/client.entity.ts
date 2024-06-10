export class ClientEntity {
  constructor(
    public id: number,
    public name: string,
    public createdAt: string,
    public email?: string,
    public image?: string,
    public weight?: string,
    public height?: string,
    public goals?: string,
    public injuries?: string,
    public medicalConditions?: string
  ) {}

  public static fromObject(object: { [key: string]: any }): ClientEntity {
    const {
      id,
      name,
      email,
      image,
      goals,
      weight,
      height,
      injuries,
      createdAt,
      medicalConditions,
    } = object;

    if (!id) throw "id in ClientEntity is required";
    if (!name) throw "name in ClientEntity is required";
    if (!email) throw "email in ClientEntity is required";
    if (!createdAt) throw "createdAt in ClientEntity is required";

    return new ClientEntity(
      id,
      name,
      createdAt,
      email,
      image,
      weight,
      height,
      goals,
      injuries,
      medicalConditions
    );
  }
}
