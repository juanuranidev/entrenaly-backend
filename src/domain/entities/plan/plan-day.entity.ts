export class PlanDayEntity {
  constructor(
    public id: number,
    public planId: number,
    public dayOfWeek: number
  ) {}

  public static fromObject(object: { [key: string]: any }): PlanDayEntity {
    const { id, planId, dayOfWeek } = object;

    if (!id) throw "id is required";
    if (!planId) throw "planId is required";
    if (!dayOfWeek) throw "dayOfWeek is required";

    return new PlanDayEntity(id, planId, dayOfWeek);
  }
}
