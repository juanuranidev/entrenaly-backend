export class UpdateVariantDto {
  private constructor(
    public readonly name: string,
    public readonly userId: string,
    public readonly variantId: number,
    public readonly exerciseId: number,
    public readonly categoryId: number,
    public readonly video?: string,
    public readonly image?: string
  ) {}

  static create(props: { [key: string]: any }): [string?, UpdateVariantDto?] {
    const { name, categoryId, video, userId, exerciseId, variantId, image } =
      props;

    if (!name) return ["name in UpdateVariantDto is required", undefined];
    if (!categoryId)
      return ["categoryId in UpdateVariantDto is required", undefined];
    if (!userId) return ["userId in UpdateVariantDto is required", undefined];
    if (!exerciseId)
      return ["exerciseId in UpdateVariantDto is required", undefined];
    if (!variantId)
      return ["variantId in UpdateVariantDto is required", undefined];

    return [
      undefined,
      new UpdateVariantDto(
        name,
        userId,
        variantId,
        exerciseId,
        categoryId,
        video,
        image
      ),
    ];
  }
}
