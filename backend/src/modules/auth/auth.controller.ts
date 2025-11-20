import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { memberSignup, memberLogin, trainerLogin } from './auth.service';

// ========================================
// MEMBER SIGNUP CONTROLLER
// ========================================
export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        errors: errors.array()
      });
      return;
    }

    const { name, email, password, age, gender, phone } = req.body;

    // Call service
    const result = await memberSignup({
      name,
      email,
      password,
      age: parseInt(age),
      gender,
      phone
    });

    res.status(201).json({
      success: true,
      message: 'Member registered successfully',
      data: result
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Signup failed'
    });
  }
};

// ========================================
// MEMBER LOGIN CONTROLLER
// ========================================
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        errors: errors.array()
      });
      return;
    }

    const { email, password } = req.body;

    // Call service
    const result = await memberLogin(email, password);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: result
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message || 'Login failed'
    });
  }
};

// ========================================
// TRAINER LOGIN CONTROLLER
// ========================================
export const trainerLoginController = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        errors: errors.array()
      });
      return;
    }

    const { email, password } = req.body;

    // Call service
    const result = await trainerLogin(email, password);

    res.status(200).json({
      success: true,
      message: 'Trainer login successful',
      data: result
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message || 'Trainer login failed'
    });
  }
};
