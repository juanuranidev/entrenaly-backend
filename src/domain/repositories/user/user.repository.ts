import { UserEntity } from "../../entities/user/user.entity";
import { CreateUserDto } from "../../dtos/user/create-user.dto";
import { AppReleaseEntity } from "../../entities/plan/app-release";
import { CreateUserWithGoogleDto } from "../../dtos/user/create-user-with-google.dto";

export abstract class UserRepository {
  abstract createUser(registerUser: CreateUserDto): Promise<UserEntity>;
  abstract createUserWithGoogleAuth(
    googleUserDto: CreateUserWithGoogleDto
  ): Promise<UserEntity>;
  abstract readAppReleases(): Promise<AppReleaseEntity[]>;
  abstract readUser(id: string): Promise<UserEntity>;
  abstract readUserByAuthId(authId: string): Promise<UserEntity>;
}
