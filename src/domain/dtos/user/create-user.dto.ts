export class CreateUserDto {
  private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly authId: string,
    public readonly invite?: string | null,
    public readonly image?: string
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateUserDto?] {
    const { name, image, email, authId, invite } = props;

    if (!name) return ["name in CreateUserDto is required", undefined];
    if (!email) return ["email in CreateUserDto is required", undefined];
    if (!authId) return ["authId in CreateUserDto is required", undefined];

    return [undefined, new CreateUserDto(name, email, authId, invite, image)];
  }
}
