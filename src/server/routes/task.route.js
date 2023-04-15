import { Router } from 'express';
import { TaskController } from '../controllers/index.js';

const router = Router();

router.get('/', TaskController.create);

export default router;
