import TaskService from '../services/task.service.js';

class TaskController {
  static async create(req, res) {
    await TaskService.create();
    res.status(200).json({ hola: 'hola' });
  }
}

export default TaskController;
