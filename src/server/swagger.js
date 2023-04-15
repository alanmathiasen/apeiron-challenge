const swaggerDocument = {
  swagger: '2.0',
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  paths: {
    '/task/': {
      get: {
        summary: 'Lists all the tasks',
        tags: ['task'],
        produces: ['application/json'],
        responses: {
          200: {
            description: 'Returns a list',
            schema: {
              $ref: '#/definitions/Task',
            },
          },
        },
      },
      post: {
        summary: 'Creates a task',
        tags: ['task'],
        parameters: [
          {
            name: 'task',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateTask',
            },
          },
        ],
        produces: ['application/json'],
        responses: {
          201: {
            description: 'Returns a new task',
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateTask',
            },
          },
        },
      },
    },
    '/task/{id}': {
      get: {
        summary: 'Gets a task by its primary key',
        tags: ['task'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'Returns a task with primary key',
            schema: {
              $ref: '#/definitions/Task',
            },
          },
        },
      },
      delete: {
        summary: 'Deletes a task by its primary key',
        tags: ['task'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          200: {
            description: 'OK',
          },
        },
      },
      put: {
        summary: 'Overrides the values of a task',
        tags: ['task'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              $ref: '#/definitions/Task',
            },
          },
          {
            name: 'task',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateTask',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a task',
            schema: {
              $ref: '#/definitions/Task',
            },
          },
        },
      },
      patch: {
        tags: ['task'],
        summary: 'patch a task',
        parameters: [
          {
            name: 'id',
            in: 'path',
            schema: {
              $ref: '#/definitions/Task',
            },
          },
          {
            name: 'task',
            in: 'body',
            schema: {
              $ref: '#/createUpdateDef/CreateUpdateTask',
            },
          },
        ],
        responses: {
          200: {
            description: 'Returns a task and its partially overwritten values',
            schema: {
              $ref: '#/definitions/Task',
            },
          },
        },
      },
    },
  },
  definitions: {
    Task: {
      required: ['title', 'status', 'project', 'creator', 'assignedPrimary'],
      properties: {
        id: {
          type: 'string',
          format: 'uuid',
          uniqueItems: true,
          readOnly: true,
        },
        title: {
          type: 'string',
          maxLength: 20,
        },
        body: {
          type: 'string',
          maxLength: 1000,
        },
        dueDate: {
          type: 'string',
          format: 'date',
        },
        status: {
          type: 'string',
          enum: ['To do', 'In progress', 'Done'],
        },
        creation: {
          type: 'string',
          format: 'date-time',
        },
        priority: {
          type: 'integer',
          format: 'int32',
          minimum: 1,
          maximum: 5,
        },
        storyPoint: {
          type: 'number',
          format: 'float',
        },
        project: {
          type: 'string',
          uniqueItems: true,
          maxLength: 30,
        },
        creator: {
          type: 'string',
          format: 'uuid',
          uniqueItems: true,
        },
        assignedPrimary: {
          type: 'string',
          format: 'uuid',
          uniqueItems: true,
        },
        assignedSecondary: {
          type: 'string',
          format: 'uuid',
          uniqueItems: true,
        },
        parentTask: {
          type: 'string',
          format: 'uuid',
          uniqueItems: true,
        },
        subtasks: {
          type: 'array',
          items: {
            type: 'string',
            format: 'uuid',
          },
          uniqueItems: true,
        },
      },
    },

    Project: {
      required: ['projectName', 'creator'],
      properties: {
        projectName: {
          type: 'string',
          uniqueItems: true,
          maxLength: 30,
        },
        creation: {
          type: 'string',
          format: 'date-time',
        },
        creator: {
          type: 'string',
          format: 'uuid',
          uniqueItems: true,
        },
        tasks: {
          type: 'array',
          items: {
            type: 'string',
            format: 'uuid',
          },
          uniqueItems: true,
        },
      },
    },

    User: {
      required: ['username'],
      properties: {
        id: {
          type: 'string',
          format: 'uuid',
          uniqueItems: true,
          readOnly: true,
        },
        username: {
          type: 'string',
          maxLength: 80,
        },
        firstName: {
          type: 'string',
          maxLength: 80,
        },
        lastName: {
          type: 'string',
          maxLength: 80,
        },
        createdTasks: {
          type: 'array',
          items: {
            type: 'string',
            format: 'uuid',
          },
          uniqueItems: true,
        },
        assignedTasksPrimary: {
          type: 'array',
          items: {
            type: 'string',
            format: 'uuid',
          },
          uniqueItems: true,
        },
        assignedTasksSecondary: {
          type: 'array',
          items: {
            type: 'string',
            format: 'uuid',
          },
          uniqueItems: true,
        },
        createdProjects: {
          type: 'array',
          items: {
            type: 'string',
            maxLength: 30,
          },
          uniqueItems: true,
        },
        memberOf: {
          type: 'array',
          items: {
            type: 'string',
            format: 'uuid',
          },
          uniqueItems: true,
        },
      },
    },

    Team: {
      required: ['name'],
      properties: {
        id: {
          type: 'string',
          format: 'uuid',
          uniqueItems: true,
          readOnly: true,
        },
        name: {
          type: 'string',
          maxLength: 80,
        },
        members: {
          type: 'array',
          items: {
            type: 'string',
            format: 'uuid',
          },
          uniqueItems: true,
        },
      },
    },
  },
  createUpdateDef: {
    CreateUpdateTask: {
      required: ['title', 'status', 'project', 'creator', 'assignedPrimary'],
      properties: {
        id: {
          type: 'string',
          format: 'uuid',
          uniqueItems: true,
          readOnly: true,
        },
        title: {
          type: 'string',
          maxLength: 20,
        },
        body: {
          type: 'string',
          maxLength: 1000,
        },
        dueDate: {
          type: 'string',
          format: 'date',
        },
        status: {
          type: 'string',
          enum: ['To do', 'In progress', 'Done'],
        },
        creation: {
          type: 'string',
          format: 'date-time',
        },
        priority: {
          type: 'integer',
          format: 'int32',
          minimum: 1,
          maximum: 5,
        },
        storyPoint: {
          type: 'number',
          format: 'float',
        },
        project: {
          type: 'string',
          uniqueItems: true,
          maxLength: 30,
        },
        creator: {
          type: 'string',
          format: 'uuid',
          uniqueItems: true,
        },
        assignedPrimary: {
          type: 'string',
          format: 'uuid',
          uniqueItems: true,
        },
        assignedSecondary: {
          type: 'string',
          format: 'uuid',
          uniqueItems: true,
        },
        parentTask: {
          type: 'string',
          format: 'uuid',
          uniqueItems: true,
        },
      },
    },

    CreateUpdateProject: {
      required: ['projectName', 'creator'],
      properties: {
        projectName: {
          type: 'string',
          uniqueItems: true,
          maxLength: 30,
        },
        creation: {
          type: 'string',
          format: 'date-time',
        },
        creator: {
          type: 'string',
          format: 'uuid',
          uniqueItems: true,
        },
      },
    },
  },
};

export default swaggerDocument;
