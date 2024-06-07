export class CreateGoogleUserDto {
  private constructor(
    public readonly name: string,
    public readonly image: string,
    public readonly email: string,
    public readonly authId: string,
    public readonly invite?: string | null
  ) {}

  static create(props: {
    [key: string]: any;
  }): [string?, CreateGoogleUserDto?] {
    const { name, image, email, authId, invite } = props;

    if (!name) return ["name in CreateGoogleUserDto is required", undefined];
    if (!image) return ["Image in CreateGoogleUserDto is required", undefined];
    if (!email) return ["email in CreateGoogleUserDto is required", undefined];
    if (!authId)
      return ["authId in CreateGoogleUserDto is required", undefined];

    return [
      undefined,
      new CreateGoogleUserDto(name, image, email, authId, invite),
    ];
  }
}
