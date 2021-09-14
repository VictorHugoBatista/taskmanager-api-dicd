import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CreateTaskBuilder } from '../../src/task/application/builders/create-task-request.builder';
import { QuotesModuleTest } from './builders/quotes-module-test';

describe('QuotesController.random(e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    await QuotesModuleTest.startModule();
    app = QuotesModuleTest.app;
  });

  it('should get a valid random quote', () => {
    return request(app.getHttpServer()).get('/quotes/random').expect(200);
  });
});
