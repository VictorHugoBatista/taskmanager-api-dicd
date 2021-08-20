import { INestApplication } from '@nestjs/common';
import { lorem } from 'faker';
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

  const validateUpdateSuccess = (body, taskForUpdate) => {
    expect(JSON.stringify(body)).toEqual(JSON.stringify(taskForUpdate));
    expect(JSON.stringify(repository.data[2])).toEqual(
      JSON.stringify(taskForUpdate),
    );
  };

  it('should update title and return the given task id', () => {
    const taskForSearch = repository.data[2];
    taskForSearch.title = lorem.sentence();
    return request(app.getHttpServer())
      .patch(`/task/${taskForSearch.id}`)
      .send(taskForSearch)
      .expect(200)
      .expect(({ body }) => {
        validateUpdateSuccess(body, taskForSearch);
      });
  });

  it('should update description and return the given task id', () => {
    const taskForSearch = repository.data[2];
    taskForSearch.description = lorem.sentences();
    return request(app.getHttpServer())
      .patch(`/task/${taskForSearch.id}`)
      .send(taskForSearch)
      .expect(200)
      .expect(({ body }) => {
        validateUpdateSuccess(body, taskForSearch);
      });
  });

  it('should update title and description and return the given task id', () => {
    const taskForSearch = repository.data[2];
    taskForSearch.title = lorem.sentence();
    taskForSearch.description = lorem.sentences();
    return request(app.getHttpServer())
      .patch(`/task/${taskForSearch.id}`)
      .send(taskForSearch)
      .expect(200)
      .expect(({ body }) => {
        validateUpdateSuccess(body, taskForSearch);
      });
  });

  it('should return a 400 error for a empty body', () => {
    const taskForSearch = repository.data[2];
    return request(app.getHttpServer())
      .patch(`/task/${taskForSearch.id}`)
      .send({})
      .expect(400);
  });

  it('should return a 400 error for not sending a body', () => {
    const taskForSearch = repository.data[2];
    return request(app.getHttpServer())
      .patch(`/task/${taskForSearch.id}`)
      .expect(400);
  });

  it('should return 404 for non existing task', () => {
    const taskForSearch = repository.data[2];
    return request(app.getHttpServer())
      .patch(`/task/${MongodbHelper.generateObjectId()}`)
      .send(taskForSearch)
      .expect(404);
  });

  it('should return 404 for invalid task id', () => {
    return request(app.getHttpServer())
      .patch('/task/nonn-valid-task-id')
      .expect(404);
  });
});
