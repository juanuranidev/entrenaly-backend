export class UpdateWeeklyPlanDto {
  private constructor(
    public readonly name: string,
    public readonly planId: string,
    public readonly trainerId: string,
    public readonly categoryId: number,
    public readonly clientsIds: [string],
    public readonly days: [
      { dayOfWeekId: number; exercises: [{ id: number; description: string }] }
    ]
  ) {}

  static create(props: {
    [key: string]: any;
  }): [string?, UpdateWeeklyPlanDto?] {
    const { planId, name, categoryId, trainerId, clientsIds, days } = props;

    if (!planId)
      return ["planId in UpdateWeeklyPlanDto is required", undefined];
    if (!days) return ["days in UpdateWeeklyPlanDto is required", undefined];
    if (!name) return ["name in UpdateWeeklyPlanDto is required", undefined];
    if (!categoryId)
      return ["categoryId in UpdateWeeklyPlanDto is required", undefined];
    if (!trainerId)
      return ["trainerId in UpdateWeeklyPlanDto is required", undefined];
    if (!clientsIds)
      return ["clientsIds in UpdateWeeklyPlanDto is required", undefined];

    return [
      undefined,
      new UpdateWeeklyPlanDto(
        name,
        planId,
        trainerId,
        categoryId,
        clientsIds,
        days
      ),
    ];
  }
}
