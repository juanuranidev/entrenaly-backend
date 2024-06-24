export class CreateWeeklyPlanDto {
  private constructor(
    public readonly name: string,
    public readonly trainerId: string,
    public readonly categoryId: number,
    public readonly clients: any,
    public readonly days: [
      {
        id: number;
        planId: string;
        dayOfWeek: {
          id: number;
          name: string;
        };
        exercises: [
          {
            id: number;
            name: string;
            image: string;
            description: string;
          }
        ];
      }
    ]
  ) {}

  static create(data: { [key: string]: any }): [string?, CreateWeeklyPlanDto?] {
    const { name, categoryId, trainerId, clientsIds, days } = data;

    if (!days) return ["days is required", undefined];
    if (!name) return ["name is required", undefined];
    if (!categoryId) return ["categoryId is required", undefined];
    if (!trainerId) return ["trainerId is required", undefined];
    if (!clientsIds) return ["clientsIds is required", undefined];

    return [
      undefined,
      new CreateWeeklyPlanDto(name, trainerId, categoryId, clientsIds, days),
    ];
  }
}
