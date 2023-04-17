import { matchedData, validationResult } from 'express-validator';
import httpStatus from 'http-status';
import taskValidation from './task.validation.js';
import AppError from '../../utils/errors/AppError.js';

const validateRequest = (req, _res, next) => {
  // if extra fields exist throw error instead of ignoring
  const validationFields = matchedData(req, {
    locations: ['body'],
    includeOptionals: true,
  });
  const errors = validationResult(req);
  const requestFieldsKeys = Object.keys(req.body);
  const validationFieldsKeys = Object.keys(validationFields);
  const extraFieldsErrors = [];
  requestFieldsKeys.forEach((property) => {
    if (
      !validationFieldsKeys.includes(property) &&
      !errors.errors.some((el) => el.param === property)
    ) {
      extraFieldsErrors.push({
        value: req.body[property],
        msg: `${property} is not a valid field`,
        param: property,
        location: 'body',
      });
    }
  });

  if (!errors.isEmpty() || extraFieldsErrors.length > 0) {
    return next(
      new AppError('Validation error', httpStatus.BAD_REQUEST, [
        ...errors.array(),
        ...extraFieldsErrors,
      ])
    );
  }

  return next();
};

export { validateRequest, taskValidation };
