import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CreateTaskBuilder } from '../../src/task/application/builders/create-task-request.builder';
import { InMemoryTaskRepository } from '../../src/task/application/repositories/in-memory-task-repository';
import { TaskModuleTest } from './builders/task-module-test';

describe('TaskController.create (e2e)', () => {
  let app: INestApplication;
  let repository: InMemoryTaskRepository;

  beforeEach(async () => {
    await TaskModuleTest.startModule();
    app = TaskModuleTest.app;
    repository = TaskModuleTest.repository;
  });

  it('gives a bad request for not sending parameters', () => {
    return request(app.getHttpServer()).post('/task').expect(400);
  });

  it('gives a bad request for not sending description', () => {
    return request(app.getHttpServer())
      .post('/task')
      .send({
        title: 'title',
      })
      .expect(400);
  });

  it('gives a bad request for not sending title', () => {
    return request(app.getHttpServer())
      .post('/task')
      .send({
        description: 'description',
      })
      .expect(400);
  });

  it('gives a success message for sending the right payload', () => {
    const taskForCreate = CreateTaskBuilder.build();
    return request(app.getHttpServer())
      .post('/task')
      .send(taskForCreate)
      .expect(201);
  });

  it('returns and saves task on the database', () => {
    const taskForCreate = CreateTaskBuilder.build();
    return request(app.getHttpServer())
      .post('/task')
      .send(taskForCreate)
      .expect(({ body }) => {
        const [createdTask] = repository.data;
        expect(body.title).toEqual(taskForCreate.title);
        expect(body.description).toEqual(taskForCreate.description);
        expect(body).toEqual(createdTask);
      });
  });
});
