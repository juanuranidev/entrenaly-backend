export class InviteEntity {
  constructor(
    public id: number,
    public trainerName?: string,
    public trainerImage?: string
  ) {}

  public static create(data: { [key: string]: any }): InviteEntity {
    const { id, trainerName, trainerImage } = data;

    if (!id) throw "id in InviteEntity is required";

    return new InviteEntity(id, trainerName, trainerImage);
  }
}
