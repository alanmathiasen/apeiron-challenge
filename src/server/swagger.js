import swaggerJSDoc from 'swagger-jsdoc';
import config from '../config/index.js';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Apeiron challenge API',
      version: '1.0.0',
    },
    servers: [
      {
        url: `http://localhost:${config.PORT}/api`,
      },
    ],
  },
  apis: ['src/server/routes/*.route.js', 'src/data/models/*.model.js'],
  consumes: ['application/json'],
  produces: ['application/json'],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
