export class CreateVariantDto {
  private constructor(
    public readonly name: string,
    public readonly userId: string,
    public readonly categoryId: number,
    public readonly exerciseId: number,
    public readonly video?: string,
    public readonly image?: string
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateVariantDto?] {
    const { name, categoryId, video, userId, exerciseId, image } = props;

    if (!name) return ["name in CreateVariantDto is required", undefined];
    if (!userId) return ["userId in CreateVariantDto is required", undefined];
    if (!categoryId)
      return ["categoryId in CreateVariantDto is required", undefined];
    if (!exerciseId)
      return ["exerciseId in CreateVariantDto is required", undefined];

    return [
      undefined,
      new CreateVariantDto(name, userId, categoryId, exerciseId, video, image),
    ];
  }
}
