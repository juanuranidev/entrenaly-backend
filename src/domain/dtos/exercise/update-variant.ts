export class UpdateVariantDto {
  private constructor(
    public readonly name: string,
    public readonly video: string,
    public readonly userId: string,
    public readonly variantId: number,
    public readonly exerciseId: number,
    public readonly categoryId: number
  ) {}

  static create(props: { [key: string]: any }): [string?, UpdateVariantDto?] {
    const { name, categoryId, video, userId, exerciseId, variantId } = props;

    if (!name) return ["name is required", undefined];
    if (!categoryId) return ["categoryId is required", undefined];
    if (!video) return ["video is required", undefined];
    if (!userId) return ["userId is required", undefined];
    if (!exerciseId) return ["exerciseId is required", undefined];
    if (!variantId) return ["variantId is required", undefined];

    return [
      undefined,
      new UpdateVariantDto(
        name,
        video,
        userId,
        variantId,
        exerciseId,
        categoryId
      ),
    ];
  }
}
