export class PlanEntity {
  constructor(
    public id: number,
    public name: string,
    public category: number
  ) {}

  public static fromObject(object: { [key: string]: any }): PlanEntity {
    const { id, name, category } = object;

    if (!id) throw "id is required";
    if (!name) throw "name is required";
    if (!category) throw "category is required";

    return new PlanEntity(id, name, category);
  }
}
