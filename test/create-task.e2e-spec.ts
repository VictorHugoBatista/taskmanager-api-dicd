import { Test, TestingModule } from '@nestjs/testing';
import { ValidationPipe, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    );
    await app.init();
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
        description: 'title',
      })
      .expect(400);
  });

  it('gives a success message for sending the boy right', () => {
    const taskForCreate = {
      title: 'title',
      description: 'title',
    };
    return request(app.getHttpServer())
      .post('/task')
      .send(taskForCreate)
      .expect(201)
      .expect(({ body }) => {
        expect(body.title).toEqual(taskForCreate.title);
        expect(body.description).toEqual(taskForCreate.description);
      });
  });
});
