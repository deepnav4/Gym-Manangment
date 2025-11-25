import { Response } from 'express';
import { validationResult } from 'express-validator';
import { AuthRequest } from '../../middleware/auth';
import {
  getAllMembers,
  updateMemberWorkoutPlan,
  updateMemberDietPlan,
  updateMemberProgress,
  createMemberAttendance
} from './trainer.service';

// ========================================
// GET ALL MEMBERS CONTROLLER
// ========================================
export const getMembers = async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const members = await getAllMembers();

    res.status(200).json({
      success: true,
      data: members,
      count: members.length
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch members'
    });
  }
};

// ========================================
// UPDATE WORKOUT PLAN CONTROLLER
// ========================================
export const updateWorkoutPlan = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        errors: errors.array()
      });
      return;
    }

    const { id: memberId } = req.params;
    const trainerId = req.user!.id;
    const { plan_details } = req.body;

    const workoutPlan = await updateMemberWorkoutPlan(memberId, trainerId, plan_details);

    res.status(200).json({
      success: true,
      message: 'Workout plan updated successfully',
      data: workoutPlan
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to update workout plan'
    });
  }
};

// ========================================
// UPDATE DIET PLAN CONTROLLER
// ========================================
export const updateDietPlan = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        errors: errors.array()
      });
      return;
    }

    const { id: memberId } = req.params;
    const trainerId = req.user!.id;
    const { diet_details } = req.body;

    const dietPlan = await updateMemberDietPlan(memberId, trainerId, diet_details);

    res.status(200).json({
      success: true,
      message: 'Diet plan updated successfully',
      data: dietPlan
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to update diet plan'
    });
  }
};

// ========================================
// UPDATE PROGRESS CONTROLLER
// ========================================
export const updateProgress = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        errors: errors.array()
      });
      return;
    }

    const { id: memberId } = req.params;
    const trainerId = req.user!.id;
    const { weight, body_fat, muscle_mass, notes } = req.body;

    const progress = await updateMemberProgress(memberId, trainerId, {
      weight: parseFloat(weight),
      body_fat: parseFloat(body_fat),
      muscle_mass: parseFloat(muscle_mass),
      notes
    });

    res.status(200).json({
      success: true,
      message: 'Progress updated successfully',
      data: progress
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to update progress'
    });
  }
};

// ========================================
// CREATE ATTENDANCE CONTROLLER
// ========================================
export const createAttendance = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        errors: errors.array()
      });
      return;
    }

    const { id: memberId } = req.params;
    const { status } = req.body;

    const attendance = await createMemberAttendance(memberId, status);

    res.status(201).json({
      success: true,
      message: 'Attendance recorded successfully',
      data: attendance
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to record attendance'
    });
  }
};
