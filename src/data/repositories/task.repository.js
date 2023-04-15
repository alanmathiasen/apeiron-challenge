import { Task } from '../models/index.js';

class TaskRepository {
  static async create() {
    console.log('repository create');
    console.log(Task);
  }
}

export default TaskRepository;
