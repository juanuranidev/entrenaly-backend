export class PlanEntity {
  constructor(
    public id: number,
    public name: string,
    public type: any,
    public category: any,
    public createdAt: string,
    public clients: any,
    public user?: any,
    public days?: any
  ) {}

  public static fromObject(object: { [key: string]: any }): PlanEntity {
    const { id, name, category, type, user, createdAt, days, clients } = object;

    if (!id) throw "id in PlanEntity is required";
    if (!name) throw "name in PlanEntity is required";
    if (!type) throw "type in PlanEntity is required";
    if (!category) throw "category in PlanEntity is required";
    if (!createdAt) throw "createdAt in PlanEntity is required";

    return new PlanEntity(
      id,
      name,
      type,
      category,
      createdAt,
      clients,
      user,
      days
    );
  }
}
