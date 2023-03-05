import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import databaseConfig from './db.config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { resolve } from 'path';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
  private readonly DB_TYPE: string = null;
  private readonly DB_HOST: string = null;
  private readonly DB_PORT: number = null;
  private readonly DB_USERNAME: string = null;
  private readonly DB_PASSWORD: string = null;
  private readonly DB_DATABASE_NAME: string = null;
  private readonly DB_SYNCHRONIZE: boolean = false;

  constructor(
    @Inject(databaseConfig.KEY)
    private dbConfig: ConfigType<typeof databaseConfig>,
  ) {
    const { type, host, port, database, synchronize, password, username } =
      this.dbConfig;
    this.DB_TYPE = type;
    this.DB_HOST = host;
    this.DB_PORT = port;
    this.DB_USERNAME = username;
    this.DB_PASSWORD = password;
    this.DB_DATABASE_NAME = database;
    this.DB_SYNCHRONIZE = synchronize;
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.DB_HOST,
      port: this.DB_PORT,
      username: this.DB_USERNAME,
      password: this.DB_PASSWORD,
      database: this.DB_DATABASE_NAME,
      entities: [`${resolve(__dirname, '..')}/**/*.entity{.ts,.js}`],
      synchronize: this.DB_SYNCHRONIZE,
      autoLoadEntities: true,
    };
  }
}
