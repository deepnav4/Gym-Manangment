import { Response } from 'express';
import { AuthRequest } from '../../middleware/auth';
import {
  getMemberProfile,
  getMemberWorkoutPlan,
  getMemberDietPlan,
  getMemberAttendance,
  getMemberProgress
} from './member.service';

// ========================================
// GET PROFILE CONTROLLER
// ========================================
export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const memberId = req.user!.id;
    const profile = await getMemberProfile(memberId);

    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'Failed to fetch profile'
    });
  }
};

// ========================================
// GET WORKOUT PLAN CONTROLLER
// ========================================
export const getWorkoutPlan = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const memberId = req.user!.id;
    const workoutPlans = await getMemberWorkoutPlan(memberId);

    res.status(200).json({
      success: true,
      data: workoutPlans
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch workout plans'
    });
  }
};

// ========================================
// GET DIET PLAN CONTROLLER
// ========================================
export const getDietPlan = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const memberId = req.user!.id;
    const dietPlans = await getMemberDietPlan(memberId);

    res.status(200).json({
      success: true,
      data: dietPlans
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch diet plans'
    });
  }
};

// ========================================
// GET ATTENDANCE CONTROLLER
// ========================================
export const getAttendance = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const memberId = req.user!.id;
    const attendance = await getMemberAttendance(memberId);

    res.status(200).json({
      success: true,
      data: attendance
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch attendance'
    });
  }
};

// ========================================
// GET PROGRESS CONTROLLER
// ========================================
export const getProgress = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const memberId = req.user!.id;
    const progress = await getMemberProgress(memberId);

    res.status(200).json({
      success: true,
      data: progress
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch progress'
    });
  }
};
