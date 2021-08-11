import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';

import { InMemoryTaskRepository } from '../repositories/in-memory-task-repository';
import { TaskRepository as TaskRepositoryAbstract } from '../../domain/repositories/task.repository';

describe('TaskController', () => {
  let controller: TaskController;
  let repository: InMemoryTaskRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskRepositoryAbstract,
          useClass: InMemoryTaskRepository,
        },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    repository = module.get<TaskRepositoryAbstract>(
      TaskRepositoryAbstract,
    ) as unknown as InMemoryTaskRepository;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('creates a task in the database', () => {
    const taskToCreate = {
      title: 'test title',
      description: 'test description',
    };
    controller.create(taskToCreate);
    const [savedTask] = repository.data;
    expect(savedTask).toBe(taskToCreate);
  });

  it('returns the task after save it', () => {
    const taskToCreate = {
      title: 'test title',
      description: 'test description',
    };
    const response = controller.create(taskToCreate);
    expect(response).toBe(taskToCreate);
  });
});
