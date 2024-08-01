import { CreateUserWithGoogleDto } from "../../domain/dtos/user/create-user-with-google.dto";
import { Request, Response } from "express";
import { UserRepository } from "../../domain/repositories/user/user.repository";
import { CreateUserDto } from "../../domain/dtos/user/create-user.dto";
import { CustomError } from "../../domain/errors/custom.error";

export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  };
  public createUser = async (req: Request, res: Response) => {
    try {
      const { data } = req.body;

      const [error, registerUserDto] = CreateUserDto.create(data);
      if (error) {
        return res.status(400).json({ error });
      }

      const userRegistered = await this.userRepository.createUser(
        registerUserDto!
      );

      return res.status(201).json(userRegistered);
    } catch (error) {
      this.handleError(error, res);
    }
  };
  public createUserWithGoogleAuth = async (req: Request, res: Response) => {
    try {
      const { data } = req.body;

      const [error, googleUserDto] = CreateUserWithGoogleDto.create(data);
      if (error) {
        return res.status(400).json({ error });
      }

      const user = await this.userRepository.createUserWithGoogleAuth(
        googleUserDto!
      );

      return res.status(201).json(user);
    } catch (error) {
      this.handleError(error, res);
    }
  };
  public readAppReleases = async (req: Request, res: Response) => {
    try {
      const appReleasesList = await this.userRepository.readAppReleases();

      return res.status(201).json(appReleasesList);
    } catch (error) {
      this.handleError(error, res);
    }
  };
  public readUser = async (req: Request, res: Response) => {
    try {
      const { id: trainerId } = req.body.user;
      if (!trainerId) {
        return this.handleError("trainerId not given", res);
      }

      const user = await this.userRepository.readUser(trainerId);

      return res.status(200).json(user);
    } catch (error) {
      this.handleError(error, res);
    }
  };
  public readUserByAuthId = async (req: Request, res: Response) => {
    try {
      const { authId } = req.query;
      if (!authId) {
        return this.handleError("authId not given", res);
      }

      const user = await this.userRepository.readUserByAuthId(String(authId));

      return res.status(200).json(user);
    } catch (error) {
      this.handleError(error, res);
    }
  };
}
