import { Task } from '../models/index.js';
import { PAGINATION_LIMIT } from '../../server/utils/constants.js';

class TaskRepository {
  static async create(name, description) {
    const createdTask = await Task.create({
      name,
      description,
      completed: false,
    });
    return createdTask;
  }

  static async get(_id) {
    return Task.findById(_id);
  }

  static async getTasks({ completed, sort, page }) {
    const options = {
      ...(completed && { completed }),
    };

    let query = Task.find(options);

    if (sort) {
      query = query.sort({ [sort.by]: sort.direction });
    }

    if (page) {
      query = query.limit(PAGINATION_LIMIT).skip((page - 1) * PAGINATION_LIMIT);
    }

    return query.exec();
  }

  static async update(_id, name, description, completed) {
    return Task.findByIdAndUpdate(
      _id,
      { name, description, completed },
      { new: true }
    );
  }

  static async delete(_id) {
    return Task.findByIdAndDelete(_id);
  }
}

export default TaskRepository;
