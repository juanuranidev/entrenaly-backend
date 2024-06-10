import { UserEntity } from "../../entities/user/user.entity";
import { CustomError } from "../../errors/custom.error";
import { CreateUserDto } from "../../dtos/user/create-user.dto";
import { CreateGoogleUserDto } from "../../dtos/user/create-google-user.dto";

export abstract class UserRepository {
  abstract readUser(id: string): Promise<UserEntity | CustomError>;
  abstract readUserByAuthId(authId: string): Promise<UserEntity | CustomError>;
  abstract postUser(
    registerUser: CreateUserDto
  ): Promise<UserEntity | CustomError>;
  abstract postUserWithGoogleAuth(
    googleUserDto: CreateGoogleUserDto
  ): Promise<UserEntity | CustomError>;
}
