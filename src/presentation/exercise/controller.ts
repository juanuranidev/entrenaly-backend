import { CreateExerciseDescriptionDto } from "../../domain/dtos/exercise/create-exercise-description.dto";
import { ExerciseRepository } from "../../domain/repositories/exercise/exercise.repository";
import { Request, Response } from "express";
import { CreateExerciseDto } from "../../domain/dtos/exercise/create-exercise.dto";
import { CreateVariantDto } from "../../domain/dtos/exercise/create-variant.dto";
import { UpdateVariantDto } from "../../domain/dtos/exercise/update-variant.dto";
import { CustomError } from "../../domain/errors/custom.error";

export class ExerciseController {
  constructor(private readonly exerciseRepository: ExerciseRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  };
  public createExercise = async (req: Request, res: Response) => {
    try {
      const { data } = req.body;
      const { id: userId } = req.body.user;

      const [error, createExerciseDto] = CreateExerciseDto.create({
        ...data,
        userId,
      });
      if (error) {
        throw CustomError.badRequest(error);
      }

      const exercise = await this.exerciseRepository.createExercise(
        createExerciseDto!
      );

      res.status(201).json(exercise);
    } catch (error) {
      console.log(error);
      this.handleError(error, res);
    }
  };
  public createVariant = async (req: Request, res: Response) => {
    try {
      const { data } = req.body;
      const { id: userId } = req.body.user;

      const [error, createVariantDto] = CreateVariantDto.create({
        ...data,
        userId,
      });
      if (error) {
        throw CustomError.badRequest(error);
      }

      const variant = await this.exerciseRepository.createVariant(
        createVariantDto!
      );

      res.status(201).json(variant);
    } catch (error) {
      console.log(error);
      this.handleError(error, res);
    }
  };
  public createExerciseDescription = async (req: Request, res: Response) => {
    try {
      const { data } = req.body;
      const { id: userId } = req.body.user;

      const [error, createExerciseDescriptionDto] =
        CreateExerciseDescriptionDto.create({
          description: data,
          userId,
        });
      if (error) {
        throw CustomError.badRequest(error);
      }

      const exerciseDescription =
        await this.exerciseRepository.createExerciseDescription(
          createExerciseDescriptionDto!
        );

      return res.status(200).json(exerciseDescription);
    } catch (error) {
      console.log(error);
      this.handleError(error, res);
    }
  };
  public readExercises = async (req: Request, res: Response) => {
    try {
      const { id } = req.body.user;
      const { name, exerciseCategoryId } = req.query;

      const exercises = await this.exerciseRepository.readExercises(
        id,
        name,
        exerciseCategoryId
      );

      return res.status(200).json(exercises);
    } catch (error) {
      console.log(error);
      this.handleError(error, res);
    }
  };
  public readExercisesCategories = async (req: Request, res: Response) => {
    try {
      const exercisesCategoriesList =
        await this.exerciseRepository.readExercisesCategories();

      return res.status(200).json(exercisesCategoriesList);
    } catch (error) {
      console.log(error);
      this.handleError(error, res);
    }
  };
  public readExercisesDescriptions = async (req: Request, res: Response) => {
    try {
      const { id: userId } = req.body.user;

      const exercisesDescriptionsList =
        await this.exerciseRepository.readExercisesDescriptions(userId);

      return res.status(200).json(exercisesDescriptionsList);
    } catch (error) {
      console.log(error);
      this.handleError(error, res);
    }
  };
  public updateVariant = async (req: Request, res: Response) => {
    try {
      const { data } = req.body;
      const { id: userId } = req.body.user;

      const [error, updateVariantDto] = UpdateVariantDto.create({
        ...data,
        userId,
      });
      if (error) {
        throw CustomError.badRequest(error);
      }

      const variant = await this.exerciseRepository.updateVariant(
        updateVariantDto!
      );

      res.status(201).json(variant);
    } catch (error) {
      console.log(error);
      this.handleError(error, res);
    }
  };
}
