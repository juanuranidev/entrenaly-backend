export class CreateUserWithGoogleDto {
  private constructor(
    public readonly name: string,
    public readonly image: string,
    public readonly email: string,
    public readonly authId: string,
    public readonly invite?: string | null
  ) {}

  static create(data: {
    [key: string]: any;
  }): [string?, CreateUserWithGoogleDto?] {
    const { name, image, email, authId, invite } = data;

    if (!name) return ["name is required", undefined];
    if (!image) return ["Image is required", undefined];
    if (!email) return ["email is required", undefined];
    if (!authId) return ["authId is required", undefined];

    return [
      undefined,
      new CreateUserWithGoogleDto(name, image, email, authId, invite),
    ];
  }
}
