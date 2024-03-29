export class PlanCategoryEntity {
  constructor(public id: number, public name: string) {}

  public static fromObject(object: { [key: string]: any }): PlanCategoryEntity {
    const { id, name } = object;

    if (!id) throw "id is required";
    if (!name) throw "name is required";

    return new PlanCategoryEntity(id, name);
  }
}
