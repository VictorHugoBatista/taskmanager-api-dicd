import { Module } from '@nestjs/common';
import { QuotesController } from './application/controllers/quotes.controller';

@Module({
  controllers: [QuotesController]
})
export class QuotesModule {}
