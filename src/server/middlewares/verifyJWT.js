import httpStatus from 'http-status';
import AppError from '../utils/errors/AppError.js';
import AuthService from '../services/auth.service.js';

const verifyJWT = (req, res, next) => {
  try {
    const bearerHeader = req.headers.authorization;
    let isValid;
    if (bearerHeader) {
      const token = bearerHeader.split(' ')[1];
      isValid = AuthService.validateToken(token);
    }
    if (!bearerHeader || !isValid) throw Error;
    return next();
  } catch (err) {
    return next(
      new AppError('You must provide a valid token', httpStatus.UNAUTHORIZED)
    );
  }
};

export default verifyJWT;
