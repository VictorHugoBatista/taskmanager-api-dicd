import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CreateTaskBuilder } from '../../src/task/application/builders/create-task-entity.builder';
import { InMemoryTaskRepository } from '../../src/task/application/repositories/in-memory-task-repository';
import { TaskModuleTest } from './builders/task-module-test';

describe('TaskController.index (e2e)', () => {
  let app: INestApplication;
  let repository: InMemoryTaskRepository;

  beforeEach(async () => {
    await TaskModuleTest.startModule();
    app = TaskModuleTest.app;
    repository = TaskModuleTest.repository;
  });

  it('should return all of the tasks existing in database', () => {
    repository.data = [
      CreateTaskBuilder.build(),
      CreateTaskBuilder.build(),
      CreateTaskBuilder.build(),
    ];
    return request(app.getHttpServer())
      .get('/task')
      .expect(200)
      .expect(({ body }) => {
        expect(JSON.stringify(body)).toEqual(JSON.stringify(repository.data));
      });
  });

  it('should return an empty array for empty database', () => {
    repository.data = [];
    return request(app.getHttpServer())
      .get('/task')
      .expect(200)
      .expect(({ body }) => {
        expect(JSON.stringify(body)).toEqual(JSON.stringify(repository.data));
      });
  });
});
