export class LoginUserDto {
  private constructor(public readonly authId: string) {}

  static create(props: { [key: string]: any }): [string?, LoginUserDto?] {
    const { authId } = props;

    if (!authId) return ["authId is required", undefined];

    return [undefined, new LoginUserDto(authId)];
  }
}
