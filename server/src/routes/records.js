import { Router } from 'express';
import recordsController from '../controllers/records';

const recordsRouter = Router();

recordsRouter.route('/').get(recordsController.findAll).post(recordsController.create);

export default recordsRouter;
