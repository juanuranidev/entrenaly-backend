export class CreateUserDto {
  private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly authId: string,
    public readonly invite?: string | null,
    public readonly image?: string
  ) {}

  static create(data: { [key: string]: any }): [string?, CreateUserDto?] {
    const { name, image, email, authId, invite } = data;

    if (!name) return ["name is required", undefined];
    if (!email) return ["email is required", undefined];
    if (!authId) return ["authId is required", undefined];

    return [undefined, new CreateUserDto(name, email, authId, invite, image)];
  }
}
