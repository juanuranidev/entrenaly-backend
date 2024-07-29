export class UpdateClientMedicalInformationDto {
  private constructor(
    public readonly clientId: string,
    public readonly goals?: string,
    public readonly height?: string,
    public readonly weight?: string,
    public readonly injuries?: string,
    public readonly medicalConditions?: string
  ) {}

  static create(data: {
    [key: string]: any;
  }): [string?, UpdateClientMedicalInformationDto?] {
    const { goals, height, weight, injuries, clientId, medicalConditions } =
      data;

    if (!clientId) return ["clientId is required", undefined];

    return [
      undefined,
      new UpdateClientMedicalInformationDto(
        clientId,
        goals,
        height,
        weight,
        injuries,
        medicalConditions
      ),
    ];
  }
}
