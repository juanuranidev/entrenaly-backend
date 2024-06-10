export class ExerciseCategoryEntity {
  constructor(public id: number, public name: number) {}

  public static fromObject(object: {
    [key: string]: any;
  }): ExerciseCategoryEntity {
    const { id, name } = object;

    if (!id) throw "id in ExerciseCategoryEntity is required";
    if (!name) throw "name in ExerciseCategoryEntity is required";

    return new ExerciseCategoryEntity(id, name);
  }
}
