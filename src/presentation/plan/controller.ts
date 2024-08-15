import { CreateWeeklyPlanDto } from "../../domain/dtos/plan/create-weekly-plan.dto";
import { UpdateWeeklyPlanDto } from "../../domain/dtos/plan/update-weekly-plan.dto";
import { Request, Response } from "express";
import { PlanRepository } from "../../domain/repositories/plan/plan.repository";
import { CustomError } from "../../domain/errors/custom.error";
import { CreateCircuitPlanDto } from "../../domain/dtos/plan/create-circuit-plan.dto";
import { UpdateCircuitPlanDto } from "../../domain/dtos/plan/update-circuit-plan.dto";

export class PlanController {
  constructor(private readonly planRepository: PlanRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  };
  public createWeeklyPlan = async (req: Request, res: Response) => {
    try {
      const { data } = req.body;
      const { id: trainerId } = req.body.user;

      const [error, createWeeklyPlanDto] = CreateWeeklyPlanDto.create({
        ...data,
        trainerId,
      });
      if (error) {
        return res.status(400).json({ error });
      }

      const weeklyPlan = await this.planRepository.createWeeklyPlan(
        createWeeklyPlanDto!
      );

      return res.status(201).json(weeklyPlan);
    } catch (error) {
      console.log(error);
      this.handleError(error, res);
    }
  };
  public createCircuitPlan = async (req: Request, res: Response) => {
    try {
      const { data } = req.body;
      const { id: trainerId } = req.body.user;

      const [error, createCircuitPlanDto] = CreateCircuitPlanDto.create({
        ...data,
        trainerId,
      });
      if (error) {
        return res.status(400).json({ error });
      }

      const circuitPlan = await this.planRepository.createCircuitPlan(
        createCircuitPlanDto!
      );

      return res.status(201).json(circuitPlan);
    } catch (error) {
      console.log(error);
      this.handleError(error, res);
    }
  };
  public readPlansTypes = async (req: Request, res: Response) => {
    try {
      const plansList = await this.planRepository.readPlansTypes();

      return res.status(201).json(plansList);
    } catch (error) {
      console.log(error);
      this.handleError(error, res);
    }
  };
  public readDaysOfWeek = async (req: Request, res: Response) => {
    try {
      const daysOfWeekList = await this.planRepository.readDaysOfWeek();

      return res.status(201).json(daysOfWeekList);
    } catch (error) {
      console.log(error);
      this.handleError(error, res);
    }
  };
  public readPlansCategories = async (req: Request, res: Response) => {
    try {
      const planCategories = await this.planRepository.readPlansCategories();

      return res.status(201).json(planCategories);
    } catch (error) {
      console.log(error);
      this.handleError(error, res);
    }
  };
  public readPlansByUserId = async (req: Request, res: Response) => {
    try {
      const { id: userId } = req.body.user;

      const plansList = await this.planRepository.readPlansByUserId(userId);

      return res.status(201).json(plansList);
    } catch (error) {
      console.log(error);
      this.handleError(error, res);
    }
  };
  public readPlansByClientId = async (req: Request, res: Response) => {
    try {
      const { clientId } = req.query;

      const plansList = await this.planRepository.readPlansByClientId(clientId);

      return res.status(201).json(plansList);
    } catch (error) {
      console.log(error);
      this.handleError(error, res);
    }
  };
  public readWeeklyPlan = async (req: Request, res: Response) => {
    try {
      const { planId } = req.query;

      const plan = await this.planRepository.readWeeklyPlan(planId);

      return res.status(201).json(plan);
    } catch (error) {
      console.log(error);
      this.handleError(error, res);
    }
  };
  public readCircuitPlan = async (req: Request, res: Response) => {
    try {
      const { planId } = req.query;

      const plan = await this.planRepository.readCircuitPlan(planId);

      return res.status(201).json(plan);
    } catch (error) {
      console.log(error);
      this.handleError(error, res);
    }
  };
  public updateWeeklyPlan = async (req: Request, res: Response) => {
    try {
      const { data } = req.body;
      const { id: trainerId } = req.body.user;

      const [error, updateWeeklyPlanDto] = UpdateWeeklyPlanDto.create({
        ...data,
        trainerId,
      });
      if (error) {
        return res.status(400).json({ error });
      }

      const plan = await this.planRepository.updateWeeklyPlan(
        updateWeeklyPlanDto!
      );

      return res.status(201).json(plan);
    } catch (error) {
      console.log(error);
      this.handleError(error, res);
    }
  };
  public updateCircuitPlan = async (req: Request, res: Response) => {
    try {
      const { data } = req.body;
      const { id: trainerId } = req.body.user;

      const [error, updateCircuitPlanDto] = UpdateCircuitPlanDto.create({
        ...data,
        trainerId,
      });
      if (error) {
        return res.status(400).json({ error });
      }

      const plan = await this.planRepository.updateCircuitPlan(
        updateCircuitPlanDto!
      );

      return res.status(201).json(plan);
    } catch (error) {
      console.log(error);
      this.handleError(error, res);
    }
  };
  public deleteWeeklyPlan = async (req: Request, res: Response) => {
    try {
      const { planId } = req.query;
      const { id: trainerId } = req.body.user;

      const plan = await this.planRepository.deleteWeeklyPlan(
        planId,
        trainerId
      );

      return res.status(201).json(plan);
    } catch (error) {
      console.log(error);
      this.handleError(error, res);
    }
  };
}
