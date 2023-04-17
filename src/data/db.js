import { connect } from 'mongoose';
import config from '../config/index.js';

const connectDB = async () => {
  try {
    await connect(config.DB_URI);
    // eslint-disable-next-line no-console
    console.log('Connected to MongoDB');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
};

export default connectDB;
