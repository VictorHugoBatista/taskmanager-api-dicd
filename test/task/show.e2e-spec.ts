import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MongodbHelper } from '../../src/common/application/helpers/mongodb';
import { CreateTaskBuilder } from '../../src/task/application/builders/create-task-entity.builder';
import { InMemoryTaskRepository } from '../../src/task/application/repositories/in-memory-task-repository';
import { TaskModuleTest } from './builders/task-module-test';

describe('TaskController.show (e2e)', () => {
  let app: INestApplication;
  let repository: InMemoryTaskRepository;

  beforeEach(async () => {
    await TaskModuleTest.startModule();
    app = TaskModuleTest.app;
    repository = TaskModuleTest.repository;
    repository.data = [
      CreateTaskBuilder.build(),
      CreateTaskBuilder.build(),
      CreateTaskBuilder.build(),
    ];
  });

  it('should get the existing task ids', () => {
    const taskForSearch = repository.data[1];
    return request(app.getHttpServer())
      .get(`/task/${taskForSearch.id}`)
      .expect(200)
      .expect(({ body }) => {
        expect(JSON.stringify(body)).toEqual(JSON.stringify(taskForSearch));
      });
  });

  it('should return 404 for non existing task', () => {
    return request(app.getHttpServer())
      .get(`/task/${MongodbHelper.generateObjectId()}`)
      .expect(404);
  });

  it('should return 404 for invalid task id', () => {
    return request(app.getHttpServer())
      .get('/task/non-valid-task-id')
      .expect(404);
  });
});
