import { ExerciseEntity } from "../exercise/exercise.entity";
import { DayOfWeekEntity } from "./day-of-week.entity";
import { PlanCircuitEntity } from "./plan-circuit.entity";

export class PlanDayEntity {
  constructor(
    public id: number,
    public planId: number,
    public dayOfWeek: DayOfWeekEntity,
    public exercises?: ExerciseEntity[] | [],
    public circuits?: PlanCircuitEntity[] | []
  ) {}

  public static create(data: { [key: string]: any }): PlanDayEntity {
    const { id, planId, dayOfWeek, exercises, circuits } = data;

    if (!id) throw "id is required";
    if (!planId) throw "planId is required";
    if (!dayOfWeek) throw "dayOfWeek is required";
    if (!(dayOfWeek instanceof DayOfWeekEntity))
      throw "bad format of dayOfWeek";

    return new PlanDayEntity(id, planId, dayOfWeek, exercises, circuits);
  }
}
