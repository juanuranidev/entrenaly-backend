export class AppReleaseEntity {
  constructor(
    public id: number,
    public date: Date,
    public version: string,
    public description: string
  ) {}

  public static create(data: { [key: string]: any }): AppReleaseEntity {
    const { id, date, version, description } = data;

    if (!id) throw "id is required";
    if (!date) throw "date is required";
    if (!version) throw "version is required";
    if (!description) throw "description is required";

    return new AppReleaseEntity(id, date, version, description);
  }
}
