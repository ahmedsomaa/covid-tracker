import config from '../config';
import { InvalidTokenError, UnauthorizedError } from 'express-oauth2-jwt-bearer';

export default function errorHandler(error, _request, response, _next) {
  if (error instanceof InvalidTokenError) {
    const message = 'Bad Credentials';
    return response.status(error.status).json({ message, success: false });
  }

  if (error instanceof UnauthorizedError) {
    const message = 'Authentication Required';
    return response.status(error.status).json({ message, success: false });
  }

  const status = error.statusCode || 500;
  const stack = config.env === 'dev' ? error.stack : {};
  const message = error.message || 'Something went wrong';
  return response.status(status).json({
    stack,
    status,
    message,
    success: false
  });
}
