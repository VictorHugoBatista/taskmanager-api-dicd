import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: 'mongodb',
        host: 'taskmanager-api-mongo',
        port: 27017,
        username: 'root',
        password: '123456',
        database: 'taskmanager_api',
        entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
  },
];
