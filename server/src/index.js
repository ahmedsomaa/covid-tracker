import db from './db';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import config from './config';
import express from 'express';
import routes from './routes';
import compression from 'compression';
import { logger } from './middleware/logger';
import errorHandler from './middleware/error';

// create the app instance
const app = express();

// setup middleware
// use morgan for logging request
app.use(morgan('common'));

// use helmet for security to disable x-powered-by ...etc.
app.use(helmet());

// cors
app.use(cors());

// use compression to compress all responses
app.use(compression());

// use express.json to parse request body
app.use(express.json());

// connect to mongo
db.on('error', console.error.bind(console, '[ERR] Database connection error: '));
db.once('open', function () {
  logger.info('Database connected successfully');
});

// application routes
app.use(routes);

// error handler for operational errors
app.use(errorHandler);

process.on('unhandledRejection', (error) => {
  logger.error('unhandledRejection', error);
});

// error handler for uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('uncaughtException', error);
});

app.listen(config.port, () =>
  logger.info(`Server started listening at http://localhost:${config.port}`)
);

export default app;
