import httpStatus from 'http-status';
import AppError from '../../utils/errors/AppError.js';

const errorHandler = (err, _req, res, _next) => {
  let customError = err;
  if (!(err instanceof AppError)) {
    customError = new AppError(
      'Something went wrong.',
      httpStatus.INTERNAL_SERVER_ERROR,
      err.message
    );
  }
  return res.status(customError.statusCode).json(customError);
};

export default errorHandler;
