import dotenv from 'dotenv';

dotenv.config();

const {
  PORT,
  NODE_ENV,
  MONGO_USER,
  AUTH0_DOMAIN,
  MONGO_CLUSTER,
  MONGO_DATABASE,
  AUTHO_API_SCOPE,
  AUTH0_API_AUDIENCE,
  MONGO_USER_PASSWORD
} = process.env;

export default {
  port: PORT,
  env: NODE_ENV,
  auth0: {
    scope: AUTHO_API_SCOPE.replaceAll(',', ' '),
    domain: AUTH0_DOMAIN,
    audience: AUTH0_API_AUDIENCE
  },
  dbUrl: `mongodb+srv://${MONGO_USER}:${MONGO_USER_PASSWORD}@${MONGO_CLUSTER}.mongodb.net/${MONGO_DATABASE}?retryWrites=true&w=majority`
};
