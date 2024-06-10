export class DayOfWeekEntity {
  constructor(public id: number, public name: string, public order: number) {}

  public static fromObject(object: { [key: string]: any }): DayOfWeekEntity {
    const { id, name, order } = object;

    if (!id) throw "id in DayOfWeekEntity is required";
    if (!name) throw "name in DayOfWeekEntity is required";
    if (!order) throw "order in DayOfWeekEntity is required";

    return new DayOfWeekEntity(id, name, order);
  }
}
