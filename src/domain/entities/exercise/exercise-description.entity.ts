export class ExerciseDescriptionEntity {
  constructor(
    public id: number,
    public description: number
  ) {}

  public static create(data: {
    [key: string]: any;
  }): ExerciseDescriptionEntity {
    const { id, description } = data;

    if (!id) throw "id is required";
    if (!description) throw "description is required";

    return new ExerciseDescriptionEntity(id, description);
  }
}
