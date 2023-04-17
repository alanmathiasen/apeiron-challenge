import httpStatus from 'http-status';
import AuthService from '../services/auth.service.js';
import AppError from '../utils/errors/AppError.js';

class AuthController {
  static generateToken(_req, res) {
    return res.json(AuthService.generateToken());
  }
}

export default AuthController;
