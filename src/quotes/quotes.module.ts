import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { QuotesController } from './application/controllers/quotes.controller';
import { QuotesService } from './application/services/quotes.service';

@Module({
  imports: [HttpModule],
  controllers: [QuotesController],
  providers: [QuotesService],
})
export class QuotesModule {}
