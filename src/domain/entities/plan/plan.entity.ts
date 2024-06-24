import { PlanCategoryEntity } from "./plan-category.entity";
import { PlanDayEntity } from "./plan-day.entity";
import { PlanTypeEntity } from "./plan-type.entity";

export class PlanEntity {
  constructor(
    public id: number,
    public name: string,
    public type: PlanTypeEntity,
    public category: PlanCategoryEntity,
    public createdAt: string,
    public clients: any,
    public user?: any,
    public days?: PlanDayEntity[] | null
  ) {}

  public static create(data: { [key: string]: any }): PlanEntity {
    const { id, name, category, type, user, createdAt, days, clients } = data;

    if (!id) throw "id is required";
    if (!name) throw "name is required";
    if (!type) throw "type is required";
    if (!(type instanceof PlanTypeEntity)) throw "bad format of type";
    if (!category) throw "category is required";
    if (!(category instanceof PlanCategoryEntity))
      throw "bad format of category";
    if (!createdAt) throw "createdAt is required";

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
