import { Router } from 'express';
import { TaskController } from '../controllers/index.js';
import taskValidation from '../middlewares/validation/task.validation.js';
import { validateRequest } from '../middlewares/validation/index.js';
import verifyJWT from '../middlewares/verifyJWT.js';

const router = Router();

router.use(verifyJWT);

router.get('/', TaskController.getTasks);
router.get(
  '/:id',
  taskValidation.isValidId,
  validateRequest,
  TaskController.get
);
router.post('/', taskValidation.create, validateRequest, TaskController.create);
router.put(
  '/:id',
  taskValidation.update,
  validateRequest,
  TaskController.update
);
router.delete(
  '/:id',
  taskValidation.isValidId,
  validateRequest,
  TaskController.delete
);

export default router;

/**
 * @swagger
 * definitions:
 *  CreateTask:
 *    type: object
 *    required:
 *      - name
 *    properties:
 *      name:
 *        type: string
 *      description:
 *        type: string
 *  UpdateTask:
 *    type: object
 *    properties:
 *      name:
 *        type: string
 *      description:
 *        type: string
 *      completed:
 *        type: string
 *
 * /tasks/:
 *  get:
 *    summary: Get all tasks
 *    description: Use to retrieve all tasks
 *    parameters:
 *    - in: query
 *      name: sort
 *      schema:
 *        type: string
 *      description: Sort by task field, optional :asc or :desc for direction, default is asc
 *    - in: query
 *      name: completed
 *      schema:
 *        type: boolean
 *      description: Sort by completed tasks
 *    - in: query
 *      name: page
 *      schema:
 *        type: integer
 *      description: Paginate tasks
 *    responses:
 *      '200':
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/definitions/Task'
 *  post:
 *    summary: Create task
 *    description: Use to create a new task
 *    requestBody:
 *      description: Task fields
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/definitions/CreateTask'
 *    responses:
 *      '201':
 *        description: Created task
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/Task'
 *
 * /tasks/{id}:
 *   get:
 *     summary: Get task
 *     description: Get a task by id.
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *          type: integer
 *       description: Id of task
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Task'
 *   put:
 *     summary: Update task
 *     description: Use to update a task by id
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: integer
 *       description: Id of task
 *     requestBody:
 *       description: Task fields
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/UpdateTask'
 *     responses:
 *       200:
 *         description: Updated task
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Task'
 *   delete:
 *     summary: Delete task
 *     description: Use to delete a task by id
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: integer
 *       description: Id of task
 *     responses:
 *       200:
 *         description: Deleted task
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Task'
 */
