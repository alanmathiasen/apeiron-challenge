import jwt from 'jsonwebtoken';
import config from '../../config/index.js';

class AuthService {
  static generateToken(exampleId) {
    const payload = {
      sub: exampleId,
      iat: Math.floor(Date.now() / 1000),
    };
    const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '1h' });
    return token;
  }

  static validateToken(token) {
    return jwt.verify(token, config.JWT_SECRET);
  }
}

export default AuthService;
