import dotenv from 'dotenv';

dotenv.config();

const {
  PORT,
  NODE_ENV,
  MONGO_USER,
  CORS_ORIGIN,
  AUTH0_DOMAIN,
  MONGO_CLUSTER,
  MONGO_DATABASE,
  AUTH0_API_AUDIENCE,
  MONGO_USER_PASSWORD
} = process.env;

export default {
  port: PORT,
  cors: CORS_ORIGIN,
  env: NODE_ENV,
  auth0: {
    domain: AUTH0_DOMAIN,
    audience: AUTH0_API_AUDIENCE
  },
  dbUrl: `mongodb+srv://${MONGO_USER}:${MONGO_USER_PASSWORD}@${MONGO_CLUSTER}.mongodb.net/${MONGO_DATABASE}?retryWrites=true&w=majority`
};
