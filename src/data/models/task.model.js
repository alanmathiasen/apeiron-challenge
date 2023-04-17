import { Schema, model } from 'mongoose';

/**
 * @swagger
 * definitions:
 *  Task:
 *    type: object
 *    properties:
 *      name:
 *        type: string
 *      description:
 *        type: string
 *      completed:
 *        type: boolean
 *      _id:
 *        type: string
 *      __v:
 *        type: integer
 */

const TaskSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  completed: { type: Boolean, required: true, default: false },
});

export default model('Task', TaskSchema);
