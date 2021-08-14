import { Test, TestingModule } from '@nestjs/testing';
import { ValidationPipe, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TaskController } from '../../src/task/application/controllers/task.controller';
import { InMemoryTaskRepository } from '../../src/task/application/repositories/in-memory-task-repository';
import { TaskRepository as TaskRepositoryAbstract } from '../../src/task/domain/repositories/task.repository';

describe('TaskController.index (e2e)', () => {
  let app: INestApplication;
  let repository: InMemoryTaskRepository;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskRepositoryAbstract,
          useClass: InMemoryTaskRepository,
        },
      ],
    }).compile();

    repository = moduleFixture.get<TaskRepositoryAbstract>(
      TaskRepositoryAbstract,
    ) as unknown as InMemoryTaskRepository;

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    );
    await app.init();
  });

  it('should return all of the tasks existing in database', () => {
    return request(app.getHttpServer())
      .get('/task')
      .expect(200)
      .expect(({ body }) => {
        expect(body.data).toEqual(repository.data);
      });
  });

  it('should return an empty array for empty database', () => {
    return request(app.getHttpServer())
      .get('/task')
      .expect(200)
      .expect(({ body }) => {
        expect(body.data).toEqual(repository.data);
      });
  });
});
