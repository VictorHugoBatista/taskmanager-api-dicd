import { Test, TestingModule } from '@nestjs/testing';
import { ValidationPipe, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CreateTaskBuilder } from '../../src/task/application/builders/create-task-entity.builder';
import { TaskController } from '../../src/task/application/controllers/task.controller';
import { InMemoryTaskRepository } from '../../src/task/application/repositories/in-memory-task-repository';
import { TaskRepository as TaskRepositoryAbstract } from '../../src/task/domain/repositories/task.repository';

describe('TaskController.show (e2e)', () => {
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

  it('should return 404 for non existing task ids', () => {
    repository.data = [];
    return request(app.getHttpServer()).get('/task/nonexistingid').expect(404);
  });
});
