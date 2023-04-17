import request from 'supertest';
import connectDB from '../data/db';
import app from '../server/app.js';
import mongoose, { isValidObjectId } from 'mongoose';
import { Task } from '../data/models';
import { PAGINATION_LIMIT } from '../server/utils/constants';
const ENDPOINT = '/api/tasks';

const createTask = async () =>
  Task.create({ name: 'test name', description: 'test description' });

beforeEach(async () => {
  await connectDB();
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe('GET /api/tasks', () => {
  describe('given no arguments', () => {
    it('should return all tasks', async () => {
      const res = await request(app).get(ENDPOINT).send();
      const allTasks = res.body;
      expect(res.statusCode).toBe(200);
      expect(allTasks.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('given completed=true query parameter', () => {
    it('should return all completed tasks', async () => {
      const res = await request(app).get(`${ENDPOINT}?completed=true`).send();
      const allTasks = res.body;

      expect(res.statusCode).toBe(200);
      expect(allTasks.length).toBeGreaterThanOrEqual(0);
      allTasks.forEach((task) => {
        expect(task.completed).toBe(true);
      });
    });
  });

  describe('given completed=false query parameter', () => {
    it('should return all incompleted tasks', async () => {
      const res = await request(app).get(`${ENDPOINT}?completed=false`).send();
      const allTasks = res.body;

      expect(res.statusCode).toBe(200);
      expect(allTasks.length).toBeGreaterThanOrEqual(0);
      allTasks.forEach((task) => {
        expect(task.completed).toBe(false);
      });
    });
  });

  describe('given page={page_num} query parameter', () => {
    it(`it should return ${PAGINATION_LIMIT} tasks`, async () => {
      const res = await request(app).get(`${ENDPOINT}?page=1`).send();
      const allTasks = res.body;

      expect(res.statusCode).toBe(200);
      expect(allTasks.length).toBeLessThanOrEqual(PAGINATION_LIMIT);
    });
  });

  describe('given sort={param} parameter', () => {
    it(`it should return tasks sorted ascending by parameter`, async () => {
      const param = 'name';
      const res = await request(app).get(`${ENDPOINT}?sort=${param}`).send();
      const allTasks = res.body;

      expect(res.statusCode).toBe(200);

      expect(allTasks).toStrictEqual([
        ...allTasks.sort((a, b) => {
          if (a[param] < b[param]) return -1;
          if (a[param] > b[param]) return 1;
          return 0;
        }),
      ]);
    });
  });

  describe('given sort={param}:asc query parameter', () => {
    it(`it should return tasks sorted ascending by parameter`, async () => {
      const param = 'name';
      const res = await request(app).get(`${ENDPOINT}?sort=${param}`).send();
      const allTasks = res.body;

      expect(res.statusCode).toBe(200);

      expect(allTasks).toStrictEqual([
        ...allTasks.sort((a, b) => {
          if (a[param] < b[param]) return -1;
          if (a[param] > b[param]) return 1;
          return 0;
        }),
      ]);
    });
  });

  describe('given sort={param}:desc parameter', () => {
    it(`it should return tasks sorted descending by parameter`, async () => {
      const param = 'name';
      const res = await request(app)
        .get(`${ENDPOINT}?sort=${param}:desc`)
        .send();
      const allTasks = res.body;

      expect(res.statusCode).toBe(200);

      expect(allTasks).toStrictEqual([
        ...allTasks.sort((a, b) => {
          if (a[param] < b[param]) return 1;
          if (a[param] > b[param]) return -1;
          return 0;
        }),
      ]);
    });
  });
});

describe('GET /api/tasks/:id', () => {
  describe('given valid id', () => {
    it('should return a task', async () => {
      const task = await createTask();
      const res = await request(app).get(`${ENDPOINT}/${task._id}`).send();
      expect(res.statusCode).toBe(200);
      expect(task._id.equals(res.body._id)).toBeTruthy();
    });
  });

  describe('given valid id of non-existent task', () => {
    it('should return 404 not found', async () => {
      const res = await request(app)
        .get(`${ENDPOINT}/643d500aeb96d973cf532d77`)
        .send();
      expect(res.statusCode).toBe(404);
    });
  });

  describe('given invalid id', () => {
    it('should return 400 bad request', async () => {
      const res = await request(app).get(`${ENDPOINT}/643`).send();
      expect(res.statusCode).toBe(400);
    });
  });
});

describe('POST /api/tasks', () => {
  describe('given valid task', () => {
    it('should create a task', async () => {
      const newTask = { name: 'test name', description: 'test description' };
      const res = await request(app).post(ENDPOINT).send(newTask);
      expect(res.statusCode).toBe(201);
      expect(isValidObjectId(res.body._id)).toBeTruthy();
    });
  });

  describe('given task without description', () => {
    it('should create a task', async () => {
      const newTask = { name: 'test name' };
      const res = await request(app).post(ENDPOINT).send(newTask);
      expect(res.statusCode).toBe(201);
      expect(isValidObjectId(res.body._id)).toBeTruthy();
    });
  });

  describe('given task without name field', () => {
    it('should return 400 bad request', async () => {
      const newTask = { description: 'test description' };
      const res = await request(app).post(ENDPOINT).send(newTask);
      expect(res.statusCode).toBe(400);
    });
  });

  describe('given task with any extra field', () => {
    it('should return 400 bad request', async () => {
      const newTask = {
        name: 'test name',
        description: 'test description',
        extraField: 'test',
      };
      const res = await request(app).post(ENDPOINT).send(newTask);
      expect(res.statusCode).toBe(400);
    });
  });
});

describe('PUT /api/tasks/:id', () => {
  describe('given valid new task', () => {
    it('should return updated task', async () => {
      const task = await createTask();
      const updatedTask = {
        name: 'updated task',
        description: 'updated description',
      };
      const res = await request(app)
        .put(`${ENDPOINT}/${task._id}`)
        .send(updatedTask);
      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe(updatedTask.name);
      expect(res.body.description).toBe(updatedTask.description);
    });
  });

  describe('given invalid id', () => {
    it('should return 400 bad request', async () => {
      const updatedTask = {
        name: 'updated task',
        description: 'updated description',
      };
      const res = await request(app).put(`${ENDPOINT}/643`).send(updatedTask);
      expect(res.statusCode).toBe(400);
    });
  });

  describe('given valid id of non-existent task', () => {
    it('should return 404 not found', async () => {
      const updatedTask = {
        name: 'updated task',
        description: 'updated description',
      };
      const res = await request(app)
        .put(`${ENDPOINT}/643d500aeb96d973cf532d77`)
        .send(updatedTask);
      expect(res.statusCode).toBe(404);
    });
  });
});

describe('DELETE /api/tasks/:id', () => {
  describe('given valid id', () => {
    it('should delete a task', async () => {
      const task = await createTask();
      const res = await request(app).delete(`${ENDPOINT}/${task._id}`).send();
      expect(res.statusCode).toBe(200);
      expect(task._id.equals(res.body._id)).toBeTruthy();
    });
  });

  describe('given invalid id', () => {
    it('should return 400 bad request', async () => {
      const res = await request(app).delete(`${ENDPOINT}/643`).send();
      expect(res.statusCode).toBe(400);
    });
  });

  describe('given valid id of non-existent task', () => {
    it('should return 404 not found', async () => {
      const res = await request(app)
        .delete(`${ENDPOINT}/643d500aeb96d973cf532d77`)
        .send();
      expect(res.statusCode).toBe(404);
    });
  });
});
