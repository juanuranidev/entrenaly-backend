export class DayOfWeekEntity {
  constructor(
    public id: number,
    public name: string,
    public order: number
  ) {}

  public static create(data: { [key: string]: any }): DayOfWeekEntity {
    const { id, name, order } = data;

    if (!id) throw "id is required";
    if (!name) throw "name is required";
    if (!order) throw "order is required";

    return new DayOfWeekEntity(id, name, order);
  }
}
