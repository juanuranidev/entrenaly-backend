import { PlanDayEntity } from "./plan-day.entity";
import { ExerciseEntity } from "../exercise/exercise.entity";

export class PlanCircuitEntity {
  constructor(
    public id: number,
    public order: number,
    public isActive: boolean,
    public planDay: PlanDayEntity,
    public exercises: ExerciseEntity[]
  ) {}

  public static create(data: { [key: string]: any }): PlanCircuitEntity {
    const { id, order, isActive, planDay, exercises } = data;

    if (!id) throw "id is required";
    if (!order) throw "order is required";
    if (isActive === null) throw "isActive is required";
    if (!(planDay instanceof PlanDayEntity)) throw "bad format of planDay";
    if (!exercises.length) throw "exercises is required";

    return new PlanCircuitEntity(id, order, isActive, planDay, exercises);
  }
}
