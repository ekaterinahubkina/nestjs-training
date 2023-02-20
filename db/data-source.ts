import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from 'dotenv';

dotenv.config();;

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: ['dist/src/**/*.entity.*'],
  synchronize: false,
  migrationsRun: false,
  logging: true,
  migrations: ['dist/db/migrations/*.js'],
  ssl: {
    rejectUnauthorized: false
  }
}

const dataSource: DataSource = new DataSource(dataSourceOptions);
export default dataSource;