import { DayOfWeekEntity } from "./day-of-week.entity";

export class PlanDayEntity {
  constructor(
    public id: number,
    public planId: number,
    public dayOfWeek: DayOfWeekEntity
  ) {}

  public static create(data: { [key: string]: any }): PlanDayEntity {
    const { id, planId, dayOfWeek } = data;

    if (!id) throw "id is required";
    if (!planId) throw "planId is required";
    if (!dayOfWeek) throw "dayOfWeek is required";
    if (!(dayOfWeek instanceof DayOfWeekEntity))
      throw "bad format of dayOfWeek";

    return new PlanDayEntity(id, planId, dayOfWeek);
  }
}
