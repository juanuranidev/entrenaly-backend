import { CreateExerciseDescriptionDto } from "../../dtos/exercise/create-exercise-description.dto";
import { ExerciseDescriptionEntity } from "../../entities/exercise/exercise-description.entity";
import { ExerciseCategoryEntity } from "../../entities/exercise/exercise-category.entity";
import { CreateExerciseDto } from "../../dtos/exercise/create-exercise.dto";
import { CreateVariantDto } from "../../dtos/exercise/create-variant.dto";
import { UpdateVariantDto } from "../../dtos/exercise/update-variant.dto";
import { ExerciseEntity } from "../../entities/exercise/exercise.entity";
import { VariantEntity } from "../../entities/exercise/variant.entity";

export abstract class ExerciseRepository {
  abstract createExercise(
    createExerciseDto: CreateExerciseDto
  ): Promise<ExerciseEntity>;
  abstract createVariant(variant: CreateVariantDto): Promise<VariantEntity>;
  abstract createExerciseDescription(
    createExerciseDescriptionDto: CreateExerciseDescriptionDto
  ): Promise<ExerciseDescriptionEntity>;
  abstract readExercises(
    userId: string,
    name?: any,
    exerciseCategoryId?: any
  ): Promise<ExerciseEntity[]>;
  abstract readExercisesCategories(): Promise<ExerciseCategoryEntity[]>;
  abstract readExercisesDescriptions(
    userId: string
  ): Promise<ExerciseDescriptionEntity[]>;
  abstract updateVariant(variant: UpdateVariantDto): Promise<VariantEntity>;
}
