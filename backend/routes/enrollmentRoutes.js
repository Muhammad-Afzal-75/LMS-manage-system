import express from 'express';
import { enrollCourse, getMyCourses } from '../controllers/enrollmentController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/enroll', protect, authorize('student'), enrollCourse);
router.get('/my-courses', protect, authorize('student'), getMyCourses);

export default router;
