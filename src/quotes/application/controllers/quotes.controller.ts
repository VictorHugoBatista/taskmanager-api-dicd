import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {map} from 'rxjs/operators';
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
    return await this.quotesService.random()
      .pipe(map(res => this.processResponse(res)))
      .toPromise();
  }

  private processResponse(response) {
    if (response.status === HttpStatus.OK) {
      return new QuoteFactory(response.data).build();
    }

    throw new HttpException(response.data, response.status);
  }
}
