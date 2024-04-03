export class CreateVariantDto {
  private constructor(
    public readonly name: string,
    public readonly categoryId: number,
    public readonly video: string,
    public readonly userId: string,
    public readonly exerciseId: number
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateVariantDto?] {
    const { name, categoryId, video, userId, exerciseId } = props;

    if (!name) return ["name is required", undefined];
    if (!categoryId) return ["categoryId is required", undefined];
    if (!video) return ["video is required", undefined];
    if (!userId) return ["userId is required", undefined];
    if (!exerciseId) return ["exerciseId is required", undefined];

    return [
      undefined,
      new CreateVariantDto(name, categoryId, video, userId, exerciseId),
    ];
  }
}
