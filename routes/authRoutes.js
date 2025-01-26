import express from 'express';
import { registerBeneficiary } from '../controllers/authController.js';

const router = express.Router();

router.post('/registerBeneficiary', registerBeneficiary);

export default router;
