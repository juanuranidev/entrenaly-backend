export class RegisterUserDto {
  private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly authId: string
  ) {}

  static create(props: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { name, image, email, authId } = props;

    if (!name) return ["Name is required", undefined];
    if (!email) return ["email is required", undefined];
    if (!authId) return ["authId is required", undefined];

    return [undefined, new RegisterUserDto(name, email, authId)];
  }
}
