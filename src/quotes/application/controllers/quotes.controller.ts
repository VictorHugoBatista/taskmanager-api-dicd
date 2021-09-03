import {
  Controller,
  Get,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { QuotesService } from '../services/quotes.service';

@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Get('/random')
  @ApiOperation({ summary: 'Returns a random quote by calling the Shakespare API' })
  @ApiTags('Quotes')
  public random() {
    return this.quotesService.random();
  }
}
