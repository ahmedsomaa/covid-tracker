import { Router } from 'express';
import recordsRouter from './records';

const routes = Router();

routes.use('/records', recordsRouter);

routes.get('/', (_req, res) => {
  res.status(200).send('<h1 style="text-align:center;">Covid Tracker API</h1>');
});

export default routes;
