import config from '../config';
import mongoose from 'mongoose';

mongoose.set('strictQuery', true);

mongoose.connect(config.dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

export default mongoose.connection;
