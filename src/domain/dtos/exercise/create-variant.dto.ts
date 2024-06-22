export class CreateVariantDto {
  private constructor(
    public name: string,
    public userId: string,
    public categoryId: number,
    public exerciseId: number,
    public video?: string,
    public image?: string
  ) {}

  static create(data: { [key: string]: any }): [string?, CreateVariantDto?] {
    const { name, categoryId, video, userId, exerciseId, image } = data;

    if (!name) return ["name is required", undefined];
    if (!userId) return ["userId is required", undefined];
    if (!categoryId) return ["categoryId is required", undefined];
    if (!exerciseId) return ["exerciseId is required", undefined];

    return [
      undefined,
      new CreateVariantDto(name, userId, categoryId, exerciseId, video, image),
    ];
  }
}
