export class PlanCategoryEntity {
  constructor(public id: number, public name: string) {}

  public static fromObject(object: { [key: string]: any }): PlanCategoryEntity {
    const { id, name } = object;

    if (!id) throw "id in PlanCategoryEntity is required";
    if (!name) throw "name in PlanCategoryEntity is required";

    return new PlanCategoryEntity(id, name);
  }
}
