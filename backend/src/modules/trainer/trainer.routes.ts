import { Router } from 'express';
import { body } from 'express-validator';
import { authenticateToken } from '../../middleware/auth';
import { requireRole } from '../../middleware/roleGuard';
import {
  getMembers,
  updateWorkoutPlan,
  updateDietPlan,
  updateProgress,
  createAttendance
} from './trainer.controller';

const router = Router();

// All trainer routes require authentication and trainer role
router.use(authenticateToken);
router.use(requireRole('trainer'));

// ========================================
// GET /api/trainer/members
// Get all members
// ========================================
router.get('/members', getMembers);

// ========================================
// PUT /api/trainer/members/:id/workout
// Update member's workout plan
// ========================================
router.put(
  '/members/:id/workout',
  [
    body('plan_details')
      .trim()
      .notEmpty()
      .withMessage('Workout plan details are required')
  ],
  updateWorkoutPlan
);

// ========================================
// PUT /api/trainer/members/:id/diet
// Update member's diet plan
// ========================================
router.put(
  '/members/:id/diet',
  [
    body('diet_details')
      .trim()
      .notEmpty()
      .withMessage('Diet plan details are required')
  ],
  updateDietPlan
);

// ========================================
// PUT /api/trainer/members/:id/progress
// Update member's progress
// ========================================
router.put(
  '/members/:id/progress',
  [
    body('weight').isFloat({ min: 0 }).withMessage('Valid weight is required'),
    body('body_fat').isFloat({ min: 0, max: 100 }).withMessage('Valid body fat percentage is required'),
    body('muscle_mass').isFloat({ min: 0 }).withMessage('Valid muscle mass is required'),
    body('notes').optional().trim()
  ],
  updateProgress
);

// ========================================
// POST /api/trainer/members/:id/attendance
// Record member's attendance
// ========================================
router.post(
  '/members/:id/attendance',
  [
    body('status')
      .isIn(['present', 'absent', 'leave'])
      .withMessage('Status must be present, absent, or leave')
  ],
  createAttendance
);

export default router;
