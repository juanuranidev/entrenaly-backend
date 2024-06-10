export class ExerciseDescriptionEntity {
  constructor(public id: number, public description: number) {}

  public static fromObject(object: {
    [key: string]: any;
  }): ExerciseDescriptionEntity {
    const { id, description } = object;

    if (!id) throw "id in ExerciseDescriptionEntity is required";
    if (!description)
      throw "description in ExerciseDescriptionEntity is required";

    return new ExerciseDescriptionEntity(id, description);
  }
}
