import express from 'express';
import { registerAdmin, loginAdmin } from '../controllers/AdminController.js';


const router = express.Router();

// Register Admin Route
router.post('/register', registerAdmin);

// Login Admin Route
router.post('/login', loginAdmin);

export default router;
