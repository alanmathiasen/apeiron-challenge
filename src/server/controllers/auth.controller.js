import AuthService from '../services/auth.service.js';

class AuthController {
  static generateToken(_req, res) {
    return res.json(AuthService.generateToken());
  }
}

export default AuthController;
