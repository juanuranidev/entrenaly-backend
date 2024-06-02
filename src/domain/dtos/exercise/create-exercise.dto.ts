export class CreateExerciseDto {
  private constructor(
    public readonly name: string,
    public readonly userId: string,
    public readonly categoryId: number,
    public readonly video?: string,
    public readonly image?: string
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateExerciseDto?] {
    const { name, categoryId, video, userId, image } = props;

    if (!name) return ["name in CreateExerciseDto is required", undefined];
    if (!userId) return ["userId in CreateExerciseDto is required", undefined];
    if (!categoryId)
      return ["categoryId in CreateExerciseDto is required", undefined];

    return [
      undefined,
      new CreateExerciseDto(name, userId, categoryId, video, image),
    ];
  }
}
