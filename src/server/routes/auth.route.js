import { Router } from 'express';
import AuthController from '../controllers/auth.controller.js';

const router = Router();

router.get('/generate-token', AuthController.generateToken);

export default router;
