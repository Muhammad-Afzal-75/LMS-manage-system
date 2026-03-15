import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import Course from './models/Course.js';
import seedData from './seed.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB().then(async () => {
  if (process.env.NODE_ENV === 'production') {
    const courseCount = await Course.countDocuments();
    if (courseCount === 0) {
      console.log('Production database is empty. Seeding initial data...');
      await seedData();
    }
  }
});

import userRoutes from './routes/userRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import enrollmentRoutes from './routes/enrollmentRoutes.js';

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://lms-frontend-y2x2.onrender.com',
    'https://mern-stack-lms-livid.vercel.app'
  ],
  credentials: true
}));

// Mount routers
app.use('/api', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api', enrollmentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
