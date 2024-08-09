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

type Circuit = {
  id: number;
  planDayId: string;
  order: number;
  exercises: Exercise[];
};

type Day = {
  id: number;
  dayOfWeek: DayOfWeek;
  circuits: Circuit[];
};

type Client = {
  name: string;
  id: string;
};
export class UpdateCircuitPlanDto {
  private constructor(
    public readonly name: string,
    public readonly trainerId: string,
    public readonly categoryId: number,
    public readonly clients: Client[],
    public readonly days: Day[],
    public readonly planId: string
  ) {}

  static create(data: {
    [key: string]: any;
  }): [string?, UpdateCircuitPlanDto?] {
    const { name, categoryId, trainerId, clients, days, planId } = data;

    if (!days) return ["days is required", undefined];
    if (!name) return ["name is required", undefined];
    if (!categoryId) return ["categoryId is required", undefined];
    if (!trainerId) return ["trainerId is required", undefined];

    return [
      undefined,
      new UpdateCircuitPlanDto(
        name,
        trainerId,
        categoryId,
        clients,
        days,
        planId
      ),
    ];
  }
}
