import { TaskRepository } from '../../data/repositories/index.js';

class TaskService {
  static async create() {
    await TaskRepository.create();
  }
}

export default TaskService;
