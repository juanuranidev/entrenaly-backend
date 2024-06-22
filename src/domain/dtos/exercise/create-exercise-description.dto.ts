export class CreateExerciseDescriptionDto {
  private constructor(
    public readonly userId: string,
    public readonly description: string
  ) {}

  static create(data: {
    [key: string]: any;
  }): [string?, CreateExerciseDescriptionDto?] {
    const { description, userId } = data;

    if (!userId) return ["userId is required", undefined];
    if (!description) return ["description is required", undefined];

    return [undefined, new CreateExerciseDescriptionDto(userId, description)];
  }
}
