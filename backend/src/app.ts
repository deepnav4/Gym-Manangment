import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import routes
import authRoutes from './modules/auth/auth.routes';
import memberRoutes from './modules/member/member.routes';
import trainerRoutes from './modules/trainer/trainer.routes';

// Load environment variables
dotenv.config();

// Initialize Express app
const app: Application = express();

// ========================================
// MIDDLEWARE
// ========================================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ========================================
// HEALTH CHECK
// ========================================
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Gym Management System API is running',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// ========================================
// API ROUTES
// ========================================
app.use('/api/auth', authRoutes);
app.use('/api/member', memberRoutes);
app.use('/api/trainer', trainerRoutes);

// ========================================
// 404 HANDLER
// ========================================
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// ========================================
// ERROR HANDLER
// ========================================
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

// ========================================
// START SERVER (for local development)
// ========================================
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 http://localhost:${PORT}`);
  });
}

export default app;
