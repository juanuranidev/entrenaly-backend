export class UpdateClientMedicalInformationDto {
  private constructor(
    public readonly clientId: string,
    public readonly typeOfBody?: string,
    public readonly goals?: string,
    public readonly height?: string,
    public readonly weight?: string,
    public readonly injuries?: string,
    public readonly medicalConditions?: string
  ) {}

  static create(data: {
    [key: string]: any;
  }): [string?, UpdateClientMedicalInformationDto?] {
    const {
      clientId,
      typeOfBody,
      goals,
      height,
      weight,
      injuries,
      medicalConditions,
    } = data;

    if (!clientId) return ["clientId is required", undefined];

    return [
      undefined,
      new UpdateClientMedicalInformationDto(
        clientId,
        typeOfBody,
        goals,
        height,
        weight,
        injuries,
        medicalConditions
      ),
    ];
  }
}
