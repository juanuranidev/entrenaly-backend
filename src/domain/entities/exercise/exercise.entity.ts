export class ExerciseEntity {
  constructor(
    public id: number,
    public name: number,
    public category: { id: number; name: string },
    public hasUser?: boolean,
    public video?: number,
    public image?: number,
    public variant?: any
  ) {}

  public static fromObject(object: { [key: string]: any }): ExerciseEntity {
    const { id, name, video, category, variant, hasUser, image } = object;

    if (!id) throw "id in ExerciseEntity is required";
    if (!name) throw "name in ExerciseEntity is required";
    if (!category) throw "category in ExerciseEntity is required";

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
