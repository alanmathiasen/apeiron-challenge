import swaggerJSDoc from 'swagger-jsdoc';
import config from '../config/index.js';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Apeiron challenge API',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          in: 'header',
          description:
            'Enter the token provided by the generate-token endpoint',
        },
      },
    },
    security: [{ bearerAuth: [] }],
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
