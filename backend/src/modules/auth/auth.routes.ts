import { Router } from 'express';
import { body } from 'express-validator';
import { signup, login, trainerLoginController } from './auth.controller';

const router = Router();

// ========================================
// MEMBER SIGNUP
// POST /api/auth/signup
// ========================================
router.post(
  '/signup',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
    body('age')
      .isInt({ min: 10, max: 100 })
      .withMessage('Age must be between 10 and 100'),
    body('gender').trim().notEmpty().withMessage('Gender is required'),
    body('phone').trim().notEmpty().withMessage('Phone is required')
  ],
  signup
);

// ========================================
// MEMBER LOGIN
// POST /api/auth/login
// ========================================
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  login
);

// ========================================
// TRAINER LOGIN
// POST /api/auth/trainer/login
// ========================================
router.post(
  '/trainer/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  trainerLoginController
);

export default router;
