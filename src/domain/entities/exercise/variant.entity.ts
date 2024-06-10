export class VariantEntity {
  constructor(
    public id: number,
    public name: number,
    public category: { id: number; name: string },
    public video?: string,
    public image?: string
  ) {}

  public static fromObject(object: { [key: string]: any }): VariantEntity {
    const { id, name, video, category, image } = object;

    if (!id) throw "id in VariantEntity is required";
    if (!name) throw "name in VariantEntity is required";
    if (!category) throw "category in VariantEntity is required";

    return new VariantEntity(id, name, category, video, image);
  }
}
