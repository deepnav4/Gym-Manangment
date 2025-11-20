import { Router } from 'express';
import { authenticateToken } from '../../middleware/auth';
import { requireRole } from '../../middleware/roleGuard';
import {
  getProfile,
  getWorkoutPlan,
  getDietPlan,
  getAttendance,
  getProgress
} from './member.controller';

const router = Router();

// All member routes require authentication and member role
router.use(authenticateToken);
router.use(requireRole('member'));

// ========================================
// GET /api/member/profile
// Get member profile
// ========================================
router.get('/profile', getProfile);

// ========================================
// GET /api/member/my/workout
// Get member's workout plans
// ========================================
router.get('/my/workout', getWorkoutPlan);

// ========================================
// GET /api/member/my/diet
// Get member's diet plans
// ========================================
router.get('/my/diet', getDietPlan);

// ========================================
// GET /api/member/my/attendance
// Get member's attendance records
// ========================================
router.get('/my/attendance', getAttendance);

// ========================================
// GET /api/member/my/progress
// Get member's progress records
// ========================================
router.get('/my/progress', getProgress);

export default router;
