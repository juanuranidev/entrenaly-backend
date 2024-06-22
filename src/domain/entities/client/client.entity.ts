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

  public static create(data: { [key: string]: any }): ClientEntity {
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
    } = data;

    if (!id) throw "id is required";
    if (!name) throw "name is required";
    if (!email) throw "email is required";
    if (!createdAt) throw "createdAt is required";

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
