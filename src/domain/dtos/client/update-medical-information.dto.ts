export class UpdateClientMedicalInformationDto {
  private constructor(
    public readonly clientId: string,
    public readonly trainerId: string,
    public readonly goals?: string,
    public readonly height?: string,
    public readonly weight?: string,
    public readonly injuries?: string,
    public readonly medicalConditions?: string
  ) {}

  static create(props: {
    [key: string]: any;
  }): [string?, UpdateClientMedicalInformationDto?] {
    const {
      goals,
      height,
      weight,
      injuries,
      clientId,
      trainerId,
      medicalConditions,
    } = props;

    if (!clientId) return ["clientId is required", undefined];
    if (!trainerId) return ["trainerId is required", undefined];

    return [
      undefined,
      new UpdateClientMedicalInformationDto(
        clientId,
        trainerId,
        goals,
        height,
        weight,
        injuries,
        medicalConditions
      ),
    ];
  }
}
