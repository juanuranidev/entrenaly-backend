export class PlanTypeEntity {
  constructor(public id: number, public name: string) {}

  public static create(data: { [key: string]: any }): PlanTypeEntity {
    const { id, name } = data;

    if (!id) throw "id is required";
    if (!name) throw "name is required";

    return new PlanTypeEntity(id, name);
  }
}
