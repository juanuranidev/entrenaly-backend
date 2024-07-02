import { CreateExerciseDescriptionDto } from "../../dtos/exercise/create-exercise-description.dto";
import { ExerciseDescriptionEntity } from "../../entities/exercise/exercise-description.entity";
import { ExerciseCategoryEntity } from "../../entities/exercise/exercise-category.entity";
import { CreateExerciseDto } from "../../dtos/exercise/create-exercise.dto";
import { CreateVariantDto } from "../../dtos/exercise/create-variant.dto";
import { UpdateVariantDto } from "../../dtos/exercise/update-variant.dto";
import { ExerciseEntity } from "../../entities/exercise/exercise.entity";
import { VariantEntity } from "../../entities/exercise/variant.entity";
import { CustomError } from "../../errors/custom.error";

export abstract class ExerciseRepository {
  abstract createExercise(
    createExerciseDto: CreateExerciseDto
  ): Promise<ExerciseEntity | CustomError>;
  abstract createVariant(
    variant: CreateVariantDto
  ): Promise<VariantEntity | CustomError>;
  abstract createExerciseDescription(
    createExerciseDescriptionDto: CreateExerciseDescriptionDto
  ): Promise<ExerciseDescriptionEntity | CustomError>;
  abstract readExercises(
    userId: string,
    name?: any,
    exerciseCategoryId?: any
  ): Promise<ExerciseEntity[] | CustomError>;
  abstract readExercisesCategories(): Promise<
    ExerciseCategoryEntity[] | CustomError
  >;
  abstract readExercisesDescriptions(
    userId: string
  ): Promise<ExerciseDescriptionEntity[] | CustomError>;
  abstract updateVariant(
    variant: UpdateVariantDto
  ): Promise<VariantEntity | CustomError>;
}
