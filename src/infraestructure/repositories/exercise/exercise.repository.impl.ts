import {
  variants,
  exercises,
  exercisesCategories,
  exercisesDescriptions,
} from "../../db/schemas";
import { CreateExerciseDescriptionDto } from "../../../domain/dtos/exercise/create-exercise-description.dto";
import { ExerciseDescriptionEntity } from "../../../domain/entities/exercise/exercise-description.entity";
import { ExerciseCategoryEntity } from "../../../domain/entities/exercise/exercise-category.entity";
import { and, eq, ilike, isNull, or } from "drizzle-orm";
import { ExerciseRepository } from "../../../domain/repositories/exercise/exercise.repository";
import { CreateExerciseDto } from "../../../domain/dtos/exercise/create-exercise.dto";
import { CreateVariantDto } from "../../../domain/dtos/exercise/create-variant.dto";
import { UpdateVariantDto } from "../../../domain/dtos/exercise/update-variant.dto";
import { ExerciseEntity } from "../../../domain/entities/exercise/exercise.entity";
import { VariantEntity } from "../../../domain/entities/exercise/variant.entity";
import { CustomError } from "../../../domain/errors/custom.error";
import { db } from "../../db";

export class ExerciseRepositoryImpl implements ExerciseRepository {
  async readExercises(
    userId: string,
    name?: string
  ): Promise<ExerciseEntity[] | CustomError> {
    try {
      const exercisesList = await db
        .select({
          main: exercises,
          variant: variants,
          category: exercisesCategories,
          userId: exercises.userId,
        })
        .from(exercises)
        .leftJoin(
          exercisesCategories,
          eq(exercisesCategories.id, exercises.categoryId)
        )
        .leftJoin(
          variants,
          and(
            eq(variants.exerciseId, exercises.id),
            eq(variants.userId, userId)
          )
        )
        .where(
          and(
            or(
              name ? ilike(exercises.name, `%${name}%`) : undefined,
              name ? ilike(variants.name, `%${name}%`) : undefined
            ),
            or(isNull(exercises.userId), eq(exercises.userId, userId))
          )
        );

      return exercisesList.map((exercise) =>
        ExerciseEntity.fromObject({
          ...exercise.main,
          variant: exercise.variant,
          category: exercise.category,
          hasUser: Boolean(exercise.userId),
        })
      );
    } catch (error) {
      return CustomError.internalServer(String(error));
    }
  }
  async createVariant(
    createVariantDto: CreateVariantDto
  ): Promise<VariantEntity | CustomError> {
    try {
      const [exercise] = await db
        .select({
          id: exercises.id,
        })
        .from(exercises)
        .where(eq(exercises.id, createVariantDto.exerciseId));

      if (!exercise) {
        return CustomError.notFound("Exercise not found");
      }

      const [newVariant] = await db
        .insert(variants)
        .values({ ...createVariantDto, exerciseId: exercise.id })
        .returning({
          id: variants.id,
          name: variants.name,
          video: variants.video,
          category: variants.categoryId,
          image: variants.image,
        });

      if (!newVariant) {
        return CustomError.internalServer("Error creating the variant");
      }

      return VariantEntity.fromObject(newVariant);
    } catch (error) {
      return CustomError.internalServer(String(error));
    }
  }
  async updateVariant(
    updateVariantDto: UpdateVariantDto
  ): Promise<VariantEntity | CustomError> {
    try {
      const [updatedVariant] = await db
        .update(variants)
        .set({
          name: updateVariantDto.name,
          video: updateVariantDto.video,
          userId: updateVariantDto.userId,
          categoryId: updateVariantDto.categoryId,
          image: updateVariantDto.image,
        })
        .where(eq(variants.id, updateVariantDto.variantId))
        .returning({
          id: variants.id,
          name: variants.name,
          video: variants.video,
          category: variants.categoryId,
          image: variants.image,
        });

      if (!updatedVariant) {
        return CustomError.notFound("Variant not found");
      }

      return VariantEntity.fromObject(updatedVariant);
    } catch (error) {
      return CustomError.internalServer(String(error));
    }
  }
  async readExercisesCategories(): Promise<
    ExerciseCategoryEntity[] | CustomError
  > {
    try {
      const exercisesCategoriesList = await db
        .select()
        .from(exercisesCategories);

      return exercisesCategoriesList.map((exerciseCategory) =>
        ExerciseCategoryEntity.fromObject(exerciseCategory)
      );
    } catch (error) {
      return CustomError.internalServer(String(error));
    }
  }
  async readExercisesDescriptions(
    userId: string
  ): Promise<ExerciseDescriptionEntity[] | CustomError> {
    try {
      const exercisesDescriptionsList = await db
        .select({
          id: exercisesDescriptions.id,
          description: exercisesDescriptions.description,
        })
        .from(exercisesDescriptions)
        .where(eq(exercisesDescriptions.userId, userId));

      return exercisesDescriptionsList.map((exerciseDescription) =>
        ExerciseDescriptionEntity.fromObject(exerciseDescription)
      );
    } catch (error) {
      return CustomError.internalServer(String(error));
    }
  }
  async createExerciseDescription(
    createExerciseDescriptionDto: CreateExerciseDescriptionDto
  ): Promise<ExerciseDescriptionEntity | CustomError> {
    try {
      const [newExerciseDescription] = await db
        .insert(exercisesDescriptions)
        .values({ ...createExerciseDescriptionDto })
        .returning({
          id: exercisesDescriptions.id,
          description: exercisesDescriptions.description,
        });

      if (!newExerciseDescription) {
        return CustomError.internalServer(
          "Error creating the exercise description"
        );
      }

      return ExerciseDescriptionEntity.fromObject(newExerciseDescription);
    } catch (error: any) {
      throw CustomError.internalServer(error);
    }
  }
  async createExercise(
    createExerciseDto: CreateExerciseDto
  ): Promise<ExerciseEntity | CustomError> {
    try {
      const [newExercise] = await db
        .insert(exercises)
        .values({ ...createExerciseDto })
        .returning({
          id: exercises.id,
          name: exercises.name,
          video: exercises.video,
          category: exercises.categoryId,
          image: exercises.image,
        });

      if (!newExercise) {
        return CustomError.internalServer("Error creating the exercise");
      }

      return ExerciseEntity.fromObject(newExercise);
    } catch (error: any) {
      throw CustomError.internalServer(error);
    }
  }
}
