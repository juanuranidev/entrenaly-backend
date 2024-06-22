export class ExerciseCategoryEntity {
  constructor(public id: number, public name: number) {}

  public static create(data: { [key: string]: any }): ExerciseCategoryEntity {
    const { id, name } = data;

    if (!id) throw "id is required";
    if (!name) throw "name is required";

    return new ExerciseCategoryEntity(id, name);
  }
}
