/**
 * Serverless wrapper for Vercel deployment
 * This file exports the Express app as a serverless function
 */

import app from './app';

// Export for Vercel serverless functions
export default app;
