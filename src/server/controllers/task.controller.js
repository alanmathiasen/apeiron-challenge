import httpStatus from 'http-status';
import { TaskService } from '../services/index.js';
import AppError from '../utils/errors/AppError.js';

class TaskController {
  static async create(req, res, next) {
    try {
      const { name, description } = req.body;
      const newTask = await TaskService.create(name, description);
      res.status(201).json(newTask);
    } catch (err) {
      next(err);
    }
  }

  static async get(req, res, next) {
    try {
      const { id } = req.params;
      const task = await TaskService.get(id);
      if (!task) throw new AppError('Task not found', httpStatus.NOT_FOUND);
      res.status(200).json(task);
    } catch (err) {
      next(err);
    }
  }

  static async getTasks(req, res, next) {
    try {
      const filters = req.query;
      if (req.query.sort) {
        const [by, direction = 'asc'] = req.query.sort.split(':');
        filters.sort = { by, direction };
      }
      const allTasks = await TaskService.getAll(filters);
      res.status(200).json(allTasks);
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description, completed } = req.body;
      const updatedTask = await TaskService.update(
        id,
        name,
        description,
        completed
      );
      if (!updatedTask)
        throw new AppError('Task not found', httpStatus.NOT_FOUND);
      res.status(200).json(updatedTask);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const deletedTask = await TaskService.delete(id);
      if (!deletedTask)
        throw new AppError('Task not found', httpStatus.NOT_FOUND);
      res.status(200).json(deletedTask);
    } catch (err) {
      next(err);
    }
  }
}

export default TaskController;
