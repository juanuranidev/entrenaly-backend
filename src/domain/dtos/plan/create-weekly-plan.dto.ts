export class CreateWeeklyPlanDto {
  private constructor(
    public readonly name: string,
    public readonly trainerId: string,
    public readonly categoryId: number,
    public readonly clientsIds: [string],
    public readonly days: [
      { dayOfWeekId: number; exercises: [{ id: number; description: string }] }
    ]
  ) {}

  static create(props: {
    [key: string]: any;
  }): [string?, CreateWeeklyPlanDto?] {
    const { name, categoryId, trainerId, clientsIds, days } = props;

    if (!days) return ["days in CreateWeeklyPlanDto is required", undefined];
    if (!name) return ["name in CreateWeeklyPlanDto is required", undefined];
    if (!categoryId)
      return ["categoryId in CreateWeeklyPlanDto is required", undefined];
    if (!trainerId)
      return ["trainerId in CreateWeeklyPlanDto is required", undefined];
    if (!clientsIds)
      return ["clientsIds in CreateWeeklyPlanDto is required", undefined];

    return [
      undefined,
      new CreateWeeklyPlanDto(name, trainerId, categoryId, clientsIds, days),
    ];
  }
}
