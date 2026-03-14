import express from 'express';
import { registerUser, loginUser, getUsers, deleteUser } from '../controllers/authController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Admin only routes
router.route('/users')
  .get(protect, authorize('admin'), getUsers);

router.route('/users/:id')
  .delete(protect, authorize('admin'), deleteUser);

export default router;
