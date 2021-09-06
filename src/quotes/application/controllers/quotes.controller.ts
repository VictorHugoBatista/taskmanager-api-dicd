import {
  Controller,
  Get,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { QuotesService } from '../services/quotes.service';
import { QuoteFactory } from '../factories/QuoteFactory';

@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Get('/random')
  @ApiOperation({ summary: 'Returns a random quote by calling the Shakespare API' })
  @ApiTags('Quotes')
  public async random() {
    const rawQuote = await this.quotesService.random().toPromise();
    return new QuoteFactory(rawQuote.data).build();
  }
}
