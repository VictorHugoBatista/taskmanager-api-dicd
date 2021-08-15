import { Test, TestingModule } from '@nestjs/testing';
import { ValidationPipe, INestApplication } from '@nestjs/common';
import { TaskController } from '../../../src/task/application/controllers/task.controller';
import { InMemoryTaskRepository } from '../../../src/task/application/repositories/in-memory-task-repository';
import { TaskRepository as TaskRepositoryAbstract } from '../../../src/task/domain/repositories/task.repository';

export class TaskModuleTest {
  public static app: INestApplication;
  public static repository: InMemoryTaskRepository;

  public static async startModule(): Promise<void> {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskRepositoryAbstract,
          useClass: InMemoryTaskRepository,
        },
      ],
    }).compile();

    TaskModuleTest.repository = moduleFixture.get<TaskRepositoryAbstract>(
      TaskRepositoryAbstract,
    ) as unknown as InMemoryTaskRepository;

    TaskModuleTest.app = moduleFixture.createNestApplication();
    TaskModuleTest.app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    );
    await TaskModuleTest.app.init();
  }
}
