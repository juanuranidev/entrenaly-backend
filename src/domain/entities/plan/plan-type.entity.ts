export class PlanTypeEntity {
  constructor(public id: number, public name: string) {}

  public static fromObject(object: { [key: string]: any }): PlanTypeEntity {
    const { id, name } = object;

    if (!id) throw "id in PlanTypeEntity is required";
    if (!name) throw "name in PlanTypeEntity is required";

    return new PlanTypeEntity(id, name);
  }
}
