import { registerAs } from '@nestjs/config';
import { User } from '../typeorm/entities/User';
// import toBoolean from 'to-boolean';

type TDatabaseConfig = {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  entities?;
  synchronize: boolean;
};

export type TDatabaseLoggerOptions =
  | boolean
  | 'all'
  | ('query' | 'schema' | 'error' | 'warn' | 'info' | 'log' | 'migration')[];

export default registerAs<TDatabaseConfig, () => Promise<TDatabaseConfig>>(
  'database',
  async () => {
    return {
      type: process.env.DB_TYPE,
      port: Number(process.env.DB_PORT),
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      entities: [User],
      synchronize: !!process.env.DB_SYNCHRONIZE,
    };
  },
);
