import { Router } from 'express';
import AuthController from '../controllers/auth.controller.js';

const router = Router();

router.get('/generate-token', AuthController.generateToken);

/**
 * @swagger
 * /auth/generate-token:
 *  get:
 *    summary: Get a jsonwebtoken
 *    description: Use to generate a JWT to use on tasks API
 *    responses:
 *      '200':
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: string
 */

export default router;
