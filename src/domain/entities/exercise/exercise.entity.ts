export class ExerciseEntity {
  constructor(public id: number, public name: number, public video: number) {}

  public static fromObject(object: { [key: string]: any }): ExerciseEntity {
    const { id, name, video } = object;

    if (!id) throw "id is required";
    if (!name) throw "name is required";
    if (!video) throw "video is required";

    return new ExerciseEntity(id, name, video);
  }
}
