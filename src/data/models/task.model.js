import { Schema, model } from 'mongoose';

const TaskSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  completed: { type: Boolean, required: true, default: false },
});

export default model('Task', TaskSchema);
