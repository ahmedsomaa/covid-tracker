import { Router } from 'express';
import recordsRouter from './records';
import auth0Middleware from '../middleware/auth';

const routes = Router();

routes.use(
  '/records',
  auth0Middleware.validateAuth0Token,
  auth0Middleware.checkScopes,
  recordsRouter
);

routes.get('/', (_req, res) => {
  res.status(200).send('<h1 style="text-align:center;">Covid Tracker API</h1>');
});

export default routes;
