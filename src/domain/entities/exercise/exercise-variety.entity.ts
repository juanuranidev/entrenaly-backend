export class ExerciseVarietyEntity {
  constructor(public id: number, public type: number) {}

  public static fromObject(object: {
    [key: string]: any;
  }): ExerciseVarietyEntity {
    const { id, type } = object;

    if (!id) throw "id is required";
    if (!type) throw "type is required";

    return new ExerciseVarietyEntity(id, type);
  }
}
