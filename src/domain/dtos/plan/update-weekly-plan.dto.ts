export class UpdateWeeklyPlanDto {
  private constructor(
    public readonly name: string,
    public readonly planId: string,
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

  static create(data: { [key: string]: any }): [string?, UpdateWeeklyPlanDto?] {
    const { planId, name, categoryId, trainerId, clients, days } = data;

    if (!planId) return ["planId is required", undefined];
    if (!days) return ["days is required", undefined];
    if (!name) return ["name is required", undefined];
    if (!categoryId) return ["categoryId is required", undefined];
    if (!trainerId) return ["trainerId is required", undefined];
    if (!clients.length) return ["clients is required", undefined];

    return [
      undefined,
      new UpdateWeeklyPlanDto(
        name,
        planId,
        trainerId,
        categoryId,
        clients,
        days
      ),
    ];
  }
}
