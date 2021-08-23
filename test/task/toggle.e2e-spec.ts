import { INestApplication } from '@nestjs/common';
import { lorem } from 'faker';
import * as request from 'supertest';
import { MongodbHelper } from '../../src/common/application/helpers/mongodb';
import { CreateTaskBuilder } from '../../src/task/application/builders/create-task-entity.builder';
import { InMemoryTaskRepository } from '../../src/task/application/repositories/in-memory-task-repository';
import { TaskModuleTest } from './builders/task-module-test';

describe('TaskController.toggle (e2e)', () => {
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

  it('should update the task status and return the data by given id', () => {
    const taskForSearch = repository.data[2];
    taskForSearch.title = lorem.sentence();
    taskForSearch.description = lorem.sentences();
    return request(app.getHttpServer())
      .patch(`/task/${taskForSearch.id}/toggle`)
      .expect(200)
      .expect(({ body }) => {
        expect(taskForSearch.isDone).toEqual(!body.isDone);
        expect(taskForSearch.isDone).toEqual(!repository.data[2].isDone);
      });
  });

  it('should return 404 for non existing task', () => {
    return request(app.getHttpServer())
      .patch(`/task/${MongodbHelper.generateObjectId()}/toggle`)
      .expect(404);
  });

  it('should return 404 for invalid task id', () => {
    return request(app.getHttpServer())
      .patch('/task/nonn-valid-task-id/toggle')
      .expect(404);
  });
});
