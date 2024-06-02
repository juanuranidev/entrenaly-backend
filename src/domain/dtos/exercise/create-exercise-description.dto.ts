export class CreateExerciseDescriptionDto {
  private constructor(
    public readonly userId: string,
    public readonly description: string
  ) {}

  static create(props: {
    [key: string]: any;
  }): [string?, CreateExerciseDescriptionDto?] {
    const { description, userId } = props;

    if (!userId)
      return ["userId in CreateExerciseDescriptionDto is required", undefined];
    if (!description)
      return [
        "description in CreateExerciseDescriptionDto is required",
        undefined,
      ];

    return [undefined, new CreateExerciseDescriptionDto(userId, description)];
  }
}
