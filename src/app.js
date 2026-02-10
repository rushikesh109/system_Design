import express from "express";
import userRoutes from "./routes/users.routes.js";
import { logger } from "./middleware/logger.middleware.js";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware.js";
import cors from "cors"

const app = express();

//Global middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true})) // parse URL-encoded body
app.use(logger);


// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Test error handling
app.get('/error-test', (req, res) => {
  throw new Error('This is a test error!');
});

app.use('/api/users', userRoutes);

//404 handler (must be after all routes)
app.use(notFoundHandler);

//Error handler (must be last)
app.use(errorHandler);

export default app;
