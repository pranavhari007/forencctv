import express from 'express';
import { getAllCases, createCase } from '../controllers/caseController.js';
import { detectVendorSignature } from '../controllers/deviceController.js';
import { startAcquisition } from '../controllers/acquisitionController.js';
import { runSectorCarve } from '../controllers/recoveryController.js';
import { getCustodyBlocks, verifyCustodyIntegrity } from '../controllers/custodyController.js';
import { requireWriteBlockVerification } from '../middleware/writeBlockMiddleware.js';

const router = express.Router();

// Cases
router.get('/cases', getAllCases);
router.post('/cases', createCase);

// Device Identification
router.post('/devices/detect', detectVendorSignature);

// Acquisition (Protected by Write-Block Check)
router.post('/acquisition/start', requireWriteBlockVerification, startAcquisition);

// Video Recovery & Carving
router.post('/recovery/carve', runSectorCarve);

// Chain of Custody
router.get('/custody/blocks', getCustodyBlocks);
router.post('/custody/verify', verifyCustodyIntegrity);

export default router;
