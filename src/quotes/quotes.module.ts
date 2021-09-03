import { Module } from '@nestjs/common';
import { QuotesController } from './application/controllers/quotes.controller';
import { QuotesService } from './application/services/quotes.service';

@Module({
  controllers: [QuotesController],
  providers: [QuotesService],
})
export class QuotesModule {}
