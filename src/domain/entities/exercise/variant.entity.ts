import { ExerciseCategoryEntity } from "./exercise-category.entity";

export class VariantEntity {
  constructor(
    public id: number,
    public name: number,
    public category: ExerciseCategoryEntity,
    public video?: string,
    public image?: string
  ) {}

  public static create(data: { [key: string]: any }): VariantEntity {
    const { id, name, video, category, image } = data;

    if (!id) throw "id is required";
    if (!name) throw "name is required";
    if (!category) throw "category is required";
    if (!(category instanceof ExerciseCategoryEntity))
      throw "bad format of category";

    return new VariantEntity(id, name, category, video, image);
  }
}
