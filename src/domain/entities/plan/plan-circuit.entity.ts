// import { ExerciseEntity } from "../exercise/exercise.entity";

import { ExerciseEntity } from "../exercise/exercise.entity";

export class PlanCircuitEntity {
  constructor(
    public id: number,
    public order: number,
    public description: string,
    public isActive: boolean,
    public exercises?: ExerciseEntity[] | []
  ) {}

  public static create(data: { [key: string]: any }): PlanCircuitEntity {
    const { id, order, description, isActive, exercises } = data;

    if (!id) throw "id is required";
    if (!description) throw "description is required";
    if (order === null || order === undefined) throw "order is required";
    if (isActive === null) throw "isActive is required";

    return new PlanCircuitEntity(id, order, description, isActive, exercises);
  }
}
