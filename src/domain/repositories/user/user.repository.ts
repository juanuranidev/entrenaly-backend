import { UserEntity } from "../../entities/user/user.entity";
import { CustomError } from "../../errors/custom.error";
import { CreateUserDto } from "../../dtos/user/create-user.dto";
import { CreateUserWithGoogleDto } from "../../dtos/user/create-user-with-google.dto";

export abstract class UserRepository {
  abstract readUser(id: string): Promise<UserEntity | CustomError>;
  abstract readUserByAuthId(authId: string): Promise<UserEntity | CustomError>;
  abstract createUser(
    registerUser: CreateUserDto
  ): Promise<UserEntity | CustomError>;
  abstract createUserWithGoogleAuth(
    googleUserDto: CreateUserWithGoogleDto
  ): Promise<UserEntity | CustomError>;
}
