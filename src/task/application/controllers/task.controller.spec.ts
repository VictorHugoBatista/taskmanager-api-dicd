import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';

import { InMemoryTaskRepository } from '../repositories/in-memory-task-repository';
import { TaskRepository as TaskRepositoryAbstract } from '../../domain/repositories/task.repository';

describe('TaskController', () => {
  let controller: TaskController;

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
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
