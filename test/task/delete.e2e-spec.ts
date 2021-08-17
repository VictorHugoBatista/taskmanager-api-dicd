import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MongodbHelper } from '../../src/common/application/helpers/mongodb';
import { CreateTaskBuilder } from '../../src/task/application/builders/create-task-entity.builder';
import { InMemoryTaskRepository } from '../../src/task/application/repositories/in-memory-task-repository';
import { TaskModuleTest } from './builders/task-module-test';

describe('TaskController.delete (e2e)', () => {
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

  it('should return and delete the given task id', () => {
    const taskForSearch = repository.data[2];
    return request(app.getHttpServer())
      .delete(`/task/${taskForSearch.id}`)
      .expect(200)
      .expect(({ body }) => {
        expect(JSON.stringify(body)).toEqual(JSON.stringify(taskForSearch));
        expect(repository.data[2]).toBeUndefined();
      });
  });

  it('should return 404 for non existing task', () => {
    return request(app.getHttpServer())
      .delete(`/task/${MongodbHelper.generateObjectId()}`)
      .expect(404);
  });

  it('should return 404 for invalid task id', () => {
    return request(app.getHttpServer())
      .delete('/task/nonn-valid-task-id')
      .expect(404);
  });
});
