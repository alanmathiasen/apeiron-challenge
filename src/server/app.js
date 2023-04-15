import express from 'express';
import { taskRouter } from './routes/index.js';
// import swaggerUi from 'swagger-ui-express';
// import swaggerDocument from './swagger.js';

const app = express();
app.use('/tasks', taskRouter);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
