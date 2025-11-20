import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth';

/**
 * Middleware to check if user has required role
 * @param roles - Array of allowed roles
 */
export const requireRole = (...roles: Array<'member' | 'trainer'>) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: `Access denied. Required role: ${roles.join(' or ')}`
      });
      return;
    }

    next();
  };
};
