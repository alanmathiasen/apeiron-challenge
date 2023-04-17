import { check } from 'express-validator';

const taskValidation = {
  create: [
    check('name')
      .exists()
      .withMessage('name is a required field')
      .isLength({ min: 3, max: 30 })
      .withMessage('name must be at least 3 characters long and at most 30'),
    check('description')
      .optional()
      .isString()
      .isLength({ max: 500 })
      .withMessage('description must be at most 500 characters long'),
  ],
  update: [
    check('id').isMongoId().withMessage('invalid id'),
    check('name')
      .optional()
      .isString()
      .isLength({ min: 3, max: 30 })
      .withMessage('name must be at least 3 characters long and at most 30'),
    check('description')
      .optional()
      .isString()
      .isLength({ max: 500 })
      .withMessage('description must be at most 500 characters long'),
    check('completed')
      .optional()
      .isBoolean()
      .withMessage('completed must be a boolean value'),
  ],
  isValidId: [check('id').isMongoId().withMessage('invalid id')],
};

export default taskValidation;
