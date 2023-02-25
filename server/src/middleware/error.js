import config from '../config';

export default function errorHandler(error, _request, response, _next) {
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
