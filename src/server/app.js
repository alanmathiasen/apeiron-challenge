import express from 'express';
import swaggerUi from 'swagger-ui-express';
import connectDB from '../data/db.js';
import swaggerSpec from './swagger.js';
import {
  errorHandler,
  pageNotFoundHandler,
} from './middlewares/errors/index.js';
import { authRouter, taskRouter } from './routes/index.js';

connectDB();

const app = express();

app.use(express.json());

app.use('/api/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/api/swagger.json', (_req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use('/api/auth', authRouter);
app.use('/api/tasks', taskRouter);

app.use(errorHandler);
app.use(pageNotFoundHandler);

export default app;
