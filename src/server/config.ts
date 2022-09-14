import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '.env'),
});

export default {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || '8000',
  useMocks: process.env.USE_MOCKS === 'true',
};
