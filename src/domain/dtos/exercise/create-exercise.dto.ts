export class CreateExerciseDto {
  private constructor(
    public readonly name: string,
    public readonly userId: string,
    public readonly categoryId: number,
    public readonly video?: string,
    public readonly image?: string
  ) {}

  static create(data: { [key: string]: any }): [string?, CreateExerciseDto?] {
    const { name, categoryId, video, userId, image } = data;

    if (!name) return ["name is required", undefined];
    if (!userId) return ["userId is required", undefined];
    if (!categoryId) return ["categoryId is required", undefined];

    return [
      undefined,
      new CreateExerciseDto(name, userId, categoryId, video, image),
    ];
  }
}
