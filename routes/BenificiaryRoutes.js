import express from 'express';
import { registerBeneficiary , getAllBeneficiaries ,deleteBeneficiary ,updateBeneficiary, scanQRCode} from '../controllers/BeneficiaryController.js';

const router = express.Router();

router.post('/registerBeneficiary', registerBeneficiary);

router.get('/scan/:uniqueId', scanQRCode);

// Get all beneficiaries route
router.get('/allBeneficiary', getAllBeneficiaries);

// Update a specific beneficiary route
router.put('/updateBeneficiary/:id', updateBeneficiary);

// Delete a specific beneficiary route
router.delete('/deleteBeneficiary/:id', deleteBeneficiary);

export default router;
