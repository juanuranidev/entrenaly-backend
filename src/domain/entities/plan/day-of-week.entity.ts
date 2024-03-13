export class DayOfWeekEntity {
  constructor(public id: number, public name: string, order: number) {}

  public static fromObject(object: { [key: string]: any }): DayOfWeekEntity {
    const { id, name, order } = object;

    if (!id) throw "id is required";
    if (!name) throw "name is required";
    if (!order) throw "order is required";

    return new DayOfWeekEntity(id, name, order);
  }
}
