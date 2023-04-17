import { TaskRepository } from '../../data/repositories/index.js';

class TaskService {
  static create(name, description) {
    return TaskRepository.create(name, description);
  }

  static get(id) {
    return TaskRepository.get(id);
  }

  static getAll(filters) {
    return TaskRepository.getTasks(filters);
  }

  static update(id, name, description, completed) {
    return TaskRepository.update(id, name, description, completed);
  }

  static delete(id) {
    return TaskRepository.delete(id);
  }
}

export default TaskService;
