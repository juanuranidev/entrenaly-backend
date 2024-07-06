type Exercise = {
  id: number;
  name: string;
  image: string;
  description: string;
  superset: boolean;
};

type DayOfWeek = {
  id: number;
  name: string;
};

type Day = {
  id: number;
  dayOfWeek: DayOfWeek;
  exercises: Exercise[];
};

type Client = {
  name: string;
  id: string;
};
export class CreateWeeklyPlanDto {
  private constructor(
    public readonly name: string,
    public readonly trainerId: string,
    public readonly categoryId: number,
    public readonly clients: Client[],
    public readonly days: Day[]
  ) {}

  static create(data: { [key: string]: any }): [string?, CreateWeeklyPlanDto?] {
    const { name, categoryId, trainerId, clients, days } = data;

    if (!days) return ["days is required", undefined];
    if (!name) return ["name is required", undefined];
    if (!categoryId) return ["categoryId is required", undefined];
    if (!trainerId) return ["trainerId is required", undefined];

    return [
      undefined,
      new CreateWeeklyPlanDto(name, trainerId, categoryId, clients, days),
    ];
  }
}
