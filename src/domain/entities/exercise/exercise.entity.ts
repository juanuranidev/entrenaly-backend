import { ExerciseCategoryEntity } from "./exercise-category.entity";
import { VariantEntity } from "./variant.entity";

export class ExerciseEntity {
  constructor(
    public id: number,
    public name: number,
    public category: ExerciseCategoryEntity,
    public hasUser: boolean,
    public video?: number,
    public image?: number,
    public variant?: VariantEntity | null
  ) {}

  public static create(data: { [key: string]: any }): ExerciseEntity {
    const { id, name, video, category, variant, hasUser, image } = data;

    if (!id) throw "id is required";
    if (!name) throw "name is required";
    if (!category) throw "category is required";
    if (!(category instanceof ExerciseCategoryEntity))
      throw "bad format of category";
    if (variant && !(variant instanceof VariantEntity))
      throw "bad format of variant";
    if (hasUser === null) throw "hasUser is required";

    return new ExerciseEntity(
      id,
      name,
      category,
      hasUser,
      video,
      image,
      variant
    );
  }
}
