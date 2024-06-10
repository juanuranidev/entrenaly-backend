export class UpdateVariantDto {
  private constructor(
    public name: string,
    public userId: string,
    public variantId: number,
    public exerciseId: number,
    public categoryId: number,
    public video?: string,
    public image?: string
  ) {}

  static create(object: { [key: string]: any }): [string?, UpdateVariantDto?] {
    const { name, categoryId, video, userId, exerciseId, variantId, image } =
      object;

    if (!name) return ["name is required", undefined];
    if (!categoryId) return ["categoryId is required", undefined];
    if (!userId) return ["userId is required", undefined];
    if (!exerciseId) return ["exerciseId is required", undefined];
    if (!variantId) return ["variantId is required", undefined];

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
