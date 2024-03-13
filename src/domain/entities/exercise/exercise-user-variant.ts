export class ExerciseUserVariantEntity {
  constructor(
    public id: number,
    public name: number,
    public video: string,
    public userId: number
  ) {}

  public static fromObject(object: {
    [key: string]: any;
  }): ExerciseUserVariantEntity {
    const { id, name, video, userId } = object;

    if (!id) throw "id is required";
    if (!name) throw "name is required";
    if (!video) throw "video is required";
    if (!userId) throw "userId is required";

    return new ExerciseUserVariantEntity(id, name, video, userId);
  }
}
