import { HttpModule } from '@nestjs/axios';
import { ValidationPipe, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { QuotesController } from '../../../src/quotes/application/controllers/quotes.controller';
import { QuotesService } from '../../../src/quotes/application/services/quotes.service';

export class QuotesModuleTest {
  public static app: INestApplication;

  public static async startModule(): Promise<void> {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [QuotesController],
      providers: [
        QuotesService,
      ],
    }).compile();

    QuotesModuleTest.app = moduleFixture.createNestApplication();
    QuotesModuleTest.app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    );
    await QuotesModuleTest.app.init();
  }
}
