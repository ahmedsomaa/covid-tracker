import dotenv from 'dotenv';

dotenv.config();

const { PORT, NODE_ENV, MONGO_USER, MONGO_USER_PASSWORD, MONGO_CLUSTER, MONGO_DATABASE } =
  process.env;

export default {
  port: PORT,
  env: NODE_ENV,
  dbUrl: `mongodb+srv://${MONGO_USER}:${MONGO_USER_PASSWORD}@${MONGO_CLUSTER}.mongodb.net/${MONGO_DATABASE}?retryWrites=true&w=majority`
};
