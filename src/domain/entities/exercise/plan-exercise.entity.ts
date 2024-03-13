export class PlanExerciseEntity {
  constructor(
    public id: number,
    public planDayId: number,
    public exerciseId: number,
    public description: string,
    public variety: number
  ) {}

  public static fromObject(object: { [key: string]: any }): PlanExerciseEntity {
    const { id, planDayId, exerciseId, description, variety } = object;

    if (!id) throw "id is required";
    if (!planDayId) throw "planDayId is required";
    if (!exerciseId) throw "exerciseId is required";
    if (!description) throw "exerciseId is required";
    if (!variety) throw "exerciseId is required";

    return new PlanExerciseEntity(
      id,
      planDayId,
      exerciseId,
      description,
      variety
    );
  }
}
